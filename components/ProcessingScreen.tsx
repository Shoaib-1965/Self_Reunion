
import React from 'react';

const ProcessingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 border-4 border-t-purple-400 border-r-purple-400 border-b-transparent border-l-transparent rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-semibold text-white" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }}>
        Creating Your Time Hug...
      </h2>
      <p className="text-gray-300 mt-2">Connecting past and present. Please wait.</p>
    </div>
  );
};

export default ProcessingScreen;
