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
            className="relative z-50 w-14 h-14 flex flex-col items-center justify-center gap-[8px] group"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="メニュー"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-9 h-[2px] bg-emerald-400 rounded-none origin-left shadow-[0_0_10px_#34d399]"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? -4 : 0,
                width: isHovered ? "36px" : "28px",
                opacity: 1,
                x: !isOpen && !isHovered ? [-2, 2, -2] : 0,
                boxShadow: isHovered ? "0 0 20px #34d399" : "0 0 10px #34d399"
              }}
              initial={{ width: "28px" }}
              transition={{
                duration: 0.3,
                x: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div
              className="w-7 h-[2px] bg-emerald-400 rounded-none shadow-[0_0_10px_#34d399]"
              animate={{
                scale: isOpen ? 0 : 1,
                x: isHovered ? "4px" : !isOpen ? [-3, 3, -3] : 0,
                width: isHovered ? "32px" : "24px",
                opacity: isOpen ? 0 : 1,
                boxShadow: isHovered ? "0 0 20px #34d399" : "0 0 10px #34d399"
              }}
              initial={{ width: "24px" }}
              transition={{
                duration: 0.3,
                x: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }}
            />
            <motion.div
              className="w-9 h-[2px] bg-emerald-400 rounded-none origin-left shadow-[0_0_10px_#34d399]"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 4 : 0,
                width: isHovered ? "36px" : "32px",
                opacity: 1,
                x: !isOpen && !isHovered ? [2, -2, 2] : 0,
                boxShadow: isHovered ? "0 0 20px #34d399" : "0 0 10px #34d399"
              }}
              initial={{ width: "32px" }}
              transition={{
                duration: 0.3,
                x: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-emerald-400/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
                opacity: isHovered ? 0.8 : 0.4,
                borderColor: ["rgba(52, 211, 153, 0.3)", "rgba(52, 211, 153, 0.6)", "rgba(52, 211, 153, 0.3)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* フルスクリーンメニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-emerald-950/98 via-emerald-900/95 to-emerald-800/98 backdrop-blur-lg z-40"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* サイバーパンク風の装飾的な背景 */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(52,211,153,0.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-cyber-gradient"></div>
              <div className="absolute w-full h-px top-1/4 left-0 bg-emerald-400/20 shadow-[0_0_15px_#34d399] animate-scan-line"></div>
              <div className="absolute w-full h-px top-2/4 left-0 bg-emerald-400/20 shadow-[0_0_15px_#34d399] animate-scan-line-reverse"></div>
              <div className="absolute w-full h-px top-3/4 left-0 bg-emerald-400/20 shadow-[0_0_15px_#34d399] animate-scan-line"></div>
            </div>

            <div className="container h-full flex items-center justify-center relative">
              <nav className="flex flex-col items-center space-y-8">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        delay: i * 0.15,
                        ease: [0.2, 0.65, 0.3, 0.9]
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -30,
                      scale: 0.9,
                      transition: {
                        duration: 0.2,
                        delay: (menuItems.length - i - 1) * 0.1
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className="text-4xl font-bold text-emerald-400 hover:text-white transition-all duration-300 relative group flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.span
                        className="absolute -left-8 opacity-0 group-hover:opacity-100 text-emerald-400"
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ⟫
                      </motion.span>
                      <span className="relative">
                        {item.label}
                        <motion.div
                          className="absolute -bottom-2 left-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_#34d399]"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes cyber-gradient {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 200%; }
        }
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan-line-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-cyber-gradient {
          animation: cyber-gradient 15s linear infinite;
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
        .animate-scan-line-reverse {
          animation: scan-line-reverse 3s linear infinite;
        }
      `}</style>
    </header>
  )
} 