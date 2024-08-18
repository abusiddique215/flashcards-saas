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
          status: data.cardStatus?.[card.id] || null
        }))
      };
    });
    setFlashcardSets(sets);

    const knownCardsObj = {};
    const needsReviewCardsObj = {};
    sets.forEach(set => {
      set.flashcards.forEach(card => {
        if (card.status === 'known') knownCardsObj[card.id] = true;
        if (card.status === 'review') needsReviewCardsObj[card.id] = true;
      });
    });
    setKnownCards(knownCardsObj);
    setNeedsReviewCards(needsReviewCardsObj);
  };

  const currentSet = flashcardSets[currentSetIndex];
  const currentSetFlashcards = reviewMode
    ? currentSet?.flashcards.filter(card => needsReviewCards[card.id])
    : currentSet?.flashcards;
  const currentCard = currentSetFlashcards?.[currentCardIndex];

  const nextCard = () => {
    const currentSetFlashcards = reviewMode
      ? currentSet.flashcards.filter(card => needsReviewCards[card.id])
      : currentSet.flashcards;

    if (currentCardIndex < currentSetFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (currentSetIndex < flashcardSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      setCurrentCardIndex(0);
    }
    setShowAnswer(false);
  };

  const previousCard = () => {
    const currentSetFlashcards = reviewMode
      ? currentSet.flashcards.filter(card => needsReviewCards[card.id])
      : currentSet.flashcards;

    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
      const previousSet = flashcardSets[currentSetIndex - 1];
      const previousSetFlashcards = reviewMode
        ? previousSet.flashcards.filter(card => needsReviewCards[card.id])
        : previousSet.flashcards;
      setCurrentCardIndex(previousSetFlashcards.length - 1);
    }
    setShowAnswer(false);
  };

  const markCard = async (status) => {
    if (!currentCard) return;

    const newKnownCards = { ...knownCards, [currentCard.id]: status === 'known' };
    const newNeedsReviewCards = { ...needsReviewCards, [currentCard.id]: status === 'review' };

    setKnownCards(newKnownCards);
    setNeedsReviewCards(newNeedsReviewCards);

    try {
      await updateDoc(doc(db, 'flashcardSets', currentSet.id), {
        [`cardStatus.${currentCard.id}`]: status
      });
    } catch (error) {
      console.error('Error updating card status:', error);
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
            <p className="mb-4">
              Card {currentCardIndex + 1} of {currentSet.flashcards.length}
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