import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const phases = [
      { duration: 800, icon: Code, text: 'Initializing...' },
      { duration: 800, icon: Zap, text: 'Building components...' },
      { duration: 900, icon: Sparkles, text: 'Creating magic...' },
    ];

    let currentPhase = 0;
    let timeoutId;

    const nextPhase = () => {
      if (currentPhase < phases.length) {
        setLoadingPhase(currentPhase);
        currentPhase++;
        
        timeoutId = setTimeout(() => {
          if (currentPhase < phases.length) {
            nextPhase();
          } else {
            setTimeout(() => setIsLoading(false), 500);
          }
        }, phases[currentPhase - 1].duration);
      }
    };

    nextPhase();

    return () => clearTimeout(timeoutId);
  }, []);

  const phases = [
    { icon: Code, text: 'Initializing...' },
    { icon: Zap, text: 'Building components...' },
    { icon: Sparkles, text: 'Creating magic...' },
  ];

  const currentPhaseData = phases[loadingPhase] || phases[phases.length - 1];
  const CurrentIcon = currentPhaseData.icon;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50"
        >
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="w-24 h-24 mx-auto"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-500 p-1 shadow-lg shadow-primary-500/25">
                    <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                      <CurrentIcon className="w-12 h-12 text-primary-400" />
                    </div>
                  </div>
                </motion.div>
                
                {/* Glowing rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-primary-400/50"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-sky-400/40"
                />
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              key={loadingPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-light text-gray-300">
                {currentPhaseData.text}
              </h2>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 mx-auto">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: phases[loadingPhase]?.duration / 1000 || 1,
                    ease: "easeInOut",
                  }}
                  className="h-full bg-gradient-to-r from-primary-500 via-sky-500 to-primary-600"
                />
              </div>
            </div>

            {/* Particles removed — were heavy on load */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
