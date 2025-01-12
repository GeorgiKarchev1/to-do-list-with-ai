import { useState, useEffect } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import HowItWorks from './components/HowItWorks';
import Demo from './components/Demo';
import Reviews from './components/Reviews';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './components/AuthModal';
import { useAuth } from './providers/AuthProvider';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DemoRecorder from './components/DemoRecorder';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Показваме нотификация само при успешен login
  const handleSuccessfulLogin = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={
        <div className="min-h-screen bg-gray-900 text-white">
          {/* Нотификация */}
          <AnimatePresence mode="wait">
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }}
                exit={{ 
                  opacity: 0,
                  y: -20,
                  scale: 0.9,
                  transition: {
                    duration: 0.3,
                    ease: "easeIn"
                  }
                }}
                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg bg-green-500/20 text-green-500 font-medium"
              >
                Successfully logged in as {user?.email}
              </motion.div>
            )}
          </AnimatePresence>

          {user ? (
            // Account бутон когато сме логнати
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-4 right-4 z-50 flex items-center gap-2"
            >
              <button
                onClick={() => alert('Account page coming soon!')}
                className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium"
              >
                Account
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </motion.div>
          ) : (
            // Login бутон когато не сме логнати
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="fixed top-4 right-4 z-50 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium"
            >
              Login / Sign Up
            </motion.button>
          )}

          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)}
            onSuccessfulLogin={handleSuccessfulLogin}
          />

          <main>
            <div className="max-w-7xl mx-auto py-12 px-4">
              <div className="grid grid-cols-2 gap-8 items-center">
                {/* Лява колона с текст */}
                <div className="text-left">
                  <h2 className="text-5xl font-bold mb-6">
                    <span className="text-white">Say It, </span>
                    <span className="text-blue-500">Plan It, </span>
                    <span className="text-pink-500">Live It</span>
                  </h2>
                  <h3 className="text-4xl font-bold mb-8">
                    <span className="text-white">Your </span>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Optimal Day</span>
                  </h3>
                  <p className="text-gray-400 text-xl mb-8">
                    Create tasks and events as easily as{' '}
                    <span className="bg-gray-800 px-3 py-1 rounded-full">speaking them</span>
                  </p>
                  
                  <div className="flex gap-4 mb-12">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Get Started
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                      Watch Demo
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="https://via.placeholder.com/32" alt="User" />
                      <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="https://via.placeholder.com/32" alt="User" />
                      <img className="w-8 h-8 rounded-full border-2 border-gray-900" src="https://via.placeholder.com/32" alt="User" />
                    </div>
                    <span>Join 500+ people making every day count</span>
                  </div>
                </div>

                {/* Дясна колона с DemoRecorder */}
                <div className="rounded-2xl p-6">
                  <DemoRecorder />
                </div>
              </div>
            </div>

            <HowItWorks />
            <Demo />
            <Reviews />
            <Pricing />
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}

export default App;
