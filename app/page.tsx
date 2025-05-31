'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeIn, slideUp } from '@/lib/animations';
import { MotionButton } from '@/components/ui/motion-button';

export default function Home() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900 p-4"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div 
        className="text-center max-w-3xl"
        variants={slideUp}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 studio-gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          Design Your Dream Space
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          Create beautiful, personalized room designs with our intuitive design tool
        </motion.p>
        
        <MotionButton 
          href="/studio" 
          variant="gradient"
          className="text-lg px-8 py-6 h-auto font-semibold"
        >
          Go to Design Room <ArrowRight className="ml-2 h-5 w-5" />
        </MotionButton>
      </motion.div>
    </motion.div>
  );
}