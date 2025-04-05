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
  // Font Awesome の最適化読み込み
  other: {
    'link:css': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  },
}

// レイアウトの最適化
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 