import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const AboutSection = ({ about }: { about: string[] }) => {
  const t = useTranslations("info");
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-20 w-full lg:w-2/3"
    >
      <h2 className="text-2xl font-bold mb-6 text-info-subheader flex items-center gap-2">
        <Users className="w-6 h-6" />
        {t("about.title")}
      </h2>
      <div className="bg-info-sections backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <div className="prose max-w-none">
          {about.map((item, index) => (
            <p
              key={index}
              className={`text-gray-800 ${index !== 0 ? "mt-4" : ""}`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
