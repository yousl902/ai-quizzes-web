"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";

export const ContactSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20 w-full lg:w-2/3"
    >
      <h2 className="text-2xl font-bold mb-6 text-yellow-800 flex items-center gap-2">
        <Mail className="w-6 h-6" />
        Kontakt
      </h2>
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-gray-800">
            <Mail className="w-5 h-5 text-yellow-600" />
            <a
              href="mailto:info@studycomb.se"
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              info@studycomb.se
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-800">
            <Phone className="w-5 h-5 text-yellow-600" />
            <span>Telefontid vardagar</span>
          </p>
          <p className="flex items-center gap-2 text-gray-800">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span>09:00 - 17:00</span>
          </p>
          <p className="mt-4 text-gray-800">
            Vi strävar efter att besvara alla förfrågningar inom 24 timmar. 
            Tveka inte att höra av dig om du har några frågor eller funderingar.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
