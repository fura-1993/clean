"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext'

// フォントの最適化
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

// Main layout component
function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link 
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        {/* Fixed Background */}
        <div className="fixed-background" />
        
        {/* Content Wrapper */}
        <div className="content-wrapper">
          <LanguageProvider>
            <MetadataUpdater />
            {children}
          </LanguageProvider>
        </div>
      </body>
    </html>
  )
}

// Component to handle dynamic metadata updates
function MetadataUpdater() {
  const { language, t } = useLanguage();
  
  useEffect(() => {
    // Update metadata based on current language
    document.title = t('siteTitle') || 'Professional Cleaning Service';
    
    // Update meta description
    const metaDescElement = document.querySelector('meta[name="description"]');
    if (metaDescElement) {
      metaDescElement.setAttribute('content', t('siteDescription') || '');
    } else {
      const metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = t('siteDescription') || '';
      document.head.appendChild(metaDesc);
    }
    
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language, t]);
  
  return null;
}

export default RootLayout; 