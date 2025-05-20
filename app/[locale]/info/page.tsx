import { ContactSection } from "@/components/InfoPage/ContactSection";
import { FAQSection } from "@/components/InfoPage/FAQSection";
import { AboutSection } from "@/components/InfoPage/AboutSection";
import { getTranslations } from "next-intl/server";

export default async function InfoPage() {
  const t = await getTranslations("info");

  const faqItems = Array.from(Array(Number(t(`FAQ.length`))).keys()).map(
    (item: number) => ({
      question: t(`FAQ.faqItems.${item}.question`),
      answer: t(`FAQ.faqItems.${item}.answer`),
    })
  );
  const aboutItems = Array.from(Array(Number(t(`about.length`))).keys()).map(
    (item: number) => t(`about.${item}`)
  );

  return (
    <div className="min-h-screen bg-bg pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative">
        <h1 className="text-3xl sm:text-4xl font-bold leading-relaxed mb-16 text-center text-quiz-menu-header">
          {t("title")}
        </h1>
        <div className="space-y-20">
          <section id="kontakt" className="scroll-mt-28">
            <ContactSection
              email={t("contact.email")}
              telephoneTimes={t("contact.telephone")}
              timeStamp={t("contact.timeStamp")}
              more={t("contact.more")}
            />
          </section>

          <section id="faq" className="scroll-mt-24">
            <FAQSection faq={faqItems} />
          </section>

          <section id="om-oss" className="scroll-mt-20">
            <AboutSection about={aboutItems} />
          </section>
        </div>
      </div>
    </div>
  );
}
