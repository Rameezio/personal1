import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────
   WebGL Shader Canvas  (merged from shader-background.jsx)
   30fps cap, pauses when off-screen, 0.5x pixel scale
───────────────────────────────────────────────────────── */
const ShaderCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    /* ── Shaders ── */
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() { gl_Position = aVertexPosition; }
    `;
    const fsSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;

      const float overallSpeed    = 0.2;
      const float gridSmoothWidth = 0.015;
      const float axisWidth       = 0.05;
      const float majorLineWidth  = 0.025;
      const float minorLineWidth  = 0.0125;
      const float majorLineFrequency = 5.0;
      const float minorLineFrequency = 1.0;
      const float scale           = 5.0;
      const vec4  lineColor       = vec4(0.376, 0.647, 0.980, 0.99);
      const float minLineWidth    = 0.01;
      const float maxLineWidth    = 0.2;
      const float lineSpeed       = 1.0  * overallSpeed;
      const float lineAmplitude   = 1.0;
      const float lineFrequency   = 0.2;
      const float warpSpeed       = 0.2  * overallSpeed;
      const float warpFrequency   = 0.5;
      const float warpAmplitude   = 1.0;
      const float offsetFrequency = 0.5;
      const float offsetSpeed     = 1.33 * overallSpeed;
      const float minOffsetSpread = 0.6;
      const float maxOffsetSpread = 2.0;
      const int   linesPerGroup   = 8;

      #define drawCircle(pos,radius,coord) smoothstep(radius+gridSmoothWidth,radius,length(coord-(pos)))
      #define drawSmoothLine(pos,hw,t) smoothstep(hw,0.0,abs(pos-(t)))
      #define drawCrispLine(pos,hw,t)  smoothstep(hw+gridSmoothWidth,hw,abs(pos-(t)))
      #define drawPeriodicLine(freq,w,t) drawCrispLine(freq/2.0,w,abs(mod(t,freq)-(freq)/2.0))

      float random(float t){return(cos(t)+cos(t*1.3+1.3)+cos(t*1.4+1.4))/3.0;}
      float getPlasmaY(float x,float hf,float off){return random(x*lineFrequency+iTime*lineSpeed)*hf*lineAmplitude+off;}

      void main(){
        vec2 uv    = gl_FragCoord.xy/iResolution.xy;
        vec2 space = (gl_FragCoord.xy-iResolution.xy/2.0)/iResolution.x*2.0*scale;
        float hf   = 1.0-(cos(uv.x*6.28)*0.5+0.5);
        float vf   = 1.0-(cos(uv.y*6.28)*0.5+0.5);
        space.y   += random(space.x*warpFrequency+iTime*warpSpeed)*warpAmplitude*(0.5+hf);
        space.x   += random(space.y*warpFrequency+iTime*warpSpeed+2.0)*warpAmplitude*hf;
        vec4 lines = vec4(0.0);
        for(int l=0;l<linesPerGroup;l++){
          float op  = float(l)/float(linesPerGroup);
          float ot  = iTime*offsetSpeed;
          float pos = float(l)+space.x*offsetFrequency;
          float r   = random(pos+ot)*0.5+0.5;
          float hw  = mix(minLineWidth,maxLineWidth,r*hf)/2.0;
          float off = random(pos+ot*(1.0+op))*mix(minOffsetSpread,maxOffsetSpread,hf);
          float lp  = getPlasmaY(space.x,hf,off);
          float ln  = drawSmoothLine(lp,hw,space.y)/2.0+drawCrispLine(lp,hw*0.15,space.y);
          float cx  = mod(float(l)+iTime*lineSpeed,25.0)-12.0;
          ln += drawCircle(vec2(cx,getPlasmaY(cx,hf,off)),0.01,space)*4.0;
          lines += ln*lineColor*r;
        }
        vec4 col = mix(vec4(0.016,0.035,0.102,1.0),vec4(0.035,0.016,0.173,1.0),uv.x);
        col *= vf; col.a=1.0; col+=lines;
        gl_FragColor = col;
      }
    `;

    /* ── Compile & link ── */
    const makeShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);

    const vPos = gl.getAttribLocation(prog, 'aVertexPosition');
    const uRes = gl.getUniformLocation(prog, 'iResolution');
    const uTime = gl.getUniformLocation(prog, 'iTime');

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * 0.5;
      canvas.height = canvas.offsetHeight * 0.5;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let rafId, isVisible = true, lastT = 0, start = Date.now();
    const STEP = 1000 / 30; // 30 fps cap

    const observer = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; }, { threshold: 0 });
    observer.observe(canvas);

    const render = (ts) => {
      rafId = requestAnimationFrame(render);
      if (!isVisible || ts - lastT < STEP) return;
      lastT = ts;
      const t = (Date.now() - start) / 1000;
      gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(vPos, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', display:'block' }} />;
};


/* ─────────────────────────────────────────────────────────
   BackgroundWaves  (main export)
───────────────────────────────────────────────────────── */
export default function BackgroundWaves() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>

      {/* Navy base glow */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 85% 65% at 50% 110%, rgba(10,25,80,0.6) 0%, transparent 65%)' }} />

      {/* Left blue ambient */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 42% 55% at -4% 54%, rgba(29,78,216,0.13) 0%, transparent 65%)' }} />


      {/* WebGL shader — hidden on mobile (performance + visual) */}
      <div className="hidden md:block" style={{
        position:'absolute', inset:0, overflow:'hidden',
        WebkitMaskImage:'linear-gradient(to bottom, transparent 5%, black 28%, black 72%, transparent 95%)',
        maskImage:'linear-gradient(to bottom, transparent 5%, black 28%, black 72%, transparent 95%)',
        opacity:0.38, mixBlendMode:'screen',
      }}>
        <ShaderCanvas />
      </div>

      {/* Bottom bloom */}
      <div style={{
        position:'absolute', bottom:0, left:'35%', width:'55%', height:130,
        background:'radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%)',
        filter:'blur(30px)',
      }} />
    </div>
  );
}
