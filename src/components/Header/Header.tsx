import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            {/* ロゴ */}
            <Link href="/" className="flex items-center">
              <div className="relative w-40 h-12">
                <Image
                  src={isScrolled ? '/images/JTロゴ.png' : '/images/JTロゴ.png'}
                  alt="清掃サービス"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                  quality={90}
                  loading="eager"
                />
              </div>
            </Link>

            {/* ナビゲーション */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#services"
                className={`font-medium hover:text-yellow-400 transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                サービス
              </Link>
              <Link
                href="#features"
                className={`font-medium hover:text-yellow-400 transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                特徴
              </Link>
              <Link
                href="#works"
                className={`font-medium hover:text-yellow-400 transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                施工事例
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            {/* 電話番号 */}
            <div className="text-right hidden md:block">
              <div className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>
                24時間365日対応
              </div>
              <a
                href="tel:0120-000-000"
                className={`text-2xl font-bold ${isScrolled ? 'text-blue-900' : 'text-white'}`}
              >
                0120-000-000
              </a>
            </div>

            {/* お問い合わせボタン */}
            <motion.a
              href="#contact"
              className={`${
                isScrolled
                  ? 'bg-blue-900 text-white hover:bg-blue-800'
                  : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
              } px-6 py-3 rounded-lg font-bold transition-colors shadow-lg`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              無料見積もり
            </motion.a>
          </div>
        </div>
      </div>
    </header>
  )
} 