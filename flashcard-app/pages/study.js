import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  // Your Firebase configuration
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function StudyFlashcards() {
  const { isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchFlashcardSets();
    }
  }, [isSignedIn, user]);

  const fetchFlashcardSets = async () => {
    const q = query(collection(db, 'flashcardSets'), where('userId', '==', user.id));
    const querySnapshot = await getDocs(q);
    const sets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFlashcardSets(sets);
  };

  const currentSet = flashcardSets[currentSetIndex];
  const currentCard = currentSet?.flashcards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < currentSet.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (currentSetIndex < flashcardSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      setCurrentCardIndex(0);
    }
    setShowAnswer(false);
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
      setCurrentCardIndex(flashcardSets[currentSetIndex - 1].flashcards.length - 1);
    }
    setShowAnswer(false);
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Please sign in to study flashcards</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (flashcardSets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">No Flashcards Available</h1>
          <p>Please create some flashcards first.</p>
        </main>
        <Footer />
      </div>
    );
  }

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