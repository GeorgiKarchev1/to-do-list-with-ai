import { motion } from "framer-motion";

const Demo = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500 mb-4">
            DEMO
          </span>
          <h2 className="text-6xl font-bold mb-4">
            See it in Action
          </h2>
          <p className="text-xl text-gray-400">
            Here's how easy it is to use <span role="img" aria-label="pointing">👆</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl" />
          
          <iframe
            className="w-full h-full rounded-2xl"
            src="https://www.youtube.com/embed/xXk8C7Fop2Y"
            title="Product Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl -z-10" />
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-5 blur-3xl rounded-2xl -z-20" />
        </motion.div>
      </div>
    </div>
  );
};

export default Demo; 