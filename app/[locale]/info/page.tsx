"use client";

import { ContactSection } from "@/components/InfoPage/ContactSection";
import { FAQSection } from "@/components/InfoPage/FAQSection";
import { AboutSection } from "@/components/InfoPage/AboutSection";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function InfoPage() {
  const t = useTranslations("info");

  const KEYS = ["0", "1", "2"] as const;
  const faqItems = KEYS.map((key) => ({
    question: t(`FAQ.faqItems.${key}.question`),
    answer: t(`FAQ.faqItems.${key}.answer`),
  }));
  const aboutItems = KEYS.map((key) => t(`about.${key}`));

  return (
    <div className="min-h-screen bg-bg pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold leading-relaxed mb-16 text-center text-quiz-menu-header"
        >
          {t("title")}
        </motion.h1>

        <div className="space-y-20">
          {/* Kontakt */}
          {/* scroll-mt-28 => när vi navigerar till #kontakt hamnar rubriken nedanför nav-baren */}
          <section id="kontakt" className="scroll-mt-28">
            <ContactSection
              email={t("contact.email")}
              telephoneTimes={t("contact.telephoneTimes")}
              timeStamp={t("contact.timeStamp")}
              more={t("contact.more")}
            />
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24">
            <FAQSection faq={faqItems} />
          </section>

          {/* Om oss */}
          <section id="om-oss" className="scroll-mt-20">
            <AboutSection about={aboutItems} />
          </section>
        </div>
      </div>
    </div>
  );
}
