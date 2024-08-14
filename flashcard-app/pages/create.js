import React, { useState } from 'react';
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Configuration, OpenAIApi } from 'openai';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  // Your Firebase configuration
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CreateFlashcards() {
  const { isSignedIn, user } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedFlashcards, setGeneratedFlashcards] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert('Please sign in to create flashcards');
      return;
    }
    setIsLoading(true);

    try {
      // Generate flashcards using OpenAI
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Create flashcards from the following content:\n\n${content}\n\nFormat: Question: [question] Answer: [answer]`,
        max_tokens: 1000,
        n: 5,
        stop: null,
        temperature: 0.7,
      });

      const flashcards = response.data.choices.map((choice, index) => {
        const [question, answer] = choice.text.split('Answer:');
        return {
          id: index + 1,
          question: question.replace('Question:', '').trim(),
          answer: answer.trim(),
        };
      });

      setGeneratedFlashcards(flashcards);

      // Save flashcards to Firebase
      const docRef = await addDoc(collection(db, 'flashcardSets'), {
        userId: user.id,
        title,
        flashcards,
        createdAt: new Date(),
      });

      console.log('Flashcard set saved with ID: ', docRef.id);

      // Process payment
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_XXXXXXXXXXXXXXXXXXXXXXXX', quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/study`,
        cancelUrl: `${window.location.origin}/create`,
      });

      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate AI-powered flashcard generation
  const simulateAIGeneration = (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const flashcards = content.split('.').filter(sentence => sentence.trim() !== '').map((sentence, index) => ({
          id: index + 1,
          question: `What is related to: ${sentence.trim()}?`,
          answer: sentence.trim()
        }));
        resolve(flashcards);
      }, 2000); // Simulate 2 second delay
    });
  };

  const saveFlashcards = (flashcards) => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Create Flashcards - FlashAI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Flashcard Set</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter flashcard set title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="Enter your content here. Our AI will generate flashcards from this."
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Flashcards'}
            </button>
          </div>
        </form>

        {generatedFlashcards.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Generated Flashcards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedFlashcards.map((flashcard) => (
                <div key={flashcard.id} className="bg-white shadow-md rounded p-4">
                  <p className="font-bold mb-2">Q: {flashcard.question}</p>
                  <p>A: {flashcard.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}