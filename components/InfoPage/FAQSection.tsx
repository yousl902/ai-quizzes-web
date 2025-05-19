import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export const FAQSection = (
  { faq }: {
    faq: { question: string; answer: string }[];
  }
) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-20 w-full lg:w-2/3 lg:ml-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-info-subheader flex items-center gap-2">
        <HelpCircle className="w-6 h-6" />
        FAQ
      </h2>
      <div className="bg-info-sections backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, index) => (
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
