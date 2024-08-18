import React from 'react';

function Ref({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-4 rounded-xl bg-gradient-to-br from-coral via-mint to-sky p-1 shadow-xl">
      <div className="rounded-lg bg-white p-3 sm:p-4 dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}

export default Ref;