import React, { useState } from 'react';
import Head from 'next/head';
import { useUser } from '@clerk/nextjs';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Configuration, OpenAIApi } from 'openai';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
        prompt: `Create 5 flashcards from the following content:\n\n${content}\n\nFormat each flashcard as JSON: {"question": "...", "answer": "..."}`,
        max_tokens: 1000,
        n: 1,
        stop: null,
        temperature: 0.7,
      });

      const flashcardsText = response.data.choices[0].text.trim();
      const flashcards = flashcardsText.split('\n').map((card, index) => {
        const parsedCard = JSON.parse(card);
        return { id: index + 1, ...parsedCard };
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
      alert('Flashcards generated and saved successfully!');
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Error generating flashcards. Please try again.');
    } finally {
      setIsLoading(false);
    }
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