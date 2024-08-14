import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="bento-container">
      <div className="bento-grid">
        <div className="bento-item bento-item-coral">
          <h2 className="text-2xl font-bold mb-4">AI-Powered Flashcards</h2>
          <p className="mb-6">Revolutionize your learning with our cutting-edge AI technology. Create personalized flashcards effortlessly and boost your retention.</p>
        </div>
        <div className="bento-item bento-item-mint">
          <h2 className="text-2xl font-bold mb-4">Smart Study Sessions</h2>
          <p className="mb-6">Optimize your study time with adaptive learning algorithms. Our AI tailors each session to your unique learning style and progress.</p>
          <Link href="/study" className="btn btn-yellow">Start Learning</Link>
        </div>
        <div className="bento-item bento-item-sky">
          <h2 className="text-2xl font-bold mb-4">Effortless Content Creation</h2>
          <p className="mb-6">Transform any text into comprehensive flashcard sets instantly. Our AI analyzes your content and generates relevant questions and answers.</p>
          <Link href="/create" className="btn btn-blue">Try Now</Link>
        </div>
        <div className="bento-item bento-item-large">
          <h3 className="text-xl font-bold mb-4">Flashcard Creation</h3>
          <p className="mb-4">Create and customize your flashcards with ease. Add images, text, and more to make your study materials engaging and effective.</p>
          <button className="btn btn-blue">Try it now</button>
        </div>
        <div className="bento-item">
          <h3 className="text-xl font-bold mb-4">AI-Powered Learning</h3>
          <p className="mb-4">Our advanced AI algorithms analyze your performance and adapt your study sessions for maximum efficiency and retention.</p>
          <button className="btn btn-green">Learn more</button>
        </div>
        <div className="bento-item bento-item-full">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Testimonials</h3>
              <p>See what our users are saying about FlashAI.</p>
            </div>
            <button className="btn btn-blue">Read more</button>
          </div>
        </div>
        <div className="bento-item bento-item-large">
          <h3 className="text-xl font-bold mb-4">Pricing Plans</h3>
          <p className="mb-4">Choose the perfect plan for your learning journey.</p>
          <button className="btn btn-blue">View plans</button>
        </div>
        <div className="bento-item">
          <h3 className="text-xl font-bold mb-4">Get Started</h3>
          <p className="mb-4">Begin your AI-powered learning experience today.</p>
          <button className="btn btn-green">Sign up now</button>
        </div>
      </div>
    </div>
  );
}