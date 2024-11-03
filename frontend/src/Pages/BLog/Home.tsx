import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const quotes = [
  "Write your thoughts and share with the world.",
  "Unleash the writer in you.",
  "Express, create, and inspire.",
  "Your words can change the world.",
];

export default function Homepage() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white overflow-hidden">

      {/* Background Animated Circles */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute w-96 h-96 bg-green-700 rounded-full top-1/4 left-1/3 filter blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-green-600 rounded-full bottom-1/3 right-1/3 filter blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Floating dots */}
        <motion.div
          className="absolute w-2 h-2 bg-white rounded-full top-16 left-16 opacity-70"
          animate={{ x: [0, 100, -100, 0], y: [0, 70, -70, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-white rounded-full bottom-16 right-16 opacity-70"
          animate={{ x: [0, -100, 100, 0], y: [0, -70, 70, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        {/* Green dot animation */}
        <motion.div
          className="absolute w-3 h-3 bg-green-400 rounded-full top-1/2 left-1/4 opacity-50"
          animate={{ y: [0, 30, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Quote Text */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-center mb-10 z-10 max-w-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        key={currentQuote}
      >
        {quotes[currentQuote]}
      </motion.h1>

      {/* Let's Go Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg hover:bg-gray-300 transition-all duration-300 z-10"
        onClick={() => navigate('/signup')}
      >
        Let’s Go
      </motion.button>
    </div>
  );
}
