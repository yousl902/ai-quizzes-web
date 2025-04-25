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

      <motion.div
        layout
        transition={{ type: "spring", duration: 0.6 }}
        className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex ${
          nestedItems ? "flex-row space-x-4" : "flex-col"
        }`}
      >
        {/* Main Accordion */}
        <motion.div layout className={nestedItems ? 'w-1/2' : 'w-full'}>
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
        </motion.div>

        {/* Nested Accordion */}
        <AnimatePresence mode="wait">
          {nestedItems && (
            <motion.div
              layout
              key="nested"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-1/2"
            >
              <Accordion type="single" collapsible>
                {nestedItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem value={`nested-${index}`}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent>{item.content}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}