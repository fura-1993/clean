'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import Rellax from 'rellax'
import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Services from '@/components/Services/Services'
import Features from '@/components/Features/Features'
import Testimonials from '@/components/Testimonials/TestimonialSlider'
import FAQ from '@/components/FAQ/FAQAccordion'
import Contact from '@/components/Contact/ContactForm'

export default function Home() {
  useEffect(() => {
    // AOSの初期化
    AOS.init({
      duration: 1000,
      once: true,
    })

    // Rellaxの初期化
    if (typeof window !== 'undefined') {
      new Rellax('.rellax', {
        speed: 7,
        center: true,
      })
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  )
} 