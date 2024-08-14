import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">FlashAI</h3>
            <p className="text-gray-400">Revolutionizing learning with AI-powered flashcards.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="text-gray-400">
              <li>Home</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>About Us</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-gray-400">Email: support@flashai.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © 2024 FlashAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}