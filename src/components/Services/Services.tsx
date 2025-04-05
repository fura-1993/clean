import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  {
    id: 'high-pressure',
    icon: 'fas fa-water',
    title: '高圧洗浄',
    shortDesc: '外壁・床面の頑固な汚れを強力除去',
    longDesc: '最新鋭の高圧洗浄機を使用し、外壁、駐車場、ベランダ等の汚れを根本から除去。新築のような輝きを取り戻します。',
    features: ['建造物外壁', 'コンクリート床', 'タイル・石材', '屋根・雨どい'],
    image: '/images/高圧洗浄作業風景.png'
  },
  {
    id: 'tile-cleaning',
    icon: 'fas fa-brush',
    title: 'タイル洗浄 & コーティング',
    shortDesc: 'タイルの美観回復と防汚コーティング',
    longDesc: '特殊洗剤と専用機器でタイルの黒ずみや水垢を除去。さらに防汚・防カビコーティングで美しさを長期間維持します。',
    features: ['床・壁タイル', '浴室・キッチン', 'エントランス', '防汚コーティング'],
    image: '/images/タイル洗浄作業風景.png'
  },
  {
    id: 'carpet-cleaning',
    icon: 'fas fa-spray-can-sparkles',
    title: '特殊カーペットクリーニング',
    shortDesc: '繊維の奥から汚れを除去、消臭・除菌も',
    longDesc: '先進のカーペット洗浄システムで、深層の汚れ、シミ、臭いを徹底除去。アレルギー対策にも効果的です。',
    features: ['オフィス・店舗', 'ホテル・住宅', 'シミ抜き・消臭', 'アレルゲン除去'],
    image: '/images/絨毯清掃作業風景.png'
  }
]

// Animation Variants for the content area
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Services() {
  const [selectedTab, setSelectedTab] = useState(services[0].id);

  const selectedService = services.find(s => s.id === selectedTab);

  return (
    <section 
      id="services" 
      className="relative overflow-hidden py-20 md:py-32 text-white/90"
    >
      {/* Background Elements - Made semi-transparent for fixed background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {/* Grid */}
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='servicesGrid' patternUnits='userSpaceOnUse' width='70' height='70' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M35-1.5 V71.5 M-1.5 35 H71.5' stroke='hsla(158, 82%, 57%, 0.02)' strokeWidth='0.7'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#servicesGrid)' />
        </svg>
      </div>
      {/* Top Edge Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-600/25 to-transparent"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-400 tracking-tight" style={{ textShadow: '0 0 12px rgba(52, 211, 153, 0.4)' }}>
            提供サービス
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">多様なニーズに応える、プロフェッショナル清掃ソリューション。</p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mb-10 md:mb-12 flex justify-center border-b border-emerald-500/20">
          {services.map((tab) => (
            <motion.button
              key={tab.id}
              className={`relative px-4 py-3 md:px-6 md:py-4 text-sm md:text-base font-medium transition-colors duration-300 
                         ${selectedTab === tab.id ? 'text-emerald-300' : 'text-slate-400 hover:text-slate-200'}`}
              onClick={() => setSelectedTab(tab.id)}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`${tab.icon} mr-2 opacity-70`}></i>
              {tab.title}
              {selectedTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_8px_theme(colors.emerald.500)]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */} 
        <div className="relative">
          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.div
                key={selectedService.id} // Important for AnimatePresence to detect changes
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center bg-slate-800/40 backdrop-blur-lg p-6 md:p-10 rounded-xl border border-emerald-500/20 shadow-xl shadow-emerald-950/30"
              >
                {/* Image Column */}
                <div className="lg:col-span-2 relative h-64 md:h-80 lg:h-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={selectedService.image}
                    alt={`${selectedService.title}の作業イメージ`}
                    fill
                    className="object-cover"
                    priority={true} // Load image eagerly as it's the main content
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-3">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-emerald-300 flex items-center">
                     <i className={`${selectedService.icon} mr-3 text-emerald-400/80 text-xl`}></i>
                     {selectedService.title}
                  </h3>
                  <p className="text-base text-slate-300 mb-6 leading-relaxed">{selectedService.longDesc}</p>
                  
                  <div className="mb-8 border-t border-emerald-500/15 pt-5">
                     <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">主な対応箇所</h4>
                     <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {selectedService.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-slate-400">
                            <i className="fas fa-check mr-2 text-emerald-500 text-xs"></i>
                            {feature}
                          </li>
                        ))}
                     </ul>
                  </div>

                  <motion.a
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-lg shadow-md shadow-emerald-800/30 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-emerald-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 group hover:from-emerald-500 hover:to-emerald-500"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    このサービスについて問い合わせる
                    <i className="fas fa-arrow-right ml-2.5 text-emerald-200/80 transform transition-transform duration-300 group-hover:translate-x-1"></i>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
} 