import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const services = [
  {
    icon: 'fas fa-shower',
    title: '高圧洗浄',
    shortDesc: '外壁や駐車場などの頑固な汚れを除去',
    longDesc: '外壁、駐車場、庭のテラスなど、強力な高圧洗浄機で頑固な汚れも徹底的に除去します。',
    features: ['外壁洗浄', '駐車場洗浄', 'テラス・デッキ洗浄', '雨どい清掃'],
    image: '/images/高圧洗浄作業風景.png'
  },
  {
    icon: 'fas fa-border-all',
    title: 'タイル洗浄',
    shortDesc: '床・壁タイルの美観を復元、目地も綺麗に',
    longDesc: '専用の洗剤と機材を使用し、タイルの美観を復元。目地の汚れもしっかり除去します。',
    features: ['床タイル洗浄', '浴室タイル洗浄', 'キッチンタイル洗浄', '目地洗浄・補修'],
    image: '/images/タイル洗浄作業風景.png'
  },
  {
    icon: 'fas fa-couch',
    title: '絨毯清掃',
    shortDesc: 'カーペットのホコリ・汚れ・シミを除去',
    longDesc: '最新の洗浄機でカーペットの奥に溜まったホコリや汚れを取り除き、清潔で快適な空間に。',
    features: ['オフィスカーペット清掃', 'ホテル・旅館カーペット清掃', '住宅カーペット清掃', 'シミ・匂い除去'],
    image: '/images/絨毯清掃作業風景.png'
  }
]

export default function Services() {
  return (
    <section id="services" className="section bg-gray-50">
      <div className="container">
        <motion.div
          className="section-header text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">提供サービス</h2>
          <p className="text-xl text-gray-600">様々な場所に対応した清掃サービスをご提供します</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title}の様子`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className={`${service.icon} text-primary-600 text-2xl mr-3`}></i>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 mb-4">{service.longDesc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <i className="fas fa-check text-primary-600 mr-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href="#contact"
                    className="mt-6 inline-block w-full text-center bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    お問い合わせ
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 