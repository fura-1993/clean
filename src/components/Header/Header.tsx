import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] py-2' : 'bg-transparent py-4'
    }`}>
      {/* サイバーパンク風の装飾 - スクロール後のみ表示 */}
      <AnimatePresence>
        {isScrolled && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10" />
              <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
                animate={{
                  scaleX: [0, 1, 0],
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
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
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-20 md:w-24"
                  >
                    <Image
                      src="/images/JTロゴ.png"
                      alt="Professional Cleaning Service"
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

          {/* ハンバーガーメニュー */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-10 p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="メニュー"
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className={`block h-0.5 rounded-full transform transition-all duration-300 ${
                    isScrolled ? 'bg-white' : 'bg-white'
                  }`}
                  style={{ transformOrigin: "center" }}
                  animate={isMenuOpen ? {
                    rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
                    y: i === 1 ? 0 : i === 0 ? 10 : -10,
                    opacity: i === 1 ? 0 : 1,
                    width: i === 1 ? "100%" : "100%"
                  } : {
                    rotate: 0,
                    y: 0,
                    opacity: 1,
                    width: i === 1 ? "75%" : "100%"
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </button>
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
  )
} 