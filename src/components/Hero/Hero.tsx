import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    icon: 'fas fa-couch',
    title: '絨毯清掃',
    description: '最新の技術で頑固な汚れも除去',
    image: '/images/carpet-cleaning.jpg'
  },
  {
    icon: 'fas fa-shower',
    title: '高圧洗浄',
    description: '外壁・駐車場の汚れを徹底洗浄',
    image: '/images/pressure-washing.jpg'
  },
  {
    icon: 'fas fa-border-all',
    title: 'タイル洗浄',
    description: '美観を復元し清潔な空間に',
    image: '/images/tile-cleaning.jpg'
  }
]

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1)_0%,transparent_60%)]"></div>

      <div className="container relative pt-32 pb-20">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            プロフェッショナルな<br />
            <span className="text-yellow-400">清掃サービス</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12">
            最新の技術と熟練の技で、あらゆる空間を清潔で快適な環境に
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="#contact"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              無料見積もりを依頼
            </motion.a>
            <motion.a
              href="#services"
              className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              サービスの詳細を見る
            </motion.a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-3">
                  <i className={`${service.icon} text-yellow-400 text-2xl mr-3`}></i>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-blue-100">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 実績バッジ */}
        <motion.div
          className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-yellow-400 rounded-full p-2">
            <span className="text-blue-900 font-bold">12</span>
          </div>
          <div>
            <div className="text-sm opacity-75">年間施工実績</div>
            <div className="font-bold">10,000件以上</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 