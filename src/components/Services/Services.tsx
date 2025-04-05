import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const services = [
  {
    icon: 'fas fa-water',
    title: '高圧洗浄',
    shortDesc: '外壁・床面の頑固な汚れを強力除去',
    longDesc: '最新鋭の高圧洗浄機を使用し、外壁、駐車場、ベランダ等の汚れを根本から除去。新築のような輝きを取り戻します。',
    features: ['建造物外壁', 'コンクリート床', 'タイル・石材', '屋根・雨どい'],
    image: '/images/高圧洗浄作業風景.png'
  },
  {
    icon: 'fas fa-brush',
    title: 'タイル洗浄 & コーティング',
    shortDesc: 'タイルの美観回復と防汚コーティング',
    longDesc: '特殊洗剤と専用機器でタイルの黒ずみや水垢を除去。さらに防汚・防カビコーティングで美しさを長期間維持します。',
    features: ['床・壁タイル', '浴室・キッチン', 'エントランス', '防汚コーティング'],
    image: '/images/タイル洗浄作業風景.png'
  },
  {
    icon: 'fas fa-spray-can-sparkles',
    title: '特殊カーペットクリーニング',
    shortDesc: '繊維の奥から汚れを除去、消臭・除菌も',
    longDesc: '先進のカーペット洗浄システムで、深層の汚れ、シミ、臭いを徹底除去。アレルギー対策にも効果的です。',
    features: ['オフィス・店舗', 'ホテル・住宅', 'シミ抜き・消臭', 'アレルゲン除去'],
    image: '/images/絨毯清掃作業風景.png'
  }
]

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
  },
};

export default function Services() {
  return (
    <section 
      id="services" 
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950 text-white/90"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
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
          className="text-center mb-16 md:mb-20"
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

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }} // Trigger when 15% is visible
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="service-card relative flex flex-col bg-slate-800/70 backdrop-blur-xl rounded-xl overflow-hidden border border-emerald-500/25 shadow-xl shadow-emerald-950/35 transition-all duration-300 hover:shadow-emerald-800/50 hover:border-emerald-500/40 group"
              variants={itemVariants}
            >
              {/* Image container with overlay */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title}の作業イメージ`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                 {/* Subtle overlay for text contrast */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
                 {/* Title overlay */} 
                 <div className="absolute bottom-0 left-0 p-4 md:p-5">
                   <h3 className="text-2xl font-semibold text-white/95" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      <i className={`${service.icon} mr-2 text-emerald-300/80`}></i>
                      {service.title}
                   </h3>
                   <p className="text-sm text-emerald-200/80 mt-1">{service.shortDesc}</p>
                 </div>
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-grow p-5 md:p-6">
                 <p className="text-sm text-slate-300 mb-5 flex-grow">{service.longDesc}</p>
                 
                 {/* Features List */}
                 <div className="mb-6 border-t border-emerald-500/15 pt-4">
                    <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2.5">主な対応箇所</h4>
                    <ul className="space-y-1.5">
                       {service.features.map((feature) => (
                         <li key={feature} className="flex items-center text-xs text-slate-400">
                           <i className="fas fa-check mr-2 text-emerald-500 text-[10px]"></i>
                           {feature}
                         </li>
                       ))}
                    </ul>
                 </div>

                 {/* Contact Button */}
                 <motion.a
                   href="#contact"
                   className="mt-auto inline-block w-full text-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-lg shadow-md shadow-emerald-800/30 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-emerald-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 group-hover:from-emerald-500 group-hover:to-emerald-500"
                   whileHover={{ scale: 1.03, y: -2 }}
                   whileTap={{ scale: 0.97 }}
                 >
                   このサービスについて問い合わせる
                   <i className="fas fa-arrow-right ml-2 text-emerald-200/80 transform transition-transform duration-300 group-hover:translate-x-1"></i>
                 </motion.a>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 