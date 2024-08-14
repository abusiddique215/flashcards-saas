import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="grid grid-cols-3 gap-6 mb-12">
      <div className="bg-coral p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-white mb-4">AI-Powered Flashcards</h2>
        <p className="text-white mb-6">Revolutionize your learning with our cutting-edge AI technology. Create personalized flashcards effortlessly and boost your retention.</p>
      </div>
      <div className="bg-mint p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Smart Study Sessions</h2>
        <p className="text-white mb-6">Optimize your study time with adaptive learning algorithms. Our AI tailors each session to your unique learning style and progress.</p>
        <Link href="/study" className="bg-yellow-300 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-400">
          Start Learning
        </Link>
      </div>
      <div className="bg-sky p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Effortless Content Creation</h2>
        <p className="text-gray-600 mb-6">Transform any text into comprehensive flashcard sets instantly. Our AI analyzes your content and generates relevant questions and answers.</p>
        <Link href="/create" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
          Try Now
        </Link>
      </div>
    </section>
  )
}