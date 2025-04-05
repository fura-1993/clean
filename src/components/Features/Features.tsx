import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: 'fas fa-tools',
    title: '専門機材',
    description: '業務用高性能清掃機器と専用洗剤を使用。効率的かつ高品質な清掃を実現します。'
  },
  {
    icon: 'fas fa-shield-virus',
    title: '徹底除菌',
    description: '環境と人体に安全な専用洗浄剤を使用。目に見えない菌も確実に除去し、衛生的な空間を提供します。'
  },
  {
    icon: 'fas fa-shipping-fast',
    title: '迅速対応',
    description: '平日・休日問わず受付。お客様のご要望に迅速に対応できる体制を整えています。'
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: '適正価格',
    description: '無駄を排除した効率的な作業で、高品質なサービスを適正価格でご提供します。'
  },
  {
    icon: 'fas fa-user-shield',
    title: '安心保証',
    description: '損害保険完備。作業後の品質にご満足いただけない場合は、無償で再対応いたします。'
  },
  {
    icon: 'fas fa-headset',
    title: '丁寧サポート',
    description: 'お客様ごとに担当者を配置し、ご要望に合わせた最適なプランと丁寧なサービスを提供します。'
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
      className="relative overflow-hidden py-20 md:py-32 text-white/90"
    >
      {/* ハイテク感のある背景オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-md"></div>
      
      {/* 近未来的なグリッドパターン */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='featuresGrid' patternUnits='userSpaceOnUse' width='50' height='50' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M25-1.5 V51.5 M-1.5 25 H51.5' stroke='hsla(158, 82%, 57%, 0.12)' strokeWidth='0.5'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#featuresGrid)' />
        </svg>
      </div>

      {/* ネオングロー効果 */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent shadow-[0_0_20px_theme(colors.emerald.400)]"></div>

      <div className="container relative z-10">
        {/* Section Header */} 
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-400 tracking-tight" style={{ textShadow: '0 0 20px rgba(52, 211, 153, 0.6), 0 0 40px rgba(52, 211, 153, 0.4)' }}>
            選ばれる理由
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">確かな技術と経験豊富なスタッフによる、JT Cleaning Serviceの価値あるサービス。</p>
        </motion.div>

        {/* Features Grid - 近未来的なカードデザイン */} 
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="feature-card relative overflow-hidden bg-slate-800/90 backdrop-blur-xl rounded-xl p-6 lg:p-8 border border-emerald-500/40 shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(52,211,153,0.05)] group transition-all duration-300 hover:bg-slate-800/95 hover:border-emerald-400/50 hover:shadow-[0_0_40px_rgba(0,0,0,0.6),inset_0_0_30px_rgba(52,211,153,0.1),0_0_10px_rgba(52,211,153,0.2)]"
              variants={itemVariants}
            >
              {/* ホバー時のアクセントグロー効果 */}
              <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-20 blur-lg bg-gradient-to-b from-emerald-400 via-emerald-400/50 to-emerald-400/0 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* テクノロジー感のあるアクセントライン */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* アイコンを未来的なスタイルに強化 */}
              <div className="relative z-10 mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600/30 to-emerald-800/30 rounded-lg flex items-center justify-center border border-emerald-400/40 shadow-inner shadow-emerald-950/50 group-hover:from-emerald-500/40 group-hover:to-emerald-700/40 group-hover:border-emerald-400/60 transition-all duration-500">
                  {/* アイコン周囲のリングエフェクト */}
                  <div className="absolute inset-0 rounded-lg border border-emerald-400/20 scale-[1.15] opacity-0 group-hover:opacity-70 group-hover:scale-[1.2] transition-all duration-700"></div>
                  <i className={`${feature.icon} text-emerald-300 text-2xl group-hover:text-emerald-200 transition-colors duration-300`}></i>
                </div>
              </div>
              
              {/* タイトルとテキスト */}
              <h3 className="relative z-10 text-xl lg:text-2xl font-semibold mb-3 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">{feature.title}</h3>
              <p className="relative z-10 text-sm lg:text-base text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">{feature.description}</p>
              
              {/* センサースタイルのアクセント要素 */}
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-emerald-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 