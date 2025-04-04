import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: 'fas fa-certificate',
    title: 'プロの技術',
    description: '熟練スタッフによる高品質な清掃サービスをご提供。徹底した研修で技術力を維持しています。'
  },
  {
    icon: 'fas fa-leaf',
    title: '環境に優しい',
    description: '環境に配慮した洗剤を使用し、水の使用量も最小限に抑えた持続可能な清掃を実施しています。'
  },
  {
    icon: 'fas fa-clock',
    title: '迅速な対応',
    description: 'お問い合わせから24時間以内にご連絡。緊急の場合は当日対応も可能です。'
  },
  {
    icon: 'fas fa-yen-sign',
    title: '明確な料金',
    description: '追加料金なしの明確な料金体系。事前に詳細なお見積りをご提示します。'
  },
  {
    icon: 'fas fa-shield-alt',
    title: '安心の保証',
    description: '万が一の際の保険完備。作業後の品質保証で、安心してご利用いただけます。'
  },
  {
    icon: 'fas fa-heart',
    title: '丁寧な対応',
    description: 'お客様一人一人のニーズに合わせた、きめ細やかなサービスを心がけています。'
  }
]

export default function Features() {
  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <motion.div
          className="section-header text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">選ばれる理由</h2>
          <p className="text-xl text-gray-600">お客様に安心と満足をお届けするための取り組み</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <i className={`${feature.icon} text-primary-600 text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 