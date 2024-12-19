import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureShowcaseProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: Feature[];
  image: string;
  reverse?: boolean;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  description,
  icon: Icon,
  features,
  image,
  reverse
}) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          <div className="flex-1">
            <div className="max-w-lg">
              <div className="flex items-center space-x-2 text-[#E44E51] mb-4">
                <Icon className="w-6 h-6" />
                <span className="font-medium">Feature Highlight</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="text-xl text-gray-600 mb-8">{description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-[#E44E51]/10 text-[#E44E51] rounded-lg 
                        flex items-center justify-center flex-shrink-0">
                        <FeatureIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};