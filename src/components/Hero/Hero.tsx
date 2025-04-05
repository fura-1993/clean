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
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden pt-12">
      {/* 背景の装飾 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:200%_200%] animate-cyber-gradient"></div>
      </div>
      
      {/* テクノロジカルな背景パターン */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-white/20"
              style={{ top: `${(i + 1) * 25}%` }}
              animate={{
                x: [-1000, 1000],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
              }}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full w-px bg-white/20"
              style={{ left: `${(i + 1) * 25}%` }}
              animate={{
                y: [-1000, 1000],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* ホログラム風エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/80 rounded-full"
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
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
              className="relative inline-block mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="absolute -inset-2.5 bg-gradient-to-r from-white/20 via-white/30 to-white/20 rounded-full blur-lg"
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
              <div className="relative bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/15 shadow-lg">
                <motion.span 
                  className="text-base font-medium bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-wider"
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
              className="text-2xl md:text-3xl font-bold mb-10 leading-[1.2] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex flex-wrap gap-x-3 gap-y-2 mb-4 text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]">
                {["プ", "ロ", "フ", "ェ", "ッ", "シ", "ョ", "ナ", "ル"].map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white/90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                  }}
                >
                  な
                </motion.span>
              </div>
              <motion.div
                className="relative inline-block text-[2rem] md:text-[2.5rem] lg:text-[3rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1,
                }}
              >
                <motion.span 
                  className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2,
                  }}
                >
                  清掃サービス
                </motion.span>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-white/20 via-blue-200/40 to-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1,
                    delay: 1.4,
                  }}
                />
              </motion.div>
            </motion.h1>

            {/* サブテキスト */}
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-16 font-medium leading-[1.8]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="inline-block">
                最新の技術と熟練の技で、
              </span>
              <br className="hidden md:block" />
              <span className="inline-block">
                あらゆる空間を清潔で快適な環境に
              </span>
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
                className="group relative bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg font-bold text-base border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
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
                <span className="relative z-10 flex items-center justify-center text-white group-hover:text-white/90">
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
                className="group relative bg-white/5 backdrop-blur-sm px-6 py-4 rounded-lg font-bold text-base border border-white/10 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center text-white/90 group-hover:text-white">
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
                  className="group absolute w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] aspect-[4/3]"
                  style={{
                    top: `${index * 96}px`,
                    right: `${index * 100}px`,
                    zIndex: services.length - index,
                    transform: `rotate(${3 + index * 3}deg)`
                  }}
                  initial={{ opacity: 0, x: 100, rotate: 6 + index * 3 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <motion.i 
                          className={`${service.icon} text-white/90`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.3
                          }}
                        />
                        <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-sm text-white/80 transform group-hover:translate-x-1 transition-transform">
                        {service.description}
                      </p>
                      <motion.div
                        className="h-[1px] bg-white/20"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 0.8,
                          delay: 1 + index * 0.2
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cyber-gradient {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 200%; }
        }
      `}</style>
    </section>
  )
} 