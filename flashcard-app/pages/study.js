import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function StudyFlashcards() {
  const { isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState({});
  const [needsReviewCards, setNeedsReviewCards] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [lastReviewedDate, setLastReviewedDate] = useState({});
  const [easinessFactor, setEasinessFactor] = useState({});
  const [interval, setInterval] = useState({});

  const calculateNextReviewDate = (cardId, quality) => {
    const now = new Date();
    let ef = easinessFactor[cardId] || 2.5;
    let i = interval[cardId] || 0;

    if (quality >= 3) {
      if (i === 0) {
        i = 1;
      } else if (i === 1) {
        i = 6;
      } else {
        i = Math.round(i * ef);
      }
      ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
      i = 1;
      ef = Math.max(1.3, ef - 0.8 + (0.28 * quality) - (0.02 * quality * quality));
    }

    ef = Math.max(1.3, ef);
    const nextReviewDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);

    setLastReviewedDate(prev => ({ ...prev, [cardId]: now }));
    setEasinessFactor(prev => ({ ...prev, [cardId]: ef }));
    setInterval(prev => ({ ...prev, [cardId]: i }));

    return nextReviewDate;
  };

  useEffect(() => {
    if (isSignedIn && user) {
      fetchFlashcardSets();
    }
  }, [isSignedIn, user]);

  const fetchFlashcardSets = async () => {
    const q = query(collection(db, 'flashcardSets'), where('userId', '==', user.id));
    const querySnapshot = await getDocs(q);
    const sets = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        flashcards: data.flashcards.map(card => ({
          ...card,
          status: data.cardStatus?.[card.id] || null,
          lastReviewed: data.lastReviewed?.[card.id] || null,
          easinessFactor: data.easinessFactor?.[card.id] || 2.5,
          interval: data.interval?.[card.id] || 0,
          nextReviewDate: data.nextReviewDate?.[card.id] || null
        }))
      };
    });
    setFlashcardSets(sets);

    const knownCardsObj = {};
    const needsReviewCardsObj = {};
    const lastReviewedObj = {};
    const easinessFactorObj = {};
    const intervalObj = {};

    sets.forEach(set => {
      set.flashcards.forEach(card => {
        if (card.status === 'known') knownCardsObj[card.id] = true;
        if (card.status === 'review') needsReviewCardsObj[card.id] = true;
        if (card.lastReviewed) lastReviewedObj[card.id] = new Date(card.lastReviewed);
        easinessFactorObj[card.id] = card.easinessFactor;
        intervalObj[card.id] = card.interval;
      });
    });

    setKnownCards(knownCardsObj);
    setNeedsReviewCards(needsReviewCardsObj);
    setLastReviewedDate(lastReviewedObj);
    setEasinessFactor(easinessFactorObj);
    setInterval(intervalObj);
  };

  const currentSet = flashcardSets[currentSetIndex];
  const currentSetFlashcards = reviewMode
    ? currentSet?.flashcards.filter(card => {
      const nextReviewDate = new Date(card.nextReviewDate);
      return needsReviewCards[card.id] || (nextReviewDate && nextReviewDate <= new Date());
    })
    : currentSet?.flashcards;
  const currentCard = currentSetFlashcards?.[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < currentSetFlashcards.length - 1) {
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
      const previousSet = flashcardSets[currentSetIndex - 1];
      setCurrentCardIndex(previousSet.flashcards.length - 1);
    }
    setShowAnswer(false);
  };

  const markCard = async (status) => {
    if (!currentCard) return;

    const newKnownCards = { ...knownCards, [currentCard.id]: status === 'known' };
    const newNeedsReviewCards = { ...needsReviewCards, [currentCard.id]: status === 'review' };

    setKnownCards(newKnownCards);
    setNeedsReviewCards(newNeedsReviewCards);

    const quality = status === 'known' ? 5 : 2;
    const nextReviewDate = calculateNextReviewDate(currentCard.id, quality);

    try {
      await updateDoc(doc(db, 'flashcardSets', currentSet.id), {
        [`cardStatus.${currentCard.id}`]: status,
        [`lastReviewed.${currentCard.id}`]: new Date(),
        [`easinessFactor.${currentCard.id}`]: easinessFactor[currentCard.id],
        [`interval.${currentCard.id}`]: interval[currentCard.id],
        [`nextReviewDate.${currentCard.id}`]: nextReviewDate
      });
      nextCard();
    } catch (error) {
      console.error('Error updating card status:', error);
      alert('Error updating card status. Please try again.');
    }
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
        {currentSet && (
          <>
            <h2 className="text-2xl font-semibold mb-4">{currentSet.title}</h2>
            <p className="mb-4 flex items-center">
              <span>Card {currentCardIndex + 1} of {currentSetFlashcards.length}</span>
              {currentCard.nextReviewDate && new Date(currentCard.nextReviewDate) <= new Date() && (
                <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Due for review</span>
              )}
            </p>
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
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => markCard('known')}
                className={`px-4 py-2 rounded-md ${
                  knownCards[currentCard.id] ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                Mark as Known
              </button>
              <button
                onClick={() => markCard('review')}
                className={`px-4 py-2 rounded-md ${
                  needsReviewCards[currentCard.id] ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                Needs Review
              </button>
            </div>
          </>
        )}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setReviewMode(!reviewMode)}
            className={`px-4 py-2 rounded-md ${
              reviewMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {reviewMode ? 'Exit Review Mode' : 'Enter Review Mode'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}