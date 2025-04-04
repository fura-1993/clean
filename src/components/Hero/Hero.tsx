import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: '🕒',
    title: '最短当日',
    description: '提案が集まる'
  },
  {
    icon: '👍',
    title: '満足度87%',
    description: '高精度マッチング'
  },
  {
    icon: '¥',
    title: '完全無料',
    description: 'ご利用は'
  }
]

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white min-h-[600px] flex items-center">
      {/* 背景のドット模様 */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-blue-900 text-white px-4 py-2 rounded-lg mb-6">
              条件に合う
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-8 leading-tight">
              清掃業者が<br />すぐに見つかる！
            </h1>
            <div className="text-xl text-blue-900 font-semibold mb-12 bg-blue-900 text-white py-4">
              スピードとマッチング度が、エミーオは違います！
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-4 rounded-lg shadow-sm text-center"
                >
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <div className="font-bold text-lg mb-1">{feature.title}</div>
                  <div className="text-sm text-gray-600">{feature.description}</div>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="inline-block bg-red-600 text-white text-xl font-bold px-12 py-6 rounded-lg shadow-lg hover:bg-red-700 transition-colors w-full md:w-auto text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm mb-1">簡単1分</div>
              <div className="flex items-center justify-center">
                <span>ここからスタート</span>
                <svg
                  className="w-6 h-6 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="/images/cleaning-hero.jpg"
                alt="清掃作業の様子"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <div className="text-sm font-semibold">とにかく</div>
                <div className="text-lg font-bold text-blue-900">丁寧さ重視！</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 