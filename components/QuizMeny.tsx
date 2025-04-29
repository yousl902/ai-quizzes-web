"use client"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

// The format of the input from the config file
type QuizMenuContent = {
    [key: string]: {
        label: string;
        items: {
            title: string;
            content?: string;
            link?: string
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
      <AnimatePresence mode="wait">
        <motion.h2 
          key={activeItem ?? "default"}
          initial={{ opacity: 0, y: -1 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{duration: 0.3 }}
          className="text-xl font-semibold text-center mb-4"
        >
        {/* Header texten måste ändras efter för att matcha vilken meny som är öppen */}
        {activeItem && quizMenuContent[activeItem] 
          ? `${quizMenuContent[activeItem].label}, välj ett quiz`
          : "Välj Quiz-kategori"}
        </motion.h2>
      </AnimatePresence>
      

      <motion.div
        layout
        transition={{ type: "spring", duration: 0.6 }}
        className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex flex-row space-x-4`}
      >
        {/* Main Accordion */}
        <motion.div 
          layout 
          className={`transition-all duration-500 
                    ${nestedItems ? 'w-1/2' : 'w-full'}
                     flex flex-col justify-start min-h-0`}
        >
          <Accordion
            type="single"
            collapsible
            onValueChange={(value: string | undefined) => setActiveItem(value ?? null)}
          >
            {Object.entries(quizMenuContent).map(([key, section]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger
                  className="py-2 min-h-[unset] text-left text-sm font-medium truncate"
                >
                  {section.label}
                </AccordionTrigger>
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
              className="w-1/2 pl-2 flex flex-col justify-start min-h-0"
            >
              <Accordion type="single" collapsible>
                {nestedItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Länken skall endast visas om link finns i siteConfig */}
                    {item.link ? (
                      <div
                        key={index}
                        className="border-b hover:bg-yellow-100 rounded-lg transition"
                      >
                        <Link 
                          href={item.link} 
                          className="py-2 px-1 text-left w-full block text-sm font-medium truncate">
                          {item.title}
                        </Link>
                      </div>
                    ) : (
                      <AccordionItem key={index} value={`nested-${index}`}>
                        <AccordionTrigger
                          className="py-2 min-h-[unset] text-left text-sm font-medium truncate"
                        >
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.content ? item.content: "Error: inget content givet"}
                        </AccordionContent>
                      </AccordionItem>                     
                    )}
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