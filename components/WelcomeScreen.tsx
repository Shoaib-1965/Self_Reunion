
import React, { useState } from 'react';

interface WelcomeScreenProps {
  onLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-transparent text-white">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold tracking-wider" style={{ textShadow: '0 0 15px rgba(173, 216, 230, 0.7)' }}>
            Self Reunion
          </h1>
          <p className="text-lg mt-2 text-gray-300">Embrace Your Past, Today.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              defaultValue="user@example.com"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              defaultValue="password"
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              />
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              {isLogin ? 'Continue' : 'Create Account'}
            </button>
          </form>
          <p className="mt-6 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-purple-300 hover:text-purple-200">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
