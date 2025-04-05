import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { memo } from 'react'

// Define a more explicit type for services where icon is optional
type Service = {
  title: string;
  description: string;
  image: string;
  icon?: string; // Make icon optional
};

const services: readonly Service[] = [
  {
    icon: 'fas fa-sparkles',
    title: '絨毯清掃',
    description: '最新の技術で頑固な汚れも除去',
    image: '/images/絨毯清掃作業風景.png',
  },
  {
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

// 背景のグラデーションコンポーネントをメモ化
const BackgroundGradients = memo(() => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_50%)]"></div>
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:200%_200%] animate-cyber-gradient"></div>
  </div>
))
BackgroundGradients.displayName = 'BackgroundGradients'

// サービスカードコンポーネント - Positioning adjusted
const ServiceCard = memo(({ service, index, total }: { service: Service, index: number, total: number }) => (
  <motion.div
    className="group absolute w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] aspect-[4/3]"
    style={{
      // Simplified positioning: reduce offsets and rotation slightly
      top: `${index * 60}px`, // Reduced vertical offset
      right: `${index * 60}px`, // Reduced horizontal offset
      zIndex: total - index,
      transform: `rotate(${2 + index * 2}deg)` // Reduced rotation
    }}
    initial={{ opacity: 0, x: 100, rotate: 4 + index * 2 }}
    whileInView={{ 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2 + index * 0.2
      }
    }}
    viewport={{ once: true }}
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
      quality={75}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
    <div className="absolute inset-0 flex flex-col justify-end p-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {service.icon && <i className={`${service.icon} text-white/90`} />}
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
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * 0.2
          }}
        />
      </div>
    </div>
  </motion.div>
))
ServiceCard.displayName = 'ServiceCard'

// メインコンポーネント
function Hero() {
  const controls = useAnimation()

  React.useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] }
    })
  }, [controls])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden pt-12">
      <BackgroundGradients />
      
      <div className="container relative h-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12">
          {/* 左側のコンテンツ */}
          <motion.div
            className="relative z-10 px-6 lg:px-12 pt-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* タイトルバッジ */}
            <motion.div
              className="relative inline-block mb-16"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/15 shadow-lg">
                <span className="text-base font-medium bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-wider">
                  Professional Cleaning Service
                </span>
              </div>
            </motion.div>

            {/* メインタイトル */}
            <motion.h1 
              className="text-2xl md:text-3xl font-bold mb-10 leading-[1.2] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap gap-x-3 gap-y-2 mb-4 text-[1rem] md:text-[1.25rem] lg:text-[1.5rem]">
                {["プ", "ロ", "フ", "ェ", "ッ", "シ", "ョ", "ナ", "ル", "な"].map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block text-white/90"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="relative inline-block text-[2rem] md:text-[2.5rem] lg:text-[3rem]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  清掃サービス
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-white/20 via-blue-200/40 to-white/20 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            </motion.h1>

            {/* サブテキスト */}
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-16 font-medium leading-[1.8]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="group relative bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg font-bold text-base border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center text-white group-hover:text-white/90">
                  <i className="fas fa-paper-plane mr-2" />
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
                  <i className="fas fa-arrow-right ml-2" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 右側のサービスカードコンテナ - Removed negative margin */}
          <div className="relative flex justify-center lg:justify-end overflow-visible px-6 lg:px-0">
            <motion.div 
              className="relative w-full max-w-2xl h-[calc(100%+120px)]" // Ensure container has enough height for offset cards
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  total={services.length}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero) 