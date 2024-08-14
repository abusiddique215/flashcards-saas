import Head from 'next/head'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-12 px-4">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}