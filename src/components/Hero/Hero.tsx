import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="hero-bg-wrapper rellax" data-rellax-speed="7">
        <div className="hero-bg-slice left"></div>
        <div className="hero-bg-slice middle"></div>
        <div className="hero-bg-slice right"></div>
      </div>
      
      <div className="hero-container container mx-auto px-4">
        <motion.div
          className="hero-content text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            プロフェッショナルな<br />清掃サービス
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            高圧洗浄・タイル洗浄・絨毯清掃のスペシャリスト
          </p>
          <div className="hero-btns flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#contact"
              className="btn primary-btn text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              無料見積もり依頼
            </motion.a>
            <motion.a
              href="#services"
              className="btn secondary-btn text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              サービスを見る
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 