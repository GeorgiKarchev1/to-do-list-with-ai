import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DemoRecorder() {
  const demoText = "Today, I will enjoy a cup of coffee, finish an important project, take a walk in the park, read a few pages of a book, and call a friend to catch up.";
  const tasks = [
    "☕ Enjoy a cup of coffee",
    "📝 Finish important project",
    "🚶‍♂️ Take a walk in the park",
    "📚 Read a few pages of a book",
    "📞 Call a friend to catch up"
  ];
  
  const [displayText, setDisplayText] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});

  const startAnimation = () => {
    setIsAnimating(true);
    setShowTasks(false);
    setCheckedTasks({});
    let currentText = "";
    const textArray = demoText.split("");
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < textArray.length) {
        currentText += textArray[i];
        setDisplayText(currentText);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowTasks(true);
        }, 500);
        setTimeout(() => {
          setDisplayText("");
          setShowTasks(false);
          setIsAnimating(false);
        }, 4000);
      }
    }, 50);
  };

  const handleCheckTask = (task: string) => {
    setCheckedTasks(prev => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startAnimation}
          disabled={isAnimating}
          className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center disabled:opacity-50"
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: displayText ? 1 : 0 }}
          className="flex-1 p-4 rounded-lg bg-gray-700/50"
        >
          {displayText || "Click the microphone to see a demo..."}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showTasks ? 1 : 0,
          height: showTasks ? 'auto' : 0
        }}
        className="space-y-2 overflow-hidden"
      >
        {tasks.map((task, index) => (
          <motion.div
            key={task}
            initial={{ x: -20, opacity: 0 }}
            animate={{ 
              x: showTasks ? 0 : -20, 
              opacity: showTasks ? 1 : 0 
            }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50"
          >
            <input
              type="checkbox"
              checked={checkedTasks[task] || false}
              onChange={() => handleCheckTask(task)}
              className="w-5 h-5 rounded border-gray-600 cursor-pointer"
            />
            <span className={checkedTasks[task] ? 'line-through text-gray-400' : ''}>
              {task}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 