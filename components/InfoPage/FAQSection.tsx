"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Kan jag använda era quiz offline?",
    answer: "Just nu är våra quizer enbart tillgängliga online."
  },
  {
    question: "Vad kostar tjänsten?",
    answer: "Tjänsten är kostnadsfri."
  },
  {
    question: "Har ni olika delarfrån Högskoleprovet?",
    answer: "Ja, vi har quizer från alla delar av Högskoleprovet."
  }
];

export const FAQSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-20 w-full lg:w-2/3 lg:ml-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-yellow-800 flex items-center gap-2">
        <HelpCircle className="w-6 h-6" />
        FAQ
      </h2>
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};
