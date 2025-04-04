import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            {/* ロゴ */}
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-8">
                <Image
                  src="/images/logo.png"
                  alt="EMEAO!"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center ml-4">
                <div className="bg-yellow-400 rounded-full p-2">
                  <span className="text-blue-900 font-bold">12</span>
                </div>
                <div className="ml-2">
                  <div className="text-sm">累計相談件数</div>
                  <div className="font-bold text-xl">10万件突破！</div>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {/* 電話番号 */}
            <div className="text-right">
              <div className="text-sm">電話受付時間 9：00〜18：00（土日祝除く）</div>
              <a href="tel:0120-130-357" className="text-3xl font-bold text-blue-900">
                0120-130-357
              </a>
            </div>

            {/* お問い合わせボタン */}
            <Link
              href="#contact"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center"
            >
              <span>
                <div className="text-sm">完全無料</div>
                <div>ご相談はこちら</div>
              </span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 