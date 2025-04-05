import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const menuItems = [
  { href: '#services', label: 'サービス' },
  { href: '#features', label: '特徴' },
  { href: '#works', label: '施工事例' },
  { href: '#contact', label: 'お問い合わせ' }
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (window.scrollY <= 50) {
        setIsMenuOpen(false); // Close menu when scrolling to top
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] py-2' : 'bg-transparent py-4'
      }`}>
        {/* サイバーパンク風の装飾 & 新しい背景エフェクト - スクロール後のみ表示 */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              {/* Existing gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10" />
              
              {/* Existing top line animation */}
              <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
                animate={{ scaleX: [0, 1, 0], x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* New Background Tech Grid Animation */}
              <div className="absolute inset-0 mix-blend-overlay">
                <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
                  <defs>
                    <pattern id='patt' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(1) rotate(0)'>
                      <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
                      <path d='M10-1.5 V41.5 M-1.5 10 H41.5 M30-1.5 V41.5 M-1.5 30 H41.5' stroke='hsla(158, 82%, 57%, 0.05)' strokeWidth='1'/>
                    </pattern>
                  </defs>
                  <rect 
                    width='100%' 
                    height='100%' 
                    fill='url(#patt)' 
                    style={{
                      animation: 'bgGridMove 20s linear infinite'
                    }}
                  />
                </svg>
                 {/* Add Keyframes for bgGridMove in globals.css or via style tag if needed */}
                 <style jsx global>{`
                  @keyframes bgGridMove {
                    0% { background-position: 0% 0%; }
                    100% { background-position: -80px 80px; } /* Adjust values for speed/direction */
                  }
                  rect[fill='url(#patt)'] {
                    animation: bgGridMove 20s linear infinite;
                  }
                `}</style>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            {/* ハンバーガーメニューボタン */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-[51] group" // z-index higher than header
              aria-label="メニューを開閉"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Rotating Frame - Outer frames remain */}
                <motion.div
                  className="absolute inset-[-4px] border-2 border-emerald-500/50 rounded-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-[-8px] border border-emerald-500/30 rounded-xl"
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner rings REMOVED */}
                
                {/* メニューアイコン Lines - Adjusted Animation */}
                <div className="relative w-6 h-5 flex flex-col justify-between items-center">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block h-0.5 rounded-full bg-white shadow-[0_0_5px_rgba(52,211,153,0.5)] transform origin-center"
                      initial={false}
                      animate={isMenuOpen ? {
                        rotate: i === 1 ? 0 : (i === 0 ? 45 : -45),
                        y: i === 1 ? 0 : (i === 0 ? 7 : -7),
                        width: i === 1 ? "0%" : "100%",
                        opacity: i === 1 ? 0 : 1,
                        backgroundColor: "rgb(52, 211, 153)",
                      } : {
                        rotate: 0,
                        y: 0,
                        width: i === 1 ? "70%" : "100%",
                        opacity: 1,
                        backgroundColor: "rgb(255, 255, 255)",
                        x: [0, i === 0 ? -3 : (i === 2 ? 3 : 0), 0],
                        scaleX: [1, i === 1 ? 0.9 : 1.05, 1],
                      }}
                      transition={isMenuOpen ? {
                        duration: 0.3,
                        ease: "easeInOut"
                      } : {
                        x: { duration: 1.2 + i * 0.3, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                        scaleX: { duration: 1.8 + i * 0.3, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                        backgroundColor: { duration: 0.3 },
                        rotate: { duration: 0.3 },
                        y: { duration: 0.3 },
                        width: { duration: 0.3 },
                        opacity: { duration: 0.3 },
                      }}
                      style={{
                        boxShadow: "0 0 5px rgba(52, 211, 153, 0.3)",
                      }}
                    />
                  ))}
                </div>
                
                {/* ホバーエフェクト */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/10 transition-colors duration-300"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </button>

            {/* ロゴ - スクロール後のみ表示 */}
            <AnimatePresence>
              {isScrolled && (
                <Link href="/" className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 md:w-24"
                    >
                      <Image
                        src="/images/JTlogo.png"
                        alt="JT Professional Cleaning Service"
                        width={100}
                        height={30}
                        className="w-full h-auto"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </Link>
              )}
            </AnimatePresence>

            {/* 清掃サービスの特徴 - スクロール後のみ表示 */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:flex items-center gap-6 text-white/90"
                >
                  <div className="flex items-center gap-2">
                    <i className="fas fa-spray-can-sparkles text-emerald-400" />
                    <span className="text-sm">最新技術導入</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock text-emerald-400" />
                    <span className="text-sm">即日対応可能</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield-check text-emerald-400" />
                    <span className="text-sm">プロ品質保証</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 電話問い合わせ - スクロール後のみ表示 */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block"
                >
                  <div className="relative group">
                    <motion.div
                      className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 opacity-70 blur-sm group-hover:opacity-100 transition-all duration-300"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <a
                      href="tel:04-7185-0805"
                      className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/90 text-white hover:bg-slate-800 transition-all duration-300"
                    >
                      <i className="fas fa-phone-volume text-emerald-400 text-xl animate-bounce" />
                      <div>
                        <div className="text-xs font-medium text-emerald-400">24時間365日対応</div>
                        <div className="text-lg font-bold tracking-wider">04-7185-0805</div>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* モバイル用電話番号表示 */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-slate-800/90"
            >
              <a
                href="tel:04-7185-0805"
                className="flex items-center justify-center gap-2 py-2 text-white"
              >
                <i className="fas fa-phone-volume text-emerald-400 animate-bounce" />
                <div className="text-center">
                  <div className="text-xs text-emerald-400">24時間365日対応</div>
                  <div className="font-bold">04-7185-0805</div>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* === 開閉メニューパネル === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu-panel"
            className="fixed inset-0 z-40 flex items-center justify-center"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Close Button */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
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

            {/* Menu Content - Centered Diagonal with Frames */}
            <motion.nav
              className="relative z-50" 
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
                  const itemWidth = 200; // Approximate width for centering calculation
                  const xSpacing = 120; // Increased Horizontal spacing 
                  const ySpacing = 100; // Increased Vertical spacing
                  const numItems = menuItems.length;
                  
                  // Calculate offset from center for diagonal layout
                  const xOffset = (i - (numItems - 1) / 2) * xSpacing;
                  const yOffset = (i - (numItems - 1) / 2) * ySpacing;
                  // -----------------------------------------------

                  return (
                    <motion.li
                      key={item.href}
                      // Use absolute positioning relative to the centered nav
                      className="absolute list-none"
                      style={{ 
                        // Position relative to the (invisible) center point of the nav
                        x: xOffset,
                        y: yOffset,
                        // Ensure consistent width for frame calculation
                        width: `${itemWidth}px`, 
                      }}
                      variants={{
                        open: {
                          opacity: 1,
                          scale: 1, // Use scale for entrance
                          filter: 'blur(0px)',
                          transition: { type: "spring", stiffness: 200, damping: 20 }
                        },
                        closed: {
                          opacity: 0,
                          scale: 0.8, // Scale down on exit
                          filter: 'blur(8px)',
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {/* Futuristic Frame (Adjust padding if needed due to fixed width) */}
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
                        // Ensure text is centered within the fixed width
                        className="flex items-center justify-center text-xl font-medium text-white/90 hover:text-emerald-300 transition-colors duration-300 px-6 py-2 relative group whitespace-nowrap bg-slate-900/50 backdrop-blur-sm rounded-md w-full h-full"
                        onClick={() => setIsMenuOpen(false)}
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
                  )
                })}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 