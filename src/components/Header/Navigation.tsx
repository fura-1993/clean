import React from 'react'
import { motion } from 'framer-motion'

interface NavigationProps {
  onClose: () => void
}

const menuItems = [
  { href: '#services', label: 'サービス' },
  { href: '#features', label: '特徴' },
  { href: '#testimonials', label: 'お客様の声' },
  { href: '#faq', label: 'よくある質問' },
  { href: '#contact', label: 'お問い合わせ' },
]

const Navigation: React.FC<NavigationProps> = ({ onClose }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (!href) return

    const targetElement = document.querySelector(href)
    if (targetElement) {
      onClose()
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.nav
      className="expanded-nav fixed inset-0 bg-white/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="expanded-nav-content h-full flex items-center justify-center">
        <motion.div
          className="nav-links flex flex-col items-center space-y-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {menuItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-2xl font-medium text-gray-800 hover:text-primary-600 transition-colors"
              onClick={handleClick}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navigation 