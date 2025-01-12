import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <div className="py-48">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500 mb-8">
              HOW IT WORKS
            </span>

            <h2 className="text-6xl font-bold mb-6">
              Voice. Vision. Victory.
            </h2>

            <p className="text-2xl text-gray-400 mb-16">
              Finally, a productivity app that works as fast as you think.
            </p>

            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6"
              >
                <span className="text-6xl font-light text-blue-200/30">1.</span>
                <p className="text-2xl pt-3">Talk through your day's goals</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-6"
              >
                <span className="text-6xl font-light text-blue-200/30">2.</span>
                <p className="text-2xl pt-3">
                  AI <span role="img" aria-label="robot">🤖</span> transforms words into action
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-6"
              >
                <span className="text-6xl font-light text-blue-200/30">3.</span>
                <p className="text-2xl pt-3">
                  Get your optimized game plan
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-xl font-medium text-gray-200 mb-4">Today's Plan</div>
              
              <motion.div 
                className="flex items-center justify-center gap-1 h-12 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-blue-500 rounded-full"
                    animate={{
                      height: ["15px", "45px", "15px"]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              <div className="space-y-3">
                {[
                  { text: "Morning coffee ☕", delay: 0.5 },
                  { text: "Team meeting 👥", delay: 0.7 },
                  { text: "Project deadline 🎯", delay: 0.9 },
                  { text: "Lunch break 🍜", delay: 1.1 },
                  { text: "Evening workout 💪", delay: 1.3 }
                ].map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: task.delay,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="bg-gray-700/30 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: task.delay
                      }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <span className="text-gray-200">{task.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl -z-10"
                animate={{
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-5 blur-3xl rounded-2xl -z-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 