'use client';

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { StudioForm } from "@/components/studio/StudioForm";
import { staggerContainer, fadeIn } from "@/lib/animations";

export default function StudioPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900">
      <motion.div 
        className="container mx-auto px-4 py-16 md:py-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 studio-gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Design Room
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Transform your space with our intelligent design tool. Simply fill out the form below and let our AI create the perfect room for you.
          </motion.p>
        </motion.div>

        <StudioForm />
      </motion.div>
    </div>
  );
}