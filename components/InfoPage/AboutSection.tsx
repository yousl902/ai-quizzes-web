"use client";

import { Users } from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-20 w-full lg:w-2/3"
    >
      <h2 className="text-2xl font-bold mb-6 text-yellow-800 flex items-center gap-2">
        <Users className="w-6 h-6" />
        Om oss
      </h2>
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <div className="prose max-w-none">
          <p className="text-gray-800">
            Vi är ett team av passionerade individer som strävar efter att göra
            lärande roligt och effektivt. Vår resa började i ett litet studentrum,
            där vi insåg att studier ibland kan vara monotona.
          </p>
          <p className="text-gray-800 mt-4">
            Därför skapade vi en plattform som kombinerar interaktivt lärande med 
            den senaste AI-tekniken för att generera quizfrågor.
          </p>
          <p className="text-gray-800 mt-4">
            Vår ambition är att låta varje användare personifiera sin studieupplevelse,
            dela material med andra och tillsammans göra lärandet mer dynamiskt.
            Med ett starkt community i ryggen fortsätter vi att utveckla nya funktioner 
            och förbättra vår tjänst.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
