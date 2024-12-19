import React from 'react';
import { Play, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const DemoSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See it in Action</h2>
          <p className="text-xl text-gray-300">Watch how our AI-powered video editor transforms content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1536240478700-b869070f9279"
              alt="Demo Video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="p-4 bg-[#E44E51] rounded-full hover:bg-[#D43B3E] 
                shadow-lg hover:shadow-[#E44E51]/25 transition-all">
                <Play className="w-8 h-8" />
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Transform Your Videos in Minutes</h3>
            <div className="space-y-4">
              <p className="text-gray-300">
                Our AI-powered editor makes video editing effortless. Remove silence,
                add captions, and enhance your content with just a few clicks.
              </p>
              <ul className="space-y-3">
                {[
                  'Intelligent silence detection and removal',
                  'Automatic caption generation',
                  'Smart scene detection',
                  'AI-powered enhancements'
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-1.5 h-1.5 bg-[#E44E51] rounded-full" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="px-6 py-3 bg-[#E44E51] rounded-lg hover:bg-[#D43B3E]
                  shadow-lg hover:shadow-[#E44E51]/25 flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Try it Free</span>
                </button>
                <button className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20
                  flex items-center justify-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};