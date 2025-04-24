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
    
    const showNested = !!(activeItem && quizMenuContent[activeItem]?.items);

      return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20 w-full lg:w-2/3 lg:ml-auto"
        >
          
          <h2 className="text-xl font-semibold text-center">Title</h2>

          <motion.div
            layout
            className="flex gap-4 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg overflow-hidden"
            transition={{duration: 0.4, ease: "easeInOut"}}
          >
            {/* Main Accordion */}
            <div className="w-full lg:w-auto">
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

            {/* Nested Accordion based on selected item */}
            <AnimatePresence>
              {showNested && (
                <motion.div
                  key="nested"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="ml-4 overflow-hidden"
                >
                  <Accordion type="single" collapsible>
                    {quizMenuContent[activeItem].items.map((item, index) => (
                      <AccordionItem key={index} value={`nested-${index}`}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )}             
            </AnimatePresence>
          </motion.div>
        </motion.section>
      );
}