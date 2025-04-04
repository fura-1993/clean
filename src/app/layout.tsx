import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import '@/styles/globals.css'
import 'aos/dist/aos.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'プロフェッショナル清掃サービス | 高圧洗浄・タイル洗浄・絨毯清掃',
  description: '高圧洗浄、タイル洗浄、絨毯清掃のプロフェッショナルサービス。品質と信頼のクリーニングで、あなたの空間を清潔に保ちます。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={notoSansJP.className}>{children}</body>
    </html>
  )
} 