import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { href: '#services', label: 'サービス' },
  { href: '#features', label: '特徴' },
  { href: '#works', label: '施工事例' },
  { href: '#contact', label: 'お問い合わせ' }
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
      }
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  }

  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0
    },
    open: (i: number) => ({
      rotate: i === 1 ? 45 : i === 2 ? -45 : 0,
      y: i === 1 ? 6 : i === 2 ? -6 : 0
    })
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container py-4 px-6">
        <div className="flex justify-between items-center">
          {/* ロゴ */}
          <Link href="/" className="relative z-50">
            <div className="relative w-40 h-12">
              <Image
                src={isScrolled ? '/images/JTロゴ.png' : '/images/JTロゴ.png'}
                alt="清掃サービス"
                fill
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'opacity-100' : 'opacity-0'
                }`}
                priority
                quality={90}
                loading="eager"
              />
            </div>
          </Link>

          {/* ハンバーガーメニュー */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-50 w-12 h-12 flex flex-col justify-center items-center ${
              isMenuOpen ? 'fixed right-6' : ''
            }`}
            aria-label="メニュー"
          >
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className={`block w-6 h-0.5 my-0.5 transform transition-all duration-300 ${
                  isScrolled && !isMenuOpen ? 'bg-blue-900' : 'bg-white'
                } ${i === 2 && isMenuOpen ? 'opacity-0' : ''}`}
                variants={lineVariants}
                custom={i}
                animate={isMenuOpen ? 'open' : 'closed'}
              ></motion.span>
            ))}
          </button>
        </div>
      </div>

      {/* フルスクリーンメニュー */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-blue-950/95 backdrop-blur-lg z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container h-full flex items-center justify-center">
              <nav className="flex flex-col items-center space-y-8">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={item.href}
                      className="text-3xl font-bold text-white hover:text-yellow-400 transition-colors relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 