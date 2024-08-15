import Head from 'next/head'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import TestimonialSection from '../../components/TestimonialSection'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <HeroSection />
        <TestimonialSection />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </main>
      <Footer />
    </div>
  )
}
