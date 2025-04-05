import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

// フォントの最適化
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: 'Professional Cleaning Service',
  description: '最新の技術と熟練の技で、あらゆる空間を清潔で快適な環境に',
}

// レイアウトの最適化
export default function RootLayout({
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
          {children}
        </div>
      </body>
    </html>
  )
} 