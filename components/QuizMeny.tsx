"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

type QuizMenuContent = {
    [key: string]: {
        label: string;
        items: {
            title: string;
            content: string;
        }[];   
    };
};

// For convenience
type QuizMenuProps = {
    quizMenuContent: QuizMenuContent;
};

export default function QuizMeny({ quizMenuContent } : QuizMenuProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
    
  const nestedItems = activeItem ? quizMenuContent[activeItem]?.items : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-20 w-full"
    >
      <h2 className="text-xl font-semibold text-center mb-4">Quizmeny</h2>

      <div className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg transition-all duration-500 ${nestedItems ? 'flex space-x-4' : 'block'}`}>
        {/* Main Accordion */}
        <div className={`${nestedItems ? 'w-1/2' : 'w-full'}`}>
          <Accordion
            type="single"
            collapsible
            onValueChange={(value: string | undefined) => setActiveItem(value ?? null)}
          >
            {Object.entries(quizMenuContent).map(([key, section]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger>{section.label}</AccordionTrigger>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Nested Accordion */}
        <AnimatePresence>
          {nestedItems && (
            <motion.div
              key="nested"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "50%" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Accordion type="single" collapsible>
                {nestedItems.map((item, index) => (
                  <AccordionItem key={index} value={`nested-${index}`}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}