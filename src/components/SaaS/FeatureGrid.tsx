import React from 'react';
import { 
  Video, Mic, Brain, Scissors, Type, Layout, Film, 
  Wand2, Sparkles, Play, Download, Share2
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Video,
    title: 'Screen Recording',
    description: 'Record your screen, webcam, or both with picture-in-picture mode'
  },
  {
    icon: Scissors,
    title: 'Smart Silence Removal',
    description: 'Automatically remove silence and filler words while preserving music'
  },
  {
    icon: Type,
    title: 'Auto Captions',
    description: 'Generate and edit captions with AI-powered speech recognition'
  },
  {
    icon: Layout,
    title: 'Chapter Markers',
    description: 'Add smart chapter markers for easy video navigation'
  },
  {
    icon: Film,
    title: 'B-Roll Manager',
    description: 'Organize and manage your B-roll footage with AI tagging'
  },
  {
    icon: Wand2,
    title: 'Video Effects',
    description: 'Apply professional video effects and AI enhancements'
  },
  {
    icon: Brain,
    title: 'AI Features',
    description: 'Face detection, background removal, and smart enhancements'
  },
  {
    icon: Share2,
    title: 'Export & Share',
    description: 'Export in multiple formats and share directly to social media'
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-[#E44E51]/10 text-[#E44E51] rounded-lg 
              flex items-center justify-center mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};