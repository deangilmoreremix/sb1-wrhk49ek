import React, { useState } from 'react';
import { 
  Video, Mic, Brain, Scissors, Type, Layout, Film, 
  Wand2, ChevronUp, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  { icon: Video, title: 'Screen Recording', href: '#recorder' },
  { icon: Scissors, title: 'Silence Removal', href: '#silence-removal' },
  { icon: Type, title: 'Captions', href: '#captions' },
  { icon: Layout, title: 'Chapters', href: '#chapters' },
  { icon: Film, title: 'B-Roll', href: '#broll' },
  { icon: Wand2, title: 'Effects', href: '#effects' },
  { icon: Brain, title: 'AI Features', href: '#ai-features' }
];

export const FeatureFloatingPicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-xl 
              border border-gray-200 w-64 overflow-hidden"
          >
            <div className="p-4 border-b">
              <h3 className="font-medium">Quick Navigation</h3>
            </div>
            <div className="p-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <a
                    key={index}
                    href={feature.href}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg
                      text-gray-700 hover:text-[#E44E51] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{feature.title}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 bg-white rounded-full shadow-lg border border-gray-200
          hover:shadow-xl transition-shadow ${isOpen ? 'bg-gray-50' : ''}`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <ChevronUp className="w-6 h-6 text-gray-700" />
        )}
      </button>
    </div>
  );
};