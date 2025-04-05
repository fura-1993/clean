import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// ビフォーアフターの写真セットの型定義
type BeforeAfterSet = {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  category: string;
};

// ダミーデータ - 後で実際の画像に差し替え
const portfolioItems: BeforeAfterSet[] = [
  {
    id: 1,
    title: '飲食店カーペット洗浄',
    description: '長年の汚れが蓄積したカーペットを専用洗剤と高性能機器で洗浄',
    beforeImage: '/images/絨毯清掃作業風景.png', // 既存の画像を使用
    afterImage: '/images/絨毯清掃作業風景.png', // 既存の画像を使用（実際はビフォーアフターの写真に差し替え）
    category: '絨毯清掃'
  },
  {
    id: 2,
    title: 'オフィスビル外壁洗浄',
    description: '高圧洗浄機で外壁の長年の汚れを除去し美観を回復',
    beforeImage: '/images/高圧洗浄作業風景.png', // 既存の画像を使用
    afterImage: '/images/高圧洗浄作業風景.png', // 既存の画像を使用（実際はビフォーアフターの写真に差し替え）
    category: '高圧洗浄'
  },
  {
    id: 3,
    title: '商業施設床タイル洗浄',
    description: '専門洗剤と洗浄機で頑固な汚れを除去し清潔感を回復',
    beforeImage: '/images/タイル洗浄作業風景.png', // 既存の画像を使用
    afterImage: '/images/タイル洗浄作業風景.png', // 既存の画像を使用（実際はビフォーアフターの写真に差し替え）
    category: 'タイル洗浄'
  }
];

// アニメーション用のバリアント
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function Portfolio() {
  return (
    <section 
      id="portfolio" 
      className="relative py-24 md:py-32 text-white/90 overflow-hidden"
    >
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/85 to-slate-900/90 backdrop-blur-md"></div>
      
      {/* テクノロジー感のあるグリッドパターン */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='portfolioGrid' patternUnits='userSpaceOnUse' width='50' height='50' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M25-1.5 V51.5 M-1.5 25 H51.5' stroke='hsla(158, 82%, 57%, 0.12)' strokeWidth='0.5'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#portfolioGrid)' />
        </svg>
      </div>
      
      {/* ネオングロー効果 */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent shadow-[0_0_20px_theme(colors.emerald.400)]"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent shadow-[0_0_15px_theme(colors.emerald.400)]"></div>

      <div className="container relative z-10 mx-auto px-6">
        {/* セクションヘッダー */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-400 tracking-tight" style={{ textShadow: '0 0 20px rgba(52, 211, 153, 0.6), 0 0 40px rgba(52, 211, 153, 0.4)' }}>
            実績
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            プロの技術で生まれ変わるビフォーアフター。実際の清掃事例をご紹介します。
          </p>
        </motion.div>

        {/* ビフォーアフター事例 */}
        <motion.div
          className="space-y-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {portfolioItems.map((item) => (
            <motion.div 
              key={item.id}
              className="group"
              variants={itemVariants}
            >
              {/* 事例タイトル */}
              <div className="relative mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-300 mb-3">{item.title}</h3>
                <p className="text-lg text-slate-400 max-w-3xl">{item.description}</p>
                <span className="absolute -left-4 top-0 h-full w-[2px] bg-emerald-500/30"></span>
              </div>
              
              {/* ビフォーアフター写真 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* ビフォー */}
                <div className="relative rounded-xl overflow-hidden bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 aspect-[4/3] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-emerald-500/10 z-10 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 z-20 m-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700/50 text-white/90 text-sm font-medium">
                    Before
                  </div>
                  <Image
                    src={item.beforeImage}
                    alt={`${item.title} ビフォー`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                </div>
                
                {/* アフター */}
                <div className="relative rounded-xl overflow-hidden bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 aspect-[4/3] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-emerald-500/20 z-10 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 z-20 m-4 bg-emerald-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-emerald-600/50 text-emerald-300 text-sm font-medium">
                    After
                  </div>
                  <Image
                    src={item.afterImage}
                    alt={`${item.title} アフター`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/30 to-transparent"></div>
                </div>
                
                {/* 技術エフェクト（矢印） */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block z-20">
                  <div className="relative w-16 h-16 bg-slate-800/90 backdrop-blur-xl rounded-full border border-emerald-500/40 shadow-[0_0_30px_rgba(0,0,0,0.7)] flex items-center justify-center">
                    <i className="fas fa-arrow-right text-emerald-400 text-2xl"></i>
                    <div className="absolute inset-0 rounded-full border border-emerald-400/20 scale-[1.15] opacity-70 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* カテゴリタグ */}
              <div className="mt-6 flex justify-end">
                <span className="inline-block bg-emerald-900/50 backdrop-blur-sm text-emerald-300 px-3 py-1 rounded-md border border-emerald-700/50 text-sm">
                  {item.category}
                </span>
              </div>
              
              {/* セパレーター */}
              <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 