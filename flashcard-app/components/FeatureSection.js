import React from 'react';
import Image from 'next/image';

export default function FeatureSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Flashcard Creation</h3>
          <p className="mb-4">Create and customize your flashcards with ease. Add images, text, and more to make your study materials engaging and effective.</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
            Try it now
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">AI-Powered Learning</h3>
          <p className="mb-4">Our advanced AI algorithms analyze your performance and adapt your study sessions for maximum efficiency and retention.</p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
            Learn more
          </button>
        </div>
      </div>
    </section>
  )
}