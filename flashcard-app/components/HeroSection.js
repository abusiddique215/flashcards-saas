import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="bento-container">
      <div className="bento-grid">
        <div className="bento-item bento-item-coral">
          <h2 className="text-2xl font-bold mb-2">AI-Powered Flashcard Creation</h2>
          <p className="text-sm">Revolutionize your study routine with our AI-powered flashcard generator. Create effective study materials in seconds, tailored to your learning needs.</p>
        </div>
        <div className="bento-item bento-item-mint">
          <h3 className="text-lg font-bold mb-2">Smart Study Sessions</h3>
          <p className="font-semibold">"Optimize Your Learning"</p>
          <p className="text-sm mb-4">Our AI analyzes your performance and adapts your study sessions for maximum efficiency. Experience personalized learning that evolves with your progress.</p>
          <button className="btn btn-yellow">Start Learning</button>
        </div>
        <div className="bento-item bento-item-sky">
          <h2 className="text-xl font-bold mb-2">Effortless Flashcard Management</h2>
          <p className="text-sm mb-4">Organize, edit, and review your flashcards with ease. Our intuitive interface makes managing your study materials a breeze, letting you focus on what matters most - learning.</p>
          <button className="btn btn-blue">Explore Features</button>
        </div>
        <div className="bento-item bento-item-large bento-item-light">
          <div className="flex items-center">
            <div className="mr-6 flex-shrink-0">
              <h3 className="text-lg font-bold mb-2">Boost Your Study Efficiency</h3>
              <Image src="/flashcard-icon.svg" alt="Flashcard Illustration" width={200} height={200} className="my-4" />
              <button className="btn btn-blue">Create Flashcards</button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-sm mb-4">Gain valuable insights into your learning patterns and progress. Our AI provides personalized recommendations to help you study smarter, not harder.</p>
              <button className="btn btn-outline">View Demo</button>
            </div>
          </div>
        </div>
        <div className="bento-item bento-item-light">
          <h3 className="text-lg font-bold mb-2">Collaborative Learning</h3>
          <Image src="/study-icon.svg" alt="Study Icon" width={120} height={120} className="my-4 mx-auto" />
          <p className="text-sm mb-4">Share your flashcard sets with friends or study groups. Collaborate on creating and refining study materials, making learning a social and engaging experience.</p>
          <button className="btn btn-coral">Join Community</button>
        </div>
        <div className="bento-item bento-item-light">
          <h3 className="text-lg font-bold mb-2">Mobile Learning</h3>
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <p className="text-sm mb-4">Take your flashcards anywhere with our mobile app. Study on-the-go, sync your progress across devices, and make the most of your spare moments for effective learning.</p>
              <button className="btn btn-outline">Download App</button>
            </div>
            <div className="w-1/2 flex justify-center">
              <Image src="/study-illustration.svg" alt="Mobile Study Illustration" width={150} height={150} className="my-4" />
            </div>
          </div>
        </div>
        <div className="bento-item bento-item-large bento-item-light">
          <div className="flex items-center">
            <div className="mr-6 flex-shrink-0">
              <Image src="/avatar.svg" alt="User Avatar" width={64} height={64} className="rounded-full mb-2" />
              <p className="text-sm font-semibold">Sarah</p>
              <p className="text-xs">Medical Student</p>
              <p className="text-xs">Created 1711 Flashcards</p>
            </div>
            <div>
              <p className="text-sm">"FlashAI has transformed my study routine. The AI-generated flashcards save me hours of preparation time, and the adaptive learning system helps me focus on areas where I need improvement. It's like having a personal tutor!"</p>
              <button className="btn btn-blue">Read 314 reviews</button>
            </div>
          </div>
        </div>
        <div className="bento-item bento-item-mint">
          <h3 className="text-lg font-bold mb-2">Spaced Repetition for Long-Term Retention</h3>
          <p className="text-sm mb-4">Our AI implements proven spaced repetition techniques to optimize your memory retention. Study smarter and remember information for longer periods with our scientifically-backed approach.</p>
          <button className="btn btn-dark">Learn More</button>
        </div>
        <div className="bento-item bento-item-mint">
          <h3 className="text-lg font-bold mb-2">Customizable Flashcards</h3>
          <p className="text-sm mb-4">Tailor your flashcards to your unique learning style. Add images, audio, and rich text to create engaging and memorable study materials. Our AI can even suggest relevant media to enhance your learning experience.</p>
          <button className="btn btn-dark">Customize Now</button>
        </div>
        <div className="bento-item bento-item-coral">
          <h3 className="text-lg font-bold mb-2">Progress Tracking</h3>
          <p className="text-sm mb-1">Monitor your learning journey with detailed analytics.</p>
          <p className="text-sm mb-1">Track your performance over time, identify areas for improvement, and celebrate your achievements as you progress through your studies.</p>
          <p className="text-sm mb-1">Set goals, earn badges, and stay motivated on your path to mastery with our comprehensive progress tracking system.</p>
        </div>
      </div>
      
    </div>
  );
}