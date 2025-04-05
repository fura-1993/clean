import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [showLoading, setShowLoading] = useState(false);

  // Prevent flash of loading screen if content loads very quickly
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 150); // Only show after 150ms

    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null; // Render nothing initially
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_60%)]"></div>
        
        {/* Subtle Grid */} 
         <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg' className="opacity-40">
          <defs>
            <pattern id='loadingGrid' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M20-1.5 V41.5 M-1.5 20 H41.5' stroke='hsla(158, 82%, 57%, 0.04)' strokeWidth='0.5'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#loadingGrid)' />
        </svg>
        
        {/* Moving Lines - adjusted */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
            style={{
              width: '150%', // Make lines longer
              top: `${20 + i * 20}%`,
              left: '-25%' // Start off-screen
            }}
            animate={{
              x: ['0%', '50%', '0%'], // Move back and forth
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5, // Vary duration
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Loading Spinner */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        {/* Outer Ring 1 */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ 
             rotate: { duration: 4, repeat: Infinity, ease: "linear" },
             scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
           }}
        />
        {/* Outer Ring 2 */}
        <motion.div
          className="absolute -inset-3 rounded-full border border-emerald-500/20"
          animate={{ rotate: -360, opacity: [0.5, 0.8, 0.5] }}
          transition={{ 
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Central Icon - Water Droplet / Cleanliness */}
        <motion.div
           className="relative z-10 flex items-center justify-center w-12 h-12 bg-slate-900 rounded-full shadow-lg shadow-emerald-950/50 border border-emerald-500/20"
           animate={{ scale: [1, 1.1, 1] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         >
           {/* Animated Water Droplet Icon */}
           <motion.svg 
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 24 24" 
             fill="currentColor"
             className="w-6 h-6 text-emerald-400"
             animate={{ 
                y: [-1, 1, -1],
                opacity: [0.8, 1, 0.8]
              }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
           >
             <path fillRule="evenodd" d="M12.53 2.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l7.5-7.5a.75.75 0 0 1 1.06 0ZM12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-1.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" clipRule="evenodd" />
             <motion.path 
               d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
               fill="none"
               stroke="currentColor"
               strokeWidth="1.5"
               strokeDasharray="0 1"
               animate={{ strokeDashoffset: [0, -10] }} 
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} 
             />
           </motion.svg>
         </motion.div>

        {/* Particles radiating outwards */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-0.5 h-1.5 bg-emerald-400/70 rounded-full"
            style={{ originX: '50%', originY: '50%' }}
            animate={{
              x: [0, Math.cos(i * Math.PI / 5) * 50, Math.cos(i * Math.PI / 5) * 60],
              y: [0, Math.sin(i * Math.PI / 5) * 50, Math.sin(i * Math.PI / 5) * 60],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <motion.div
          className="text-white/90 text-lg font-medium tracking-wider mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          LOADING
        </motion.div>
        <motion.div
          className="text-emerald-400/80 text-sm font-light tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          INITIALIZING CLEAN ENVIRONMENT...
        </motion.div>
      </div>
    </div>
  );
} 