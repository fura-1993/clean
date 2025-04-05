import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      {/* サイバーパンク風の背景エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-emerald-500/30"
            style={{ top: `${(i + 1) * 33}%` }}
            animate={{
              x: [-1000, 1000],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* メインのローディングアニメーション */}
      <div className="relative">
        {/* 回転する外側のリング */}
        <motion.div
          className="absolute -inset-8 rounded-full border-2 border-emerald-500/30"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* クリーニングアイコンのアニメーション */}
        <div className="relative z-10 flex items-center justify-center w-16 h-16">
          <motion.div
            className="absolute inset-0 bg-emerald-500/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.i
            className="fas fa-spray-can-sparkles text-3xl text-white"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* パーティクルエフェクト */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/80 rounded-full"
            style={{
              rotate: `${i * 30}deg`,
              translateX: "50px",
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* 水滴エフェクト */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`droplet-${i}`}
            className="absolute w-1 h-2 bg-blue-400/50 rounded-full"
            style={{
              rotate: `${i * 45}deg`,
              translateX: "40px",
            }}
            animate={{
              translateY: [0, 20],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeIn"
            }}
          />
        ))}
      </div>

      {/* ローディングテキスト */}
      <motion.div
        className="absolute bottom-1/4 text-center"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-white/90 text-lg font-medium mb-2">Loading...</div>
        <div className="text-emerald-400/80 text-sm">Preparing your clean space</div>
      </motion.div>

      {/* ホログラム風エフェクト */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`hologram-${i}`}
          className="absolute w-0.5 h-0.5 bg-white/80"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
} 