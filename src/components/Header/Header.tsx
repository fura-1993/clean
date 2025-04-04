import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <a href="#" className="block transform scale-80 hover:scale-100 transition-transform duration-300 origin-left">
            <Image src="/images/JTロゴ.png" alt="JTロゴ" width={180} height={60} priority />
          </a>
        </div>
        
        <button
          className={`menu-button relative z-50 ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニュー"
        >
          <div className="menu-icon">
            <span className="bg-gray-800"></span>
            <span className="bg-gray-800"></span>
            <span className="bg-gray-800"></span>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <Navigation onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  )
} 