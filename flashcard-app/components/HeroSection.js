'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';


function AnimatedBentoContent({ children }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return <div ref={contentRef} className="bento-content">{children}</div>;
}

export default function HeroSection() {
  return (
    <div className="bento-container">
      <div className="bento-grid grid-cols-12 gap-4">
        <div className="bento-item bento-item-coral">
          <AnimatedBentoContent>
            <h2 className="text-2xl font-bold mb-2">AI-Powered Flashcard Creation</h2>
            <Image src="/1st.png" alt="AI Flashcard Creation" width={150} height={150} />
            <p className="text-sm">Revolutionize your study routine with our AI-powered flashcard generator. Create effective study materials in seconds, tailored to your learning needs.</p>
            
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-mint">
          <AnimatedBentoContent>
            <h3 className="text-lg font-bold mb-2">Smart Study Sessions</h3>
            <p className="font-semibold">"Optimize Your Learning"</p>
            <p className="text-sm mb-4">Our AI analyzes your performance and adapts your study sessions for maximum efficiency. Experience personalized learning that evolves with your progress.</p>
            <Image src="/study-icon.svg" alt="Smart Study Sessions" width={150} height={150} />
            <button className="btn btn-yellow">Start Learning</button>
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-sky">
          <AnimatedBentoContent>
            <h2 className="text-xl font-bold mb-2">Effortless Flashcard Management</h2>
            <p className="text-sm mb-4">Organize, edit, and review your flashcards with ease. Our intuitive interface makes managing your study materials a breeze, letting you focus on what matters most - learning.</p>
            <Image src="/flashcard-icon.svg" alt="AI Flashcard Creation" width={150} height={150} />
            <button className="btn btn-blue">Explore Features</button>
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-large bento-item-light">
          <div className="flex items-center">
            <div className="mr-6 flex-shrink-0">
              <AnimatedBentoContent>
                <h3 className="text-lg font-bold mb-2">Boost Your Study Efficiency</h3>
                <button className="btn btn-blue">Create Flashcards</button>
              </AnimatedBentoContent>
            </div>
            <div>
              <AnimatedBentoContent>
                <h3 className="text-lg font-bold mb-2">AI-Powered Insights</h3>
                <p className="text-sm mb-4">Gain valuable insights into your learning patterns and progress. Our AI provides personalized recommendations to help you study smarter, not harder.</p>
                
                <button className="btn btn-outline">View Demo</button>
                <Image src="/study-illustration.svg" alt="Study Efficiency" width={150} height={150} className="my-4" />
              </AnimatedBentoContent>
            </div>
          </div>
        </div>
        <div className="bento-item bento-item-light">
          <AnimatedBentoContent>
            <h3 className="text-lg font-bold mb-2">Collaborative Learning</h3>
            <Image src="/study-icon.svg" alt="Study Icon" width={120} height={120} className="my-4 mx-auto" />
            <p className="text-sm mb-4">Share your flashcard sets with friends or study groups. Collaborate on creating and refining study materials, making learning a social and engaging experience.</p>
            <button className="btn btn-coral">Join Community</button>
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-sky">
          <AnimatedBentoContent>
            <h3 className="text-lg font-bold mb-2">NEW BOX HERE</h3>
            <p className="text-sm mb-4">This is a new feature or highlight that you want to showcase in your FlashAI application.</p>
            
            <button className="btn btn-blue">Explore New Feature</button>
            
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-light">
          <AnimatedBentoContent>
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
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-large bento-item-light">
          <div className="flex items-center">
            <div className="mr-6 flex-shrink-0">
              <AnimatedBentoContent>
                
               
              </AnimatedBentoContent>
            </div>
            <div>
              <AnimatedBentoContent>
                <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
                <p className="text-sm">"FlashAI has transformed my study routine. The AI-generated flashcards save me hours of preparation time, and the adaptive learning system helps me focus on areas where I need improvement. It's like having a personal tutor!"</p>
                <button className="btn btn-blue">Read 314 reviews</button>
                <Image src="/avatar.svg" alt="User Avatar" width={300} height={300} className="rounded-full mb-2" /> 
              </AnimatedBentoContent>
            </div>
          </div>
        </div>
        <div className="bento-item bento-item-mint">
          <AnimatedBentoContent>
            <h3 className="text-lg font-bold mb-2">Spaced Repetition for Long-Term Retention</h3>
            <p className="text-sm mb-4">Our AI implements proven spaced repetition techniques to optimize your memory retention. Study smarter and remember information for longer periods with our scientifically-backed approach.</p>
            <Image src="/study-icon.svg" alt="Spaced Repetition" width={150} height={150} />
            <button className="btn btn-dark">Learn More</button>
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-mint">
          <AnimatedBentoContent>
            <h3 className="text-lg font-bold mb-2">Customizable Flashcards</h3>
            <p className="text-sm mb-4">Tailor your flashcards to your unique learning style. Add images, audio, and rich text to create engaging and memorable study materials. Our AI can even suggest relevant media to enhance your learning experience.</p>
            <button className="btn btn-dark">Customize Now</button>
            <Image src="/study-illustration.svg" alt="AI Study Plans" width={150} height={150} />
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-coral">
          <AnimatedBentoContent>
            <h3 className="text-lg font-bold mb-2">AI-Powered Study Plans</h3>
            <p className="text-sm mb-4">Let our AI create personalized study plans based on your learning goals and progress. Optimize your study time and achieve better results.</p>
            
            <button className="btn btn-dark">Generate Plan</button>
            <Image src="/study-illustration.svg" alt="AI Study Plans" width={150} height={150} />
          </AnimatedBentoContent>
        </div>
        <div className="bento-item bento-item-coral">
          <AnimatedBentoContent>
            <h3 className="text-lg font-bold mb-2">Progress Tracking</h3>
            <p className="text-sm mb-1">Monitor your learning journey with detailed analytics.</p>
            <p className="text-sm mb-1">Track your performance over time, identify areas for improvement, and celebrate your achievements as you progress through your studies.</p>
            <p className="text-sm mb-1">Set goals, earn badges, and stay motivated on your path to mastery with our comprehensive progress tracking system.</p>
          </AnimatedBentoContent>
        </div>
      </div>
    </div>
  );
}