import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="bento-container">
      <div className="bento-grid">
        <div className="bento-item bento-item-coral">
          <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.28 13.61C15.15 14.74 13.53 15.09 12.1 14.64L9.51001 17.22C9.33001 17.41 8.96001 17.53 8.69001 17.49L7.49001 17.33C7.09001 17.28 6.73001 16.9 6.67001 16.51L6.51001 15.31C6.47001 15.05 6.60001 14.68 6.78001 14.49L9.36001 11.91C8.92001 10.48 9.26001 8.86001 10.39 7.73001C12.01 6.11001 14.65 6.11001 16.28 7.73001C17.9 9.34001 17.9 11.98 16.28 13.61Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.45 16.28L9.59998 15.42" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.3945 10.7H13.4035" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-2xl font-bold mb-4">AI-Powered Flashcards</h2>
          <p className="mb-6">Revolutionize your learning with our cutting-edge AI technology. Create personalized flashcards effortlessly and boost your retention.</p>
        </div>
        <div className="bento-item bento-item-mint">
          <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 2V5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 9.09H20.5" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.6947 13.7H15.7037" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.6947 16.7H15.7037" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.9955 13.7H12.0045" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.9955 16.7H12.0045" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.29431 13.7H8.30329" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.29431 16.7H8.30329" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-2xl font-bold mb-4">Smart Study Sessions</h2>
          <p className="mb-6">Optimize your study time with adaptive learning algorithms. Our AI tailors each session to your unique learning style and progress.</p>
          <Link href="/study" className="btn btn-yellow">Start Learning</Link>
        </div>
        <div className="bento-item bento-item-sky">
          <svg className="w-12 h-12 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 13H13" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 17H11" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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