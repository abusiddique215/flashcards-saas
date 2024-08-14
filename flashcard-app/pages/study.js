import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Mock data for flashcards
const mockFlashcards = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
  { id: 3, question: "What is the chemical symbol for gold?", answer: "Au" },
];

export default function StudyFlashcards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = mockFlashcards[currentCardIndex];

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % mockFlashcards.length);
    setShowAnswer(false);
  };

  const previousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + mockFlashcards.length) % mockFlashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Study Flashcards - FlashAI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Study Flashcards</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="mb-4">
            <p className="text-lg font-semibold">{currentCard.question}</p>
          </div>
          {showAnswer && (
            <div className="mb-4">
              <p className="text-lg">{currentCard.answer}</p>
            </div>
          )}
          <div className="flex justify-between">
            <button
              onClick={previousCard}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            <button
              onClick={nextCard}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
