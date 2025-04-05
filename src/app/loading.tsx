import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      {/* 最小限の背景エフェクト */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />

      {/* メインのローディングアニメーション - 最適化版 */}
      <div className="relative">
        {/* 回転する外側のリング */}
        <motion.div
          className="absolute -inset-8 rounded-full border-2 border-emerald-500/30"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* クリーニングアイコン - アニメーション最適化 */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16">
          <motion.div
            className="absolute inset-0 bg-emerald-500/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.i
            className="fas fa-spray-can-sparkles text-3xl text-white"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* 最適化されたパーティクルエフェクト - 数を削減 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/80 rounded-full"
            style={{
              rotate: `${i * 60}deg`,
              translateX: "50px",
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* ローディングテキスト - シンプル化 */}
      <div className="absolute bottom-1/4 text-center">
        <div className="text-white/90 text-lg font-medium">Loading...</div>
      </div>
    </div>
  )
} 