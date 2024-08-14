import React from 'react';

export default function PricingSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Basic"
            price="$9.99"
            features={[
              "100 AI-generated flashcards/month",
              "Basic progress tracking",
              "Web access"
            ]}
          />
          <PricingCard
            title="Pro"
            price="$19.99"
            features={[
              "Unlimited AI-generated flashcards",
              "Advanced progress analytics",
              "Web and mobile access",
              "Priority support"
            ]}
            highlighted={true}
          />
          <PricingCard
            title="Team"
            price="$49.99"
            features={[
              "Everything in Pro",
              "Up to 5 team members",
              "Collaborative flashcard creation",
              "Team progress dashboard"
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, features, highlighted = false }) {
  return (
    <div className={`bg-white p-8 rounded-lg shadow-md ${highlighted ? 'border-2 border-blue-500' : ''}`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">{price}<span className="text-sm font-normal">/month</span></p>
      <ul className="mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 px-4 rounded-full ${highlighted ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-opacity-80`}>
        Choose Plan
      </button>
    </div>
  );
}
