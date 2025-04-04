import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: 'fas fa-microchip',
    title: '最先端技術',
    description: '最新AIとロボティクス技術を導入。効率的かつ高品質な清掃を実現します。'
  },
  {
    icon: 'fas fa-shield-virus',
    title: '徹底除菌',
    description: '環境と人体に優しい専用薬剤を使用。見えない菌まで徹底的に除去し、衛生的な空間を提供します。'
  },
  {
    icon: 'fas fa-shipping-fast',
    title: '即応体制',
    description: '24時間365日受付。お客様の緊急のご要望にも迅速に対応できる体制を整えています。'
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: '最適コスト',
    description: '無駄を排除した効率的なオペレーションで、高品質サービスを適正価格でご提供します。'
  },
  {
    icon: 'fas fa-user-shield',
    title: '信頼と保証',
    description: '万全の損害保険加入。作業後の品質にご満足いただけない場合は、無償で再対応いたします。'
  },
  {
    icon: 'fas fa-headset',
    title: '専任サポート',
    description: 'お客様ごとに専任担当者がつき、ご要望に合わせた最適なプランと丁寧なサポートを提供します。'
  }
]

// Variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect for cards
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.4, 0, 0.2, 1] // Smooth cubic bezier
    } 
  },
};

export default function Features() {
  return (
    <section 
      id="features" 
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900 text-white/90"
    >
      {/* Subtle Background Grid - adjusted density */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='featuresGrid' patternUnits='userSpaceOnUse' width='50' height='50' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M25-1.5 V51.5 M-1.5 25 H51.5' stroke='hsla(158, 82%, 57%, 0.025)' strokeWidth='0.5'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#featuresGrid)' />
        </svg>
      </div>
      {/* Bottom Edge Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-600/20 to-transparent"></div>

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
            選ばれる理由
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">JT Cleaning Service が提供する、他にはない価値と安心。</p>
        </motion.div>

        {/* Features Grid */} 
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% is visible
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="feature-card relative overflow-hidden bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 lg:p-8 border border-emerald-500/20 shadow-lg shadow-emerald-950/30 group transition-all duration-300 hover:bg-slate-800/80 hover:border-emerald-500/40 hover:shadow-emerald-800/40"
              variants={itemVariants}
            >
              {/* Subtle Glow effect on hover */} 
               <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.15) 0%, rgba(52, 211, 153, 0) 70%)' }}></div>
              
              {/* Icon */}
              <div className="relative z-10 mb-5">
                 <div className="w-12 h-12 bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 rounded-lg flex items-center justify-center border border-emerald-500/30 shadow-inner shadow-emerald-950/50 group-hover:from-emerald-500/30 group-hover:to-emerald-700/30 group-hover:border-emerald-500/50 transition-all duration-300">
                   <i className={`${feature.icon} text-emerald-300 text-2xl group-hover:text-emerald-200 transition-colors duration-300`}></i>
                 </div>
               </div>
               {/* Title */} 
               <h3 className="relative z-10 text-xl lg:text-2xl font-semibold mb-3 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">{feature.title}</h3>
               {/* Description */} 
               <p className="relative z-10 text-sm lg:text-base text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 