import './globals.css'
import { Inter } from 'next/font/google'

// フォントの最適化
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata = {
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
        {/* Font Awesome の最適化読み込み */}
        <link 
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 