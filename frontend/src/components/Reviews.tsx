import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    author: "@adiraje1990",
    platform: "Reddit",
    avatar: "A",
    text: "Really clean and polished. Great work 👏",
    rating: 5
  },
  {
    id: 2,
    author: "@ur_avg_j0e",
    platform: "Reddit",
    avatar: "AJ",
    text: "Exactly the kind of app I need!",
    rating: 5
  },
  {
    id: 3,
    author: "@sindhichhokro",
    platform: "Reddit",
    avatar: "SC",
    text: "Got myself the lifetime plan. Loving it so far!",
    rating: 5
  }
];

const Reviews = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/20 backdrop-blur-sm p-6 rounded-2xl relative group hover:bg-gray-800/30 transition-all duration-300"
            >
              {/* Горна част с автор */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-sm font-medium text-gray-300">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-200">{review.author}</div>
                  <div className="text-sm text-gray-400">{review.platform}</div>
                </div>
              </div>

              {/* Текст на ревюто */}
              <p className="text-gray-300 mb-4">{review.text}</p>

              {/* Рейтинг */}
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.1 }}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              {/* Декоративен градиент */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.02 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews; 