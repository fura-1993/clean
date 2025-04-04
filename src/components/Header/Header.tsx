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
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
      <div className="container py-2 px-6">
        <div className="flex justify-between items-center">
          {/* ロゴ */}
          <Link href="/" className="relative z-50">
            <div className="relative w-32 h-10">
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
          <motion.button
            className="relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-[6px] group"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="メニュー"
          >
            <motion.div
              className="w-8 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full origin-left"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? -3 : 0,
                width: isHovered ? "32px" : "24px",
                opacity: 1
              }}
              initial={{ width: "24px" }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-[2px] bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
              animate={{
                scale: isOpen ? 0 : 1,
                x: isHovered ? "4px" : "0px",
                width: isHovered ? "28px" : "20px",
                opacity: isOpen ? 0 : 1
              }}
              initial={{ width: "20px" }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-8 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full origin-left"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 3 : 0,
                width: isHovered ? "32px" : "28px",
                opacity: 1
              }}
              initial={{ width: "28px" }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 180 : 0
              }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.button>
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