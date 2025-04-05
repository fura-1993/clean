"use client";

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage();
  
  const navigation = {
    company: [
      { name: t('services'), href: '#services' },
      { name: t('features'), href: '#features' },
      { name: t('portfolio'), href: '#portfolio' },
      { name: t('contact'), href: '#contact' }
    ],
    social: [
      {
        name: 'Phone',
        href: 'tel:04-7185-0805',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
          </svg>
        )
      },
    ]
  }

  return (
    <motion.footer 
      className="relative overflow-hidden bg-slate-950 text-slate-400 border-t border-emerald-500/10 pt-16 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0 }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='footerGrid' patternUnits='userSpaceOnUse' width='80' height='80' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M40-1.5 V81.5 M-1.5 40 H81.5' stroke='hsla(158, 82%, 57%, 0.02)' strokeWidth='1'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#footerGrid)' />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
               <Image 
                 src="/images/JTlogo.png"
                 alt={t('companyLogo')}
                 width={120}
                 height={36}
                 className="h-auto"
               />
            </Link>
            <p className="text-sm">
              {t('companyDescription')}
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-500 hover:text-emerald-400 transition-colors duration-300"
                  aria-label={item.name}
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-md font-semibold text-emerald-400 tracking-wider uppercase mb-4">{t('menu')}</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm hover:text-emerald-300 hover:translate-x-1 transition-all duration-300 inline-block relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
             <h3 className="text-md font-semibold text-emerald-400 tracking-wider uppercase mb-4">{t('contact')}</h3>
             <div className="space-y-3 text-sm">
                <p className="flex items-center">
                   <i className="fas fa-map-marker-alt mr-3 text-emerald-500/70 w-4 text-center"></i>
                   {t('address')}
                </p>
                <p className="flex items-center">
                   <i className="fas fa-phone-alt mr-3 text-emerald-500/70 w-4 text-center"></i>
                   <a href="tel:04-7185-0805" className="hover:text-emerald-300 transition-colors">04-7185-0805</a>
                </p>
                <p className="flex items-center">
                   <i className="fas fa-envelope mr-3 text-emerald-500/70 w-4 text-center"></i>
                   <a href="mailto:mn005@jatrack.co.jp" className="hover:text-emerald-300 transition-colors break-all">mn005@jatrack.co.jp</a>
                </p>
                <p className="flex items-start">
                   <i className="fas fa-clock mr-3 text-emerald-500/70 w-4 text-center pt-1"></i>
                   <span>{t('businessHours')}</span>
                </p>
             </div>
          </div>
          
          <div className="lg:col-span-3">
             <h3 className="text-md font-semibold text-emerald-400 tracking-wider uppercase mb-4">{t('latestInfo')}</h3>
             <p className="text-sm mb-4">{t('newsletterDescription')}</p>
             <form className="flex flex-col sm:flex-row gap-2">
               <input 
                 type="email" 
                 placeholder={t('emailAddress')} 
                 className="flex-grow px-3 py-2 rounded-md bg-slate-800/50 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
               />
               <button 
                 type="submit"
                 className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
               >
                 {t('register')}
               </button>
             </form>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-emerald-500/10 text-center text-xs">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </motion.footer>
  )
} 