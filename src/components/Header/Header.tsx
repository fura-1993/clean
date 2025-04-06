"use client";

import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import LanguageSwitcher from '../LanguageSwitcher'
import { useLanguage } from '../../contexts/LanguageContext'

// Dynamically import the menu content component
const DynamicMenuContent = dynamic(() => import('./MenuContent'), { ssr: false })

// Define types for menu items for Header props if needed, or import from MenuContent
type MenuItem = {
  href: string;
  label: string;
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage();

  // メニュー項目を動的に翻訳に対応
  const menuItems: readonly MenuItem[] = [
    { href: '#services', label: t('services') },
    { href: '#features', label: t('features') },
    { href: '#portfolio', label: t('portfolio') },
    { href: '#contact', label: t('contact') }
  ]

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
            {/* 左側のナビゲーション部分 */}
            <div className="flex items-center space-x-3">
              {/* ハンバーガーメニューボタン */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[51] group" // z-index higher than header
                aria-label={t('toggleMenu')}
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

              {/* 言語切り替えボタン - 小さめのサイズで常に表示 */}
              <div className="ml-2">
                <div className="language-switcher-container">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>

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
                        alt={t('companyLogo')}
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
                    <span className="text-sm">{t('latest')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock text-emerald-400" />
                    <span className="text-sm">{t('sameDay')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield-check text-emerald-400" />
                    <span className="text-sm">{t('quality')}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 右側のコンテンツ - 電話問い合わせのみ */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:flex items-center gap-4"
                >
                  {/* 電話問い合わせ - 既存 */}
                  <div className="relative group">
                    <div className="relative">
                      <motion.div
                        className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 opacity-70 blur-sm group-hover:opacity-100 transition-all duration-300"
                        animate={{
                          scale: [1, 1.03, 1],
                          opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <a
                        href="tel:04-7185-0805"
                        className="relative flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/90 text-white hover:bg-slate-700/90 transition-all duration-300 shadow-md"
                      >
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-400/40 shadow-md flex-shrink-0">
                          <Image
                            src="/images/infostaff2.png"
                            alt={t('supportStaff')}
                            width={40} 
                            height={40}
                            className="object-cover w-full h-full"
                            priority
                          />
                        </div>
                        <i className="fas fa-phone-volume text-emerald-400 text-xl" />
                        <div>
                          <div className="text-xs font-medium text-emerald-400">{t('supportHours')}</div>
                          <div className="text-lg font-bold tracking-wider">04-7185-0805</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* モバイル用 - 電話番号表示のみ（言語切り替えは除去） */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-slate-800/90"
            >
              <div className="flex items-center justify-between px-4 py-2">
                {/* 電話番号 */}
                <a
                  href="tel:04-7185-0805"
                  className="flex items-center gap-2 text-white"
                >
                  <i className="fas fa-phone-volume text-emerald-400 animate-bounce" />
                  <div>
                    <div className="text-xs text-emerald-400">{t('supportHours')}</div>
                    <div className="font-bold">04-7185-0805</div>
                  </div>
                </a>
              </div>
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
              className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Dynamically loaded Menu Content */}
            <DynamicMenuContent 
              menuItems={menuItems} 
              closeMenu={() => setIsMenuOpen(false)} 
            />

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 