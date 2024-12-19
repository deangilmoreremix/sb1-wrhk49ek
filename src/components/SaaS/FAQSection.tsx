import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How does the AI silence removal work?',
    answer: 'Our AI analyzes your video\'s audio to detect silent segments and filler words while preserving important pauses and music sections. You can customize the sensitivity and minimum duration settings to match your needs.'
  },
  {
    question: 'Can I use the video editor offline?',
    answer: 'Currently, our editor runs in the browser and requires an internet connection to access AI features. However, you can download your edited videos for offline viewing.'
  },
  {
    question: 'What video formats are supported?',
    answer: 'We support most common video formats including MP4, WebM, MOV, and AVI. You can also export your videos in various formats and qualities.'
  },
  {
    question: 'Is there a limit on video length?',
    answer: 'Free users can edit videos up to 10 minutes in length. Pro and Enterprise users have no length restrictions.'
  },
  {
    question: 'How accurate are the auto-generated captions?',
    answer: 'Our AI-powered caption generation typically achieves 95%+ accuracy for clear audio in English. We support multiple languages and provide an easy-to-use editor for making corrections.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about our video editor</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <h3 className="font-medium pr-8">{faq.question}</h3>
                <ChevronDown className={`w-5 h-5 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-6 pt-0 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};