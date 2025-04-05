import React, { useState } from 'react'
import { motion } from 'framer-motion'

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '送信中...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
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
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <pattern id='contactGrid' patternUnits='userSpaceOnUse' width='60' height='60' patternTransform='scale(1) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
              <path d='M30-1.5 V61.5 M-1.5 30 H61.5' stroke='hsla(158, 82%, 57%, 0.03)' strokeWidth='1'/>
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#contactGrid)' style={{ animation: 'bgGridMove 30s linear infinite'}} />
        </svg>
         <style jsx global>{`
          @keyframes bgGridMove {
            0% { background-position: 0% 0%; }
            100% { background-position: -120px 120px; }
          }
          rect[fill='url(#contactGrid)'] {
            animation: bgGridMove 30s linear infinite;
          }
        `}</style>
      </div>
       {/* Top Edge Glow */}
       <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_15px_theme(colors.emerald.500)]"></div>


      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-emerald-400 tracking-tight" style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.3)' }}>
            お問い合わせ
          </h2>
          <p className="text-xl text-slate-300">サービスに関するご質問やご依頼など、お気軽にご連絡ください。</p>
        </motion.div>

        {/* Form Area with Border and Background */}
        <motion.div 
          className="max-w-3xl mx-auto p-8 md:p-12 bg-slate-800/60 backdrop-blur-md rounded-xl border border-emerald-500/30 shadow-2xl shadow-emerald-900/30"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                   <i className="fas fa-user mr-2 text-emerald-400/70"></i>お名前 <span className="text-red-500 text-sm ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="山田 太郎"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-700/70 transition-all duration-300 shadow-inner"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status.type === 'loading'}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                   <i className="fas fa-envelope mr-2 text-emerald-400/70"></i>メールアドレス <span className="text-red-500 text-sm ml-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-700/70 transition-all duration-300 shadow-inner"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status.type === 'loading'}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label htmlFor="subject" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                 <i className="fas fa-pen-nib mr-2 text-emerald-400/70"></i>件名 <span className="text-red-500 text-sm ml-1">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="例: 定期清掃サービスについて"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-700/70 transition-all duration-300 shadow-inner"
                required
                value={formData.subject}
                onChange={handleChange}
                disabled={status.type === 'loading'}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="flex items-center text-lg font-medium text-slate-300 mb-2">
                 <i className="fas fa-comment-dots mr-2 text-emerald-400/70"></i>メッセージ <span className="text-red-500 text-sm ml-1">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="具体的なご要望やご質問をご記入ください..."
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 focus:bg-slate-700/70 transition-all duration-300 resize-none shadow-inner"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={status.type === 'loading'}
              ></textarea>
            </motion.div>

            {/* Status Message Area */}
            {status.type !== 'idle' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-3 rounded-md text-sm font-medium 
                  ${status.type === 'success' ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-700' : ''}
                  ${status.type === 'error' ? 'bg-red-900/70 text-red-300 border border-red-700' : ''}
                  ${status.type === 'loading' ? 'bg-blue-900/70 text-blue-300 border border-blue-700' : ''}
                `}
              >
                {status.message}
              </motion.div>
            )}

            <motion.div className="text-center pt-4" variants={itemVariants}>
              <button
                type="submit"
                className={`relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 rounded-lg overflow-hidden group focus:outline-none focus:ring-4 focus:ring-emerald-500/50 shadow-lg shadow-emerald-700/40 hover:shadow-xl hover:shadow-emerald-600/60 transition-all duration-300 ease-in-out ${status.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={status.type === 'loading'}
              >
                 {/* Background Shine Effect */}
                 <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600/0 via-emerald-400/40 to-emerald-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out opacity-50 group-hover:opacity-100"></span>
                 {/* Button Text and Icon */}
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
                        <i className="fas fa-paper-plane ml-3 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                      </>
                    )}
                 </span>
                 {/* Subtle pulse animation */}
                 <span className={`absolute inset-0 rounded-lg ring-2 ring-emerald-400/30 ring-offset-2 ring-offset-slate-900 opacity-0 group-hover:opacity-100 group-active:opacity-100 animate-pulse ${status.type === 'loading' ? 'hidden' : ''}`} style={{ animationDuration: '1.5s' }}></span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  )
} 