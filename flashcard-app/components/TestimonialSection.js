import React from 'react';

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="FlashAI has revolutionized my study routine. The AI-generated flashcards are spot-on and save me hours of preparation time."
            author="Sarah K., Medical Student"
          />
          <TestimonialCard
            quote="As a language learner, I love how FlashAI adapts to my progress. It's like having a personal tutor in my pocket!"
            author="Michael L., Polyglot"
          />
          <TestimonialCard
            quote="The progress tracking feature keeps me motivated. I can see my improvement over time, which is incredibly rewarding."
            author="Emily R., High School Teacher"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <p className="text-gray-800 font-semibold">- {author}</p>
    </div>
  );
}
