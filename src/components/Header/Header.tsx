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
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="relative z-10">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-40 md:w-48' : 'w-32 md:w-40'
                }`}
              >
                <Image
                  src="/images/logo.png"
                  alt="Professional Cleaning Service"
                  width={200}
                  height={60}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </motion.div>
          </Link>

          {/* 電話問い合わせ */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`hidden md:flex items-center gap-2 ${
              isScrolled ? 'text-slate-800' : 'text-white'
            }`}
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
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-white/95 text-slate-800 hover:bg-white transition-all duration-300"
              >
                <i className="fas fa-phone-volume text-emerald-600 text-xl animate-bounce" />
                <div>
                  <div className="text-xs font-medium text-emerald-600">お気軽にお電話ください</div>
                  <div className="text-lg font-bold tracking-wider">04-7185-0805</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ハンバーガーメニュー */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-10 p-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="メニュー"
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className={`block h-0.5 rounded-full transform transition-all duration-300 ${
                    isScrolled ? 'bg-slate-800' : 'bg-white'
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
            className="md:hidden border-t border-slate-100 bg-white"
          >
            <a
              href="tel:04-7185-0805"
              className="flex items-center justify-center gap-2 py-2 text-slate-800"
            >
              <i className="fas fa-phone-volume text-emerald-600 animate-bounce" />
              <span className="font-bold">04-7185-0805</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 