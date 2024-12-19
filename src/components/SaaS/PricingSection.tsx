import React from 'react';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out our features',
    features: [
      'Basic video recording',
      'Simple silence removal',
      'Auto-generated captions',
      'Basic video effects',
      '720p export quality',
      'Up to 10 minutes per video'
    ]
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For content creators and professionals',
    popular: true,
    features: [
      'Everything in Free, plus:',
      'Advanced AI features',
      'Smart silence removal',
      'Custom styled captions',
      '4K export quality',
      'Unlimited video length',
      'Priority support'
    ]
  },
  {
    name: 'Enterprise',
    price: 49,
    description: 'For teams and organizations',
    features: [
      'Everything in Pro, plus:',
      'Team collaboration',
      'Custom branding',
      'API access',
      'Advanced analytics',
      'Dedicated support',
      'Custom integrations'
    ]
  }
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden
                ${plan.popular ? 'ring-2 ring-[#E44E51]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#E44E51] text-white px-4 py-1 
                  rounded-bl-lg text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#E44E51] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium
                  ${plan.popular 
                    ? 'bg-[#E44E51] text-white hover:bg-[#D43B3E] shadow-lg hover:shadow-[#E44E51]/25'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-all`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};