"use client"
import { motion } from "framer-motion";
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
/*
            {Object.keys(quizMenuContent).map((key) => (
                <AccordionItem key={key} value={key}>
                    <AccordionTrigger>{key}</AccordionTrigger>
                </AccordionItem>
            ))}
*/

export default function QuizMeny({ quizMenuContent } : QuizMenuProps) {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    
    

      return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20 w-full lg:w-2/3 lg:ml-auto"
        >
          {/* Main Accordion */}
          <h2 className="text-xl font-semibold text-center">Title</h2>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <Accordion
            type="single"
            collapsible
            onValueChange={(value: string | undefined) => setActiveItem(value ?? null)}
            className="w-1/2"
          >
            {Object.entries(quizMenuContent).map(([key, section]) => (
                <AccordionItem key={key} value={key}>
                    <AccordionTrigger>{section.label}</AccordionTrigger>
                </AccordionItem>
            ))}
          </Accordion>
    
          {/* Nested Accordion based on selected item */}
          {activeItem && quizMenuContent[activeItem]?.items && (
            <Accordion type="single" collapsible className="w-1/2">
              {quizMenuContent[activeItem].items.map((item, index) => (
                <AccordionItem key={index} value={`nested-${index}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
          </div>
        </motion.section>
      );
}