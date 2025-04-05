"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ブラウザのローカルストレージから言語設定を取得または初期値を設定
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage === 'en' ? 'en' : 'ja';
  }
  return 'ja'; // デフォルト値
};

// 言語プロバイダコンポーネント
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ja');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  // 言語が変更されたときにローカルストレージを更新
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  // 初期化時に言語設定とトランスレーションを読み込む
  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    setLanguageState(initialLanguage);
    
    // 翻訳データの読み込み
    import('../locales/translations.json')
      .then(module => {
        setTranslations(module.default);
      })
      .catch(error => {
        console.error('Failed to load translations:', error);
      });
  }, []);

  // 翻訳関数
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || translations['ja'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// カスタムフック
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 