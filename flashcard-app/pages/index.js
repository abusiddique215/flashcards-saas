import Head from 'next/head'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeatureSection from '../components/FeatureSection'
import TestimonialSection from '../components/TestimonialSection'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-sky">
      <Head>
        <title>Flashcard App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <PricingSection />
      </main>

      <Footer />
    </div>
  )
}