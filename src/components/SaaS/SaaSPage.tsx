import React from 'react';
import { 
  Video, Mic, Brain, Scissors, Type, Layout, Film, 
  Wand2, Sparkles, Play, Download, Share2, Star,
  ChevronRight, ArrowRight, Check, Volume2, Music,
  MessageCircle, Layers, Clock, Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureGrid } from './FeatureGrid';
import { FeatureShowcase } from './FeatureShowcase';
import { DemoSection } from './DemoSection';
import { FeatureFloatingPicker } from './FeatureFloatingPicker';
import { PricingSection } from './PricingSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';

export const SaaSPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Video Editing,{' '}
              <span className="text-[#E44E51]">Powered by AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your videos with intelligent features like silence removal,
              auto-captions, smart transitions, and AI-powered enhancements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-[#E44E51] text-white rounded-lg hover:bg-[#D43B3E]
                shadow-lg hover:shadow-[#E44E51]/25 flex items-center space-x-2 text-lg font-medium">
                <Play className="w-5 h-5" />
                <span>Try it Free</span>
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20
                backdrop-blur-sm flex items-center space-x-2 text-lg font-medium">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Professional Videos
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features that make video editing effortless
            </p>
          </div>
          <FeatureGrid />
        </div>
      </section>

      {/* Feature Showcases */}
      <FeatureShowcase
        title="Smart Silence Removal"
        description="Automatically detect and remove silent segments, filler words, and preserve music sections."
        icon={Scissors}
        features={[
          { icon: Volume2, title: "Silence Detection", description: "Intelligent detection of silent segments" },
          { icon: Music, title: "Music Preservation", description: "Keeps music sections intact" },
          { icon: MessageCircle, title: "Filler Word Removal", description: "Removes umms and ahhs" },
          { icon: Brain, title: "AI-Powered", description: "Smart detection algorithms" }
        ]}
        image="https://images.unsplash.com/photo-1516541196182-6bdb0516ed27"
      />

      <FeatureShowcase
        title="AI Video Enhancement"
        description="Enhance your videos with advanced AI features and effects."
        icon={Wand2}
        features={[
          { icon: Camera, title: "Face Detection", description: "Track and enhance faces" },
          { icon: Layers, title: "Background Removal", description: "Smart background removal" },
          { icon: Sparkles, title: "Auto Enhancement", description: "Intelligent color correction" },
          { icon: Brain, title: "Scene Detection", description: "Automatic scene segmentation" }
        ]}
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        reverse
      />

      <FeatureShowcase
        title="Professional Captions"
        description="Generate, edit and style captions with AI-powered speech recognition."
        icon={Type}
        features={[
          { icon: Brain, title: "Auto Generation", description: "AI speech recognition" },
          { icon: Palette, title: "Custom Styles", description: "Beautiful caption styles" },
          { icon: Layout, title: "Multiple Formats", description: "Export in various formats" },
          { icon: Clock, title: "Perfect Timing", description: "Automatic synchronization" }
        ]}
        image="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
      />

      {/* Demo Section */}
      <DemoSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#silence-removal" className="hover:text-[#E44E51]">Silence Removal</a></li>
                <li><a href="#captions" className="hover:text-[#E44E51]">Captions</a></li>
                <li><a href="#chapters" className="hover:text-[#E44E51]">Chapters</a></li>
                <li><a href="#effects" className="hover:text-[#E44E51]">Video Effects</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                <li><a href="#recorder" className="hover:text-[#E44E51]">Video Recorder</a></li>
                <li><a href="#editor" className="hover:text-[#E44E51]">Video Editor</a></li>
                <li><a href="#broll" className="hover:text-[#E44E51]">B-Roll Manager</a></li>
                <li><a href="#export" className="hover:text-[#E44E51]">Export Tools</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#docs" className="hover:text-[#E44E51]">Documentation</a></li>
                <li><a href="#tutorials" className="hover:text-[#E44E51]">Tutorials</a></li>
                <li><a href="#api" className="hover:text-[#E44E51]">API Reference</a></li>
                <li><a href="#blog" className="hover:text-[#E44E51]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-[#E44E51]">About</a></li>
                <li><a href="#contact" className="hover:text-[#E44E51]">Contact</a></li>
                <li><a href="#privacy" className="hover:text-[#E44E51]">Privacy</a></li>
                <li><a href="#terms" className="hover:text-[#E44E51]">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 AI Video Editor. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Feature Picker */}
      <FeatureFloatingPicker />
    </div>
  );
};