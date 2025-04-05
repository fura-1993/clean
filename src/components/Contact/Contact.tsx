import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    selectedService: '',
    message: '',
    files: [] as File[]
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const MAX_FILES = 5;
  const MAX_TOTAL_SIZE_MB = 20;
  const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const currentFiles = formData.files;
    
    // Check total file count
    const combinedFiles = [...currentFiles, ...newFiles];
    if (combinedFiles.length > MAX_FILES) {
      setStatus({ type: 'error', message: `添付できるファイルは${MAX_FILES}個までです。` });
      e.target.value = ''; // Clear the input
      return;
    }

    // Check total file size
    const totalSize = combinedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
        setStatus({ type: 'error', message: `添付ファイルの合計サイズは${MAX_TOTAL_SIZE_MB}MBまでです。` });
        e.target.value = ''; // Clear the input
        return;
    }

    setFormData(prevState => ({ ...prevState, files: combinedFiles }));
    // Clear the input value to allow selecting the same file again after removing it
    e.target.value = ''; 
  };

  const removeFile = (indexToRemove: number) => {
    setFormData(prevState => ({ 
      ...prevState, 
      files: prevState.files.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prevState => ({ ...prevState, selectedService: serviceId }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '送信中...' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('selectedService', formData.selectedService);
      formDataToSend.append('message', formData.message);
      formData.files.forEach((file, index) => {
        formDataToSend.append(`file`, file);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', phone: '', selectedService: '', message: '', files: [] });
      } else {
        setStatus({ type: 'error', message: result.error || '送信に失敗しました。' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({ type: 'error', message: 'ネットワークエラーが発生しました。' });
    }
  };

  return (
    <section 
      id="contact" 
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950 text-white/90"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='contactGrid' patternUnits='userSpaceOnUse' width='60' height='60' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M30-1.5 V61.5 M-1.5 30 H61.5' stroke='hsla(158, 82%, 57%, 0.03)' strokeWidth='1'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#contactGrid)' className="animate-bgGridMove" />
        </svg>
      </div>

      {/* Top Edge Glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_15px_theme(colors.emerald.500)]"></div>

      <div className="container relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-16 relative"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Staff Image */}
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-400/30 shadow-xl">
            <Image
              src="/images/infostaff.png"
              alt="お問い合わせ受付スタッフ"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-400 tracking-tight pt-12" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.3)' }}>
            お問い合わせ
          </h2>
          <p className="text-xl text-slate-300">サービスに関するご質問やご依頼など、お気軽にご連絡ください。</p>
          <p className="text-lg text-emerald-400/80 mt-2">24時間以内に担当者よりご連絡させていただきます。</p>
        </motion.div>

        {/* Service Selection Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceOptions.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className={`relative group p-6 rounded-xl border transition-all duration-300 ${
                formData.selectedService === service.id
                  ? 'bg-emerald-900/30 border-emerald-400'
                  : 'bg-slate-800/40 border-emerald-500/20 hover:bg-slate-800/60 hover:border-emerald-500/40'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,${
                formData.selectedService === service.id 
                  ? 'rgba(52,211,153,0.2)' 
                  : 'rgba(52,211,153,0.1)'
              }_0%,transparent_70%)]`} />
              
              {/* Selection Indicator */}
              <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                formData.selectedService === service.id
                  ? 'border-emerald-400 bg-emerald-400'
                  : 'border-emerald-500/40 group-hover:border-emerald-500/60'
              }`}>
                <div className={`absolute inset-0 rounded-full transition-transform duration-300 ${
                  formData.selectedService === service.id
                    ? 'scale-100'
                    : 'scale-0'
                }`}>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-300"
                    initial={false}
                    animate={formData.selectedService === service.id ? { scale: [0.8, 1.2, 1] } : { scale: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className={`text-4xl mb-4 transition-colors duration-300 ${
                formData.selectedService === service.id
                  ? 'text-emerald-400'
                  : 'text-emerald-500/70 group-hover:text-emerald-400/80'
              }`}>
                <i className={service.icon}></i>
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                formData.selectedService === service.id
                  ? 'text-emerald-300'
                  : 'text-emerald-400/80 group-hover:text-emerald-300'
              }`}>
                {service.title}
              </h3>
              <p className={`text-sm transition-colors duration-300 ${
                formData.selectedService === service.id
                  ? 'text-slate-300'
                  : 'text-slate-400 group-hover:text-slate-300'
              }`}>
                {service.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Form Area */}
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Input */}
              <div className="relative group">
                <label htmlFor="name" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                  <i className="fas fa-user mr-2 text-emerald-400/70"></i>お名前or法人名等 <span className="text-red-500 text-sm ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="山田 太郎 / 株式会社〇〇"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/70 transition-all duration-300"
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
                <label htmlFor="email" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                  <i className="fas fa-envelope mr-2 text-emerald-400/70"></i>メールアドレス <span className="text-red-500 text-sm ml-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/70 transition-all duration-300"
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
                <label htmlFor="phone" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                  <i className="fas fa-phone mr-2 text-emerald-400/70"></i>電話番号 <span className="text-red-500 text-sm ml-1">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="090-1234-5678"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/70 transition-all duration-300"
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
              <label htmlFor="message" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                <i className="fas fa-comment-dots mr-2 text-emerald-400/70"></i>メッセージ <span className="text-red-500 text-sm ml-1">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="具体的なご要望やご質問をご記入ください..."
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-800/70 transition-all duration-300 resize-none"
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
              <label htmlFor="file" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                <i className="fas fa-paperclip mr-2 text-emerald-400/70"></i>ファイル添付 (最大{MAX_FILES}個, 合計{MAX_TOTAL_SIZE_MB}MBまで)
              </label>
              <div className="relative">
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
                <div className="flex items-center gap-4 mb-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById('file')?.click()}
                    disabled={formData.files.length >= MAX_FILES || status.type === 'loading'}
                    className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-white hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ファイルを追加
                  </button>
                  <span className="text-sm text-slate-400">{formData.files.length} / {MAX_FILES} 個選択中</span>
                </div>
                {formData.files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-800/30 border border-slate-600/30">
                        <span className="text-slate-300 text-sm truncate max-w-xs" title={file.name}>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          disabled={status.type === 'loading'}
                          className="text-slate-400 hover:text-red-400 text-xs disabled:opacity-50"
                          aria-label={`Remove ${file.name}`}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-sm text-slate-400">
                  対応ファイル: JPEG, PNG, PDF, Excel, Word, テキスト等 (合計{MAX_TOTAL_SIZE_MB}MBまで)
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
                  className={`text-center p-4 rounded-lg text-sm font-medium border backdrop-blur-sm
                    ${status.type === 'success' ? 'bg-emerald-900/30 text-emerald-300 border-emerald-500/50' : ''}
                    ${status.type === 'error' ? 'bg-red-900/30 text-red-300 border-red-500/50' : ''}
                    ${status.type === 'loading' ? 'bg-blue-900/30 text-blue-300 border-blue-500/50' : ''}
                  `}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="text-center">
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Button Background with Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 transition-all duration-300 group-hover:opacity-90"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0.5 rounded-xl opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 animate-shimmer" />
                </div>

                {/* Particle Effects on Hover */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`particle animate-[particle-${i}_1s_ease_infinite]`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Button Content */}
                <span className="relative flex items-center">
                  {status.type === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      送信中...
                    </>
                  ) : (
                    <>
                      送信する
                      <i className="fas fa-paper-plane ml-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
} 