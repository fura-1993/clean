import React from 'react';
import { motion } from 'framer-motion';

// Define types for props
type MenuItem = {
  href: string;
  label: string;
};

type MenuContentProps = {
  menuItems: readonly MenuItem[];
  closeMenu: () => void;
};

const MenuContent: React.FC<MenuContentProps> = ({ menuItems, closeMenu }) => {
  return (
    <>
      {/* Close Button */}
      <motion.button
        onClick={closeMenu}
        className="fixed top-6 right-6 z-50 text-white/70 hover:text-emerald-400 transition-colors"
        aria-label="メニューを閉じる"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.8 } }}
        exit={{ opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
         </svg>
      </motion.button>

      {/* Menu Content - Centered Diagonal with Frames - Shifted Left */}
      <motion.nav
        className="relative z-50 left-[-60px]" // Adjusted left offset
        aria-label="Main navigation"
        variants={{
          open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
        }}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {/* UL remains relative for positioning context */}
        <ul className="relative">
          {menuItems.map((item, i) => {
            // --- Settings for Diagonal Layout & Spacing ---
            const itemWidth = 200;
            const xSpacing = 120;
            const ySpacing = 100;
            const numItems = menuItems.length;
            const xOffset = (i - (numItems - 1) / 2) * xSpacing;
            const yOffset = (i - (numItems - 1) / 2) * ySpacing;
            // -----------------------------------------------

            return (
              <motion.li
                key={item.href}
                className="absolute list-none"
                style={{ 
                  x: xOffset,
                  y: yOffset,
                  width: `${itemWidth}px`, 
                }}
                variants={{
                  open: {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: { type: "spring", stiffness: 200, damping: 20 }
                  },
                  closed: {
                    opacity: 0,
                    scale: 0.8,
                    filter: 'blur(8px)',
                    transition: { duration: 0.2 }
                  }
                }}
              >
                {/* Futuristic Frame */}
                <motion.div
                  className="absolute -inset-x-4 -inset-y-2 border border-emerald-500/30 rounded-lg pointer-events-none"
                  animate={{
                    borderColor: [
                      'rgba(52, 211, 153, 0.3)',
                      'rgba(52, 211, 153, 0.7)',
                      'rgba(52, 211, 153, 0.3)',
                    ],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                 {/* Inner subtle glow/scan line */}
                <motion.div
                  className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
                >
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-emerald-400/0 via-emerald-400/50 to-emerald-400/0 shadow-[0_0_10px_theme(colors.emerald.500)]"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ 
                      duration: 2.5 + i * 0.3, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: i * 0.1
                    }}
                  />
                </motion.div>
                
                {/* Menu Item Link */}
                <motion.a
                  href={item.href}
                  className="flex items-center justify-center text-xl font-medium text-white/90 hover:text-emerald-300 transition-colors duration-300 px-6 py-2 relative group whitespace-nowrap bg-slate-900/50 backdrop-blur-sm rounded-md w-full h-full"
                  onClick={closeMenu}
                  style={{ writingMode: 'horizontal-tb' }} 
                  animate={{
                    textShadow: [
                      '0 0 4px rgba(52, 211, 153, 0.2)',
                      '0 0 6px rgba(52, 211, 153, 0.4)',
                      '0 0 4px rgba(52, 211, 153, 0.2)'
                    ],
                  }}
                  transition={{
                    textShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                    default: { type: "spring", stiffness: 400 }
                  }}
                  whileHover={{
                    scale: 1.05, 
                    y: -2, 
                    textShadow: '0 0 12px rgba(52, 211, 153, 0.9)',
                    color: '#34d399',
                    backgroundColor: 'rgba(15, 23, 42, 0.7)'
                  }}
                >
                  {item.label}
                </motion.a>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
};

export default MenuContent; 