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
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white overflow-hidden pt-12">
      {/* 背景の装飾 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12)_0%,transparent_50%)]"></div>
      
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
            {/* タイトルバッジ */}
            <motion.div
              className="relative inline-block mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="absolute -inset-2.5 bg-gradient-to-r from-emerald-400/20 via-white/30 to-emerald-400/20 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 90, 180],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative bg-emerald-900/60 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/15 shadow-md">
                <motion.span 
                  className="text-base font-medium bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent tracking-wider"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  Professional Cleaning Service
                </motion.span>
              </div>
            </motion.div>

            {/* メインタイトル */}
            <motion.h1 
              className="text-2xl md:text-3xl font-bold mb-6 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex flex-wrap gap-x-2 mb-2 text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]">
                {["プ", "ロ", "フ", "ェ", "ッ", "シ", "ョ", "ナ", "ル"].map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white/90"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block text-white/90"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.9,
                  }}
                >
                  な
                </motion.span>
              </div>
              <motion.div
                className="relative inline-block text-[2rem] md:text-[2.5rem] lg:text-[3rem]"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <motion.span 
                  className="relative z-10 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  清掃サービス
                </motion.span>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-white/20 via-emerald-200/40 to-white/20"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: "100%",
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    width: { duration: 1, delay: 1.2 },
                    backgroundPosition: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                />
              </motion.div>
            </motion.h1>

            {/* サブテキスト */}
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-12 font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                最新の技術と熟練の技で、
              </motion.span>
              <br className="hidden md:block" />
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                あらゆる空間を清潔で快適な環境に
              </motion.span>
            </motion.p>

            {/* ボタングループ */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="#contact"
                className="group relative bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 text-emerald-900 px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:shadow-xl overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundSize: "200% 100%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <motion.i 
                    className="fas fa-paper-plane mr-2"
                    animate={{
                      x: [0, 4, 0],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  無料見積もりを依頼
                </span>
              </motion.a>
              <motion.a
                href="#services"
                className="group relative bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg font-bold text-base border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-300/10 to-emerald-400/0"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  サービスの詳細を見る
                  <motion.i 
                    className="fas fa-arrow-right ml-2"
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 右側のサービスカード */}
          <div className="relative flex justify-center lg:justify-end overflow-visible px-6 lg:px-0">
            <motion.div 
              className="relative w-full max-w-2xl -mt-32 lg:-mt-48"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="group absolute w-full max-w-md rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
                  style={{
                    top: `${index * 64}px`,
                    right: `${index * 80}px`,
                    zIndex: services.length - index,
                    transform: `rotate(${4 + index * 4}deg)`
                  }}
                  initial={{ opacity: 0, x: 100, rotate: 8 + index * 4 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.8,
                      delay: 0.8 + index * 0.2
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 0,
                    zIndex: 10,
                    transition: { duration: 0.4 }
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
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-900/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-center p-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold group-hover:text-emerald-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/80 transform group-hover:translate-x-1 transition-transform">
                        {service.description}
                      </p>
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