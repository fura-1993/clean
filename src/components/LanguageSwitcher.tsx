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
      {/* メインボタン - 目立つように強化 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-800/70 border border-emerald-500/40 text-white hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 group transition-all duration-300"
        aria-label={t('language')}
        title={language === 'ja' ? '日本語' : 'English'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: isOpen 
            ? ["0 0 10px rgba(52, 211, 153, 0.7)"] 
            : ["0 0 5px rgba(52, 211, 153, 0.3)", "0 0 12px rgba(52, 211, 153, 0.5)", "0 0 5px rgba(52, 211, 153, 0.3)"] 
        }}
        transition={{ 
          boxShadow: { 
            duration: 2, 
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut" 
          }
        }}
      >
        {/* 回転するアウターリング */}
        <motion.div 
          className="absolute inset-[-2px] rounded-full border border-emerald-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* 脈動する内側のリング */}
        <motion.div 
          className="absolute inset-[-1px] rounded-full border-2 border-emerald-400/20"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* 国旗アイコン */}
        <motion.span 
          className="text-base z-10"
          animate={{ 
            y: [0, -1, 0, 1, 0],
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {language === 'ja' ? '🇯🇵' : '🇺🇸'}
        </motion.span>
        
        {/* 強化されたホバーエフェクト */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/20 transition-colors duration-300 pointer-events-none group-hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
        
        {/* アクティブインジケーター - ドロップダウンが開いている時 */}
        {isOpen && (
          <motion.div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full" 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </motion.button>

      {/* ドロップダウンメニュー - 位置調整 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 rounded-xl shadow-lg bg-slate-800/95 border border-slate-700/50 backdrop-blur-lg overflow-hidden z-50"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code as 'ja' | 'en')}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
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