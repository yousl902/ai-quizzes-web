"use client"

import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

export default function QuizMeny() {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    
    const nestedContentMap: Record<string, { title: string; content: string }[]> = {
        "item-1": [
          {
            title: "Accessibility Details",
            content: "It follows the WAI-ARIA guidelines and works well with screen readers.",
          },
          {
            title: "Keyboard Support",
            content: "Users can navigate using Tab and arrow keys.",
          },
        ],
        "item-2": [
          {
            title: "Tech Stack",
            content: "Built using Radix UI primitives under the hood.",
          },
          {
            title: "Customization",
            content: "You can style it with Tailwind or any CSS framework.",
          },
        ],
      };

      return (
        <div className="flex space-x-4">
          {/* Main Accordion */}
          <Accordion
            type="single"
            collapsible
            onValueChange={(value: string | undefined) => setActiveItem(value ?? null)}
            className="w-1/2"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is it?</AccordionTrigger>
              <AccordionContent>
                It’s a UI component library built with Radix primitives.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
    
          {/* Nested Accordion based on selected item */}
          {activeItem && nestedContentMap[activeItem] && (
            <Accordion type="single" collapsible className="w-1/2">
              {nestedContentMap[activeItem].map((item, index) => (
                <AccordionItem key={index} value={`nested-${index}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      );
}