import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    icon: 'fas fa-sparkles',
    title: '絨毯清掃',
    description: '最新の技術で頑固な汚れも除去',
    image: '/images/絨毯清掃作業風景.png',
  },
  {
    icon: 'fas fa-droplet',
    title: '高圧洗浄',
    description: '外壁・駐車場の汚れを徹底洗浄',
    image: '/images/高圧洗浄作業風景.png',
  },
  {
    icon: 'fas fa-stars',
    title: 'タイル洗浄',
    description: '美観を復元し清潔な空間に',
    image: '/images/タイル洗浄作業風景.png',
  }
]

export default function Hero() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0, 1] }
    })
  }, [controls])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden pt-12">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
      
      {/* 動く背景パターン */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute w-full h-full bg-repeat" style={{ 
          backgroundImage: 'url(/images/葉っぱ.png)',
          animation: 'float 60s linear infinite'
        }}></div>
      </div>

      {/* キラキラエフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container relative h-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12">
          {/* 左側のコンテンツ */}
          <motion.div
            className="relative z-10 px-6 lg:px-12 pt-8"
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
          >
            <motion.div
              className="relative inline-block mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full blur opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-blue-950/50 backdrop-blur-sm px-8 py-3 rounded-full border border-white/10">
                <span className="text-lg font-medium text-yellow-400">Professional Cleaning Service</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="inline-block mb-2">プロフェッショナル</span>
              <span className="inline-block">な</span>
              <br />
              <span className="relative inline-block">
                <motion.span 
                  className="relative z-10 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  清掃サービス
                </motion.span>
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/20 -skew-x-6"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-blue-100/90 mb-12 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              最新の技術と熟練の技で、あらゆる空間を
              <br className="hidden md:block" />
              清潔で快適な環境に
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="#contact"
                className="group bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-white"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "-100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ mixBlendMode: "difference" }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <i className="fas fa-paper-plane mr-2" />
                  無料見積もりを依頼
                </span>
              </motion.a>
              <motion.a
                href="#services"
                className="group bg-white/5 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg border border-white/10 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center">
                  サービスの詳細を見る
                  <motion.i 
                    className="fas fa-arrow-right ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 右側のサービスカード */}
          <div className="relative h-full flex items-center justify-center lg:justify-end overflow-visible px-6 lg:px-0">
            <motion.div 
              className="relative w-full max-w-2xl -mt-12 lg:-mt-16"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="group absolute w-full max-w-md rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
                  style={{
                    top: `${index * 32}px`,
                    right: `${index * 26}px`,
                    zIndex: services.length - index,
                    transform: `rotate(${2 + index * 1.8}deg)`
                  }}
                  initial={{ opacity: 0, x: 100, rotate: 4 + index * 1.8 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.8,
                      delay: 0.8 + index * 0.2
                    }
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    rotate: 0,
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
                        <i className={`${service.icon} text-blue-900 text-xl`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-blue-100/90 transform group-hover:translate-x-1 transition-transform">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  )
} 