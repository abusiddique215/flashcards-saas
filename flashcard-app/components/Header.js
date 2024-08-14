import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-800">FlashAI</span>
          <span className="ml-2 text-sm text-gray-600">Smart Flashcards</span>
        </div>
        <div className="flex items-center">
          <a href="#" className="mx-3 text-gray-600 hover:text-gray-800">Features</a>
          <a href="#" className="mx-3 text-gray-600 hover:text-gray-800">Pricing</a>
          <a href="#" className="mx-3 text-gray-600 hover:text-gray-800">About</a>
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Set
          </button>
        </div>
      </nav>
    </header>
  )
}