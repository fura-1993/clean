"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 言語切り替え
  const toggleLanguage = (newLanguage: 'ja' | 'en') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  // 言語ごとのラベル
  const languages = [
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* メインボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 text-white hover:bg-slate-700/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 group transition-all duration-300"
        aria-label={t('language')}
      >
        <span className="text-base">
          {language === 'ja' ? '🇯🇵' : '🇺🇸'}
        </span>
        <span className="text-sm font-medium">
          {language === 'ja' ? '日本語' : 'English'}
        </span>
        <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
        
        {/* ホバーエフェクト */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600/0 via-emerald-600/30 to-emerald-600/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none"></div>
      </button>

      {/* ドロップダウンメニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-slate-800/95 border border-slate-700/50 backdrop-blur-lg overflow-hidden z-50"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code as 'ja' | 'en')}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition-colors duration-200 ${
                    language === lang.code
                      ? 'bg-emerald-900/50 text-emerald-300'
                      : 'text-white hover:bg-slate-700/70'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                  
                  {/* 現在の選択を示すチェック */}
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto bg-emerald-500/80 text-white w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <i className="fas fa-check text-[10px]"></i>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
            
            {/* 装飾エフェクト */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher; 