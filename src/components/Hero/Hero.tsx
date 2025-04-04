import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    icon: 'fas fa-couch',
    title: '絨毯清掃',
    description: '最新の技術で頑固な汚れも除去',
    image: '/images/絨毯清掃作業風景.png',
  },
  {
    icon: 'fas fa-shower',
    title: '高圧洗浄',
    description: '外壁・駐車場の汚れを徹底洗浄',
    image: '/images/高圧洗浄作業風景.png',
  },
  {
    icon: 'fas fa-border-all',
    title: 'タイル洗浄',
    description: '美観を復元し清潔な空間に',
    image: '/images/タイル洗浄作業風景.png',
  }
]

export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0" style={{ background: 'url(/images/葉っぱ.png) repeat', opacity: 0.03 }}></div>

      <div className="container relative h-full flex flex-col justify-center">
        <motion.div
          className="text-center max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block">プロフェッショナル</span>
            <span className="inline-block">な</span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-yellow-400">清掃サービス</span>
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/20 -skew-x-6"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1 }}
              ></motion.span>
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-blue-100/90 mb-12 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            最新の技術と熟練の技で、あらゆる空間を清潔で快適な環境に
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="group bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">無料見積もりを依頼</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </motion.a>
            <motion.a
              href="#services"
              className="group bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg border border-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              サービスの詳細を見る
              <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-4 -mt-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative rounded-2xl overflow-hidden shadow-2xl h-[260px] transform hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
                quality={90}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/80 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center backdrop-blur-sm transform -rotate-6 group-hover:rotate-0 transition-transform">
                    <i className={`${service.icon} text-yellow-400 text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-yellow-400 transition-colors">{service.title}</h3>
                    <p className="text-sm text-blue-100/90">{service.description}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <motion.div
                  className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className="fas fa-arrow-right text-sm text-white/70"></i>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 実績バッジ */}
        <motion.div
          className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center space-x-3 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-yellow-400 rounded-xl p-2 transform -rotate-6">
            <span className="text-blue-900 font-bold">12</span>
          </div>
          <div>
            <div className="text-xs text-blue-100/70">年間施工実績</div>
            <div className="font-bold text-white">10,000件以上</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 