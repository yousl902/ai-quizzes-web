"use client"
import siteInfo from "@/siteConfig";
import QuizMeny from "@/components/QuizMeny";
import { motion } from "framer-motion";

export default function QuizMenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 pt-16 pb-12 relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold leading-relaxed mb-16 text-center bg-clip-text text-transparent 
                     bg-gradient-to-r from-amber-600 to-yellow-600"
        >
          Quiz meny
        </motion.h1>

        <div>
          <QuizMeny
            quizMenuContent={siteInfo.quizMenuContent}
          />
        </div>
      </div>
    </div>
  );
}