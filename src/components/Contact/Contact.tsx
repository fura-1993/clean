import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '../../contexts/LanguageContext'

// Define variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  },
};

// Service options with their respective icons and descriptions
const serviceOptions = [
  {
    id: 'high-pressure',
    title: '高圧洗浄',
    icon: 'fas fa-water',
    description: '外壁・床面の頑固な汚れを強力除去',
  },
  {
    id: 'tile-cleaning',
    title: 'タイル洗浄',
    icon: 'fas fa-brush',
    description: 'タイルの美観回復と防汚コーティング',
  },
  {
    id: 'carpet-cleaning',
    title: 'カーペット清掃',
    icon: 'fas fa-spray-can-sparkles',
    description: '繊維の奥から汚れを除去、消臭・除菌も',
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    selectedService: '',
    message: '',
    files: [] as File[]
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Web Worker for file processing
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    // Initialize Web Worker for file processing
    if (typeof window !== 'undefined' && window.Worker) {
      const workerCode = `
        self.onmessage = function(e) {
          const { files, maxTotalSize } = e.data;
          
          // Calculate total size
          const totalSize = files.reduce((sum, file) => sum + file.size, 0);
          const isValid = totalSize <= maxTotalSize;
          
          // Post result back to main thread
          self.postMessage({ 
            totalSize, 
            isValid,
            formattedSize: (totalSize / (1024 * 1024)).toFixed(2) + ' MB' 
          });
        };
      `;
      
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerInstance = new Worker(URL.createObjectURL(blob));
      setWorker(workerInstance);
      
      return () => {
        workerInstance.terminate();
      };
    }
  }, []);

  const MAX_FILES = 5;
  const MAX_TOTAL_SIZE_MB = 20;
  const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const currentFiles = formData.files;
    
    // Check total file count
    const combinedFiles = [...currentFiles, ...newFiles];
    if (combinedFiles.length > MAX_FILES) {
      setStatus({ type: 'error', message: t('fileCountError').replace('{MAX_FILES}', MAX_FILES.toString()) });
      if (e.target) {
        (e.target as HTMLInputElement).value = '';
      }
      return;
    }

    // Use Web Worker to check file size if available
    if (worker) {
      worker.onmessage = (event) => {
        const { isValid, formattedSize } = event.data;
        
        if (!isValid) {
          setStatus({ 
            type: 'error', 
            message: t('fileSizeError')
              .replace('{MAX_TOTAL_SIZE_MB}', MAX_TOTAL_SIZE_MB.toString())
              .replace('{currentSize}', formattedSize) 
          });
          if (e.target) {
            (e.target as HTMLInputElement).value = '';
          }
        } else {
          setFormData(prevState => ({ ...prevState, files: combinedFiles }));
          if (e.target) {
            (e.target as HTMLInputElement).value = '';
          }
        }
      };
      
      worker.postMessage({ 
        files: combinedFiles,
        maxTotalSize: MAX_TOTAL_SIZE_BYTES
      });
    } else {
      // Fallback without worker
      const totalSize = combinedFiles.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > MAX_TOTAL_SIZE_BYTES) {
        setStatus({ type: 'error', message: `添付ファイルの合計サイズは${MAX_TOTAL_SIZE_MB}MBまでです。` });
        // Use optional chaining to avoid null reference and type assertion for .value property
        if (e.target) {
          (e.target as HTMLInputElement).value = '';
        }
        return;
      }

      setFormData(prevState => ({ ...prevState, files: combinedFiles }));
      // Clear the input value to allow selecting the same file again after removing it
      if (e.target) {
        (e.target as HTMLInputElement).value = '';
      }
    }
  }, [formData.files, worker, MAX_FILES, MAX_TOTAL_SIZE_MB, MAX_TOTAL_SIZE_BYTES, t]);

  const removeFile = useCallback((indexToRemove: number) => {
    setFormData(prevState => ({ 
      ...prevState, 
      files: prevState.files.filter((_, index) => index !== indexToRemove)
    }));
  }, []);

  const handleServiceSelect = useCallback((serviceId: string) => {
    setFormData(prevState => ({ ...prevState, selectedService: serviceId }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: t('sending') });

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new AbortController
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('selectedService', formData.selectedService);
      formDataToSend.append('message', formData.message);
      
      // Add files with Promise.all for parallel processing
      await Promise.all(formData.files.map(async (file, index) => {
        formDataToSend.append(`file`, file);
      }));

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
        signal
      });

      if (!signal.aborted) {
        const result = await response.json();

        if (response.ok) {
          setStatus({ type: 'success', message: t('success') });
          setFormData({ name: '', email: '', phone: '', selectedService: '', message: '', files: [] });
        } else {
          setStatus({ type: 'error', message: result.error || t('error') });
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      
      console.error('Form submission error:', error);
      setStatus({ type: 'error', message: t('networkError') });
    }
  }, [formData, t]);

  // Cleanup effect for aborting requests
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="relative overflow-hidden py-20 md:py-32 text-white/90"
    >
      {/* 先進的なオーバーレイ背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-lg"></div>
      
      {/* 強化されたアニメーショングリッド */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='contactGrid' patternUnits='userSpaceOnUse' width='60' height='60' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M30-1.5 V61.5 M-1.5 30 H61.5' stroke='hsla(158, 82%, 57%, 0.12)' strokeWidth='1'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#contactGrid)' className="animate-bgGridMove" />
        </svg>
      </div>

      {/* 輝くエッジ効果 */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent shadow-[0_0_20px_theme(colors.emerald.500)]"></div>

      <div className="container relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-16 relative"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* スタッフ画像を未来的なスタイルに */}
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-400/50 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            {/* テクノグロー効果 */}
            <div className="absolute -inset-1 rounded-full bg-emerald-400/20 blur-md animate-pulse"></div>
            <Image
              src="/images/infostaff.png"
              alt="お問い合わせ受付スタッフ"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
            {/* スキャンライン効果 */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
              <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <pattern id="scanline" width="5" height="5" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="5" y2="0" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#scanline)" />
              </svg>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-400 tracking-tight pt-12" style={{ textShadow: '0 0 20px rgba(52, 211, 153, 0.6), 0 0 40px rgba(52, 211, 153, 0.4)' }}>
            {t('contact')}
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto">{t('contactDescription')}</p>
          <p className="text-lg text-emerald-300 mt-2 font-medium">{t('contactResponse')}</p>
        </motion.div>

        {/* Service Selection Cards - 近未来的なデザインにアップグレード */}
        <motion.div 
          className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceOptions.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className={`relative p-4 sm:p-6 rounded-lg border transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 w-full h-full flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] group ${
                formData.selectedService === service.id
                  ? 'bg-emerald-900/80 border-emerald-400/80 text-white'
                  : 'bg-slate-800/90 border-slate-700/80 text-white hover:bg-slate-700/80 hover:border-emerald-500/50'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 選択状態エフェクト */}
              <AnimatePresence>
                {formData.selectedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
                  >
                    {/* パルスエフェクト */}
                    <div className="absolute inset-0 opacity-20 bg-emerald-500/20 animate-pulse"></div>
                    {/* エッジグロー */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent shadow-[0_0_10px_theme(colors.emerald.400)]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent shadow-[0_0_10px_theme(colors.emerald.400)]"></div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* チェックマークの強化 */}
              <AnimatePresence>
                {formData.selectedService === service.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_10px_theme(colors.emerald.500)]"
                  >
                    <i className="fas fa-check text-white text-xs"></i>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* アイコン */}
              <div className="relative">
                <motion.div
                  animate={formData.selectedService === service.id ? 
                    { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] } : 
                    { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 2, repeat: formData.selectedService === service.id ? Infinity : 0 }}
                  className="mb-3"
                >
                  <i className={`${service.icon} text-3xl ${formData.selectedService === service.id ? 'text-emerald-300' : 'text-emerald-400 group-hover:text-emerald-300'} transition-colors duration-300`}></i>
                </motion.div>
                {/* アイコン下の輝き効果 */}
                {formData.selectedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-emerald-400/30 blur-md rounded-full"
                  />
                )}
              </div>
              
              {/* タイトル */}
              <h3 className={`text-md sm:text-lg font-semibold mb-1 ${formData.selectedService === service.id ? 'text-white' : 'text-white group-hover:text-white'} transition-all duration-300`}>
                {service.title}
              </h3>
              {/* 説明 */}
              <p className={`text-xs sm:text-sm ${formData.selectedService === service.id ? 'text-emerald-100' : 'text-slate-300 group-hover:text-white/90'} transition-colors duration-300`}>
                {service.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Form Area - ハイテク感のあるフォームスタイル */}
        <motion.div 
          className="max-w-3xl mx-auto bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-[0_10px_50px_rgba(0,0,0,0.3)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Input */}
              <div className="relative group">
                <label htmlFor="name" className="flex items-center text-base font-medium text-white mb-2">
                  <i className="fas fa-user mr-2 text-emerald-400"></i>{t('name')} <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t('name')}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-600/80 text-white placeholder-slate-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/90 transition-all duration-300 shadow-inner shadow-black/20"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status.type === 'loading'}
                />
                {/* Input Focus Glow - Added pointer-events-none */}
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 group-focus-within:opacity-100 blur transition-all duration-300 group-hover:opacity-50 pointer-events-none"></div>
              </div>

              {/* Email Input */}
              <div className="relative group">
                <label htmlFor="email" className="flex items-center text-base font-medium text-white mb-2">
                  <i className="fas fa-envelope mr-2 text-emerald-400"></i>{t('email')} <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-600/80 text-white placeholder-slate-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/90 transition-all duration-300 shadow-inner shadow-black/20"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status.type === 'loading'}
                />
                {/* Input Focus Glow - Added pointer-events-none */}
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 group-focus-within:opacity-100 blur transition-all duration-300 group-hover:opacity-50 pointer-events-none"></div>
              </div>

              {/* Phone Input */}
              <div className="relative group">
                <label htmlFor="phone" className="flex items-center text-base font-medium text-white mb-2">
                  <i className="fas fa-phone mr-2 text-emerald-400"></i>{t('phone')} <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="090-1234-5678"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-600/80 text-white placeholder-slate-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/90 transition-all duration-300 shadow-inner shadow-black/20"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status.type === 'loading'}
                />
                {/* Input Focus Glow - Added pointer-events-none */}
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 group-focus-within:opacity-100 blur transition-all duration-300 group-hover:opacity-50 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Message Input */}
            <motion.div variants={itemVariants} className="relative group">
              <label htmlFor="message" className="flex items-center text-base font-medium text-white mb-2">
                <i className="fas fa-comment-dots mr-2 text-emerald-400"></i>{t('message')} <span className="text-red-400 ml-1">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder={t('message')}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-600/80 text-white placeholder-slate-300/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/90 transition-all duration-300 resize-none shadow-inner shadow-black/20"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status.type === 'loading'}
              ></textarea>
              {/* Textarea Focus Glow - Added pointer-events-none */}
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 group-focus-within:opacity-100 blur transition-all duration-300 group-hover:opacity-50 pointer-events-none"></div>
            </motion.div>

            {/* File Upload */}
            <motion.div variants={itemVariants} className="relative group">
              <label htmlFor="file" className="flex items-center text-base font-medium text-white mb-2">
                <i className="fas fa-paperclip mr-2 text-emerald-400"></i>{t('fileAttachment')} <span className="text-xs text-emerald-300 ml-2">
                  {t('maxFiles').replace('{MAX_FILES}', MAX_FILES.toString()).replace('{MAX_TOTAL_SIZE_MB}', MAX_TOTAL_SIZE_MB.toString())}
                </span>
              </label>
              <div className="relative p-4 rounded-lg bg-slate-800/60 border border-slate-600/40">
                <input
                  type="file"
                  id="file"
                  name="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx,.doc,.docx,.txt"
                  className="hidden"
                  disabled={status.type === 'loading' || formData.files.length >= MAX_FILES}
                />
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById('file')?.click()}
                    disabled={formData.files.length >= MAX_FILES || status.type === 'loading'}
                    className="px-4 py-2 rounded-lg bg-emerald-700/80 border border-emerald-600/70 text-white hover:bg-emerald-600/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <i className="fas fa-plus-circle"></i>
                    {t('addFile')}
                  </button>
                  <span className="inline-flex items-center justify-center px-3 py-1 text-sm bg-slate-700/80 rounded-full text-white border border-slate-600/50">
                    {t('selectedFiles').replace('{count}', formData.files.length.toString()).replace('{max}', MAX_FILES.toString())}
                  </span>
                </div>
                {formData.files.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between gap-3 px-4 py-2 rounded-lg bg-slate-700/60 border border-slate-600/50 hover:bg-slate-700/80 transition-colors duration-200">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <i className="fas fa-file-alt text-emerald-400/90"></i>
                          <span className="text-white text-sm truncate max-w-[200px]" title={file.name}>{file.name}</span>
                          <span className="text-xs text-emerald-200/80 whitespace-nowrap">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          disabled={status.type === 'loading'}
                          className="text-slate-400 hover:text-red-400 disabled:opacity-50 p-1 rounded-full hover:bg-slate-600/50 transition-colors"
                          aria-label={`Remove ${file.name}`}
                        >
                          <i className="fas fa-times-circle"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-3 text-sm text-emerald-200/90 flex items-center">
                  <i className="fas fa-info-circle mr-2"></i>
                  {t('supportedFiles')}
                </p>
              </div>
            </motion.div>

            {/* Status Message */}
            <AnimatePresence mode="wait">
              {status.type !== 'idle' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-center p-4 rounded-lg text-base font-medium border backdrop-blur-sm
                    ${status.type === 'success' ? 'bg-emerald-900/60 text-emerald-200 border-emerald-500/50' : ''}
                    ${status.type === 'error' ? 'bg-red-900/60 text-red-200 border-red-500/50' : ''}
                    ${status.type === 'loading' ? 'bg-blue-900/60 text-blue-200 border-blue-500/50' : ''}
                  `}
                >
                  <div className="flex items-center justify-center gap-2">
                    {status.type === 'success' && <i className="fas fa-check-circle text-xl"></i>}
                    {status.type === 'error' && <i className="fas fa-exclamation-circle text-xl"></i>}
                    {status.type === 'loading' && (
                      <svg className="animate-spin h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {status.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="text-center pt-4">
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_5px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Button Background with Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 transition-all duration-300 group-hover:opacity-90"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0.5 rounded-xl opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 animate-shimmer"></div>
                </div>

                {/* Particle Effects on Hover */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Button Content */}
                <span className="relative flex items-center">
                  {status.type === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('sending')}
                    </>
                  ) : (
                    <>
                      {t('submit')}
                      <i className="fas fa-paper-plane ml-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* カスタムスクロールバー用のスタイル */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.7);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(52, 211, 153, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(52, 211, 153, 0.7);
        }
      `}</style>
    </section>
  )
} 