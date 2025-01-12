import { motion } from 'framer-motion';

const Pricing = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Заглавна секция */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500 mb-4">
            PRICING
          </span>
          <h2 className="text-6xl font-bold mb-4">
            Take back control<br />of your day
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Stop spending hours on productivity tools,<br />and start accomplishing more.
          </p>
          
          {/* Промо банер */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full bg-pink-500/10 text-pink-500 text-sm"
          >
            ✨ Use WELCOME for an extra 50% off your first month 🎉
          </motion.div>
        </div>

        {/* Ценови планове */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Месечен план */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl bg-gray-800/20 backdrop-blur-sm border border-gray-700/50"
          >
            <div className="absolute -top-3 left-8">
              <span className="px-3 py-1 text-sm font-medium bg-blue-500 text-white rounded-full">
                Most Popular
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-6">Subscription</h3>
            
            <div className="mb-6">
              <span className="text-gray-400 line-through text-lg">$10</span>
              <span className="text-5xl font-bold ml-2">$5</span>
              <span className="text-gray-400 ml-2">USD</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                AI Task & Event Analysis
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited AI Voice Transcription
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Premium Support
              </li>
            </ul>

            <button className="w-full py-4 px-6 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors text-white font-medium">
              Start Monthly Plan
            </button>

            <p className="text-sm text-gray-400 text-center mt-4">
              Getting started takes <span className="underline">less than 2 minutes</span>.
            </p>
          </motion.div>

          {/* Lifetime план */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative p-8 rounded-2xl bg-gray-800/20 backdrop-blur-sm border border-gray-700/50"
          >
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-2xl font-bold">Lifetime</h3>
              <span className="text-yellow-500">✨</span>
            </div>
            
            <div className="mb-6">
              <span className="text-gray-400 line-through text-lg">$120</span>
              <span className="text-5xl font-bold ml-2">$50</span>
              <span className="text-gray-400 ml-2">USD</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                All Monthly Plan Features
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Lifetime Access to Updates
              </li>
            </ul>

            <button className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 transition-colors text-white font-medium">
              Get Lifetime Access
            </button>

            <p className="text-sm text-gray-400 text-center mt-4">
              Invest in your productivity for life.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 