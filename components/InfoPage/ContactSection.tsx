"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export const ContactSection = ({
  email,
  telephoneTimes,
  timeStamp,
  more,
}: {
  email: string;
  telephoneTimes: string;
  timeStamp: string;
  more: string;
}) => {
  const t = useTranslations("info");
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20 w-full lg:w-2/3"
    >
      <h2 className="text-2xl font-bold mb-6 text-info-subheader flex items-center gap-2">
        <Mail className="w-6 h-6" />
        {t("contact.title")}
      </h2>
      <div className="bg-info-sections backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-gray-800">
            <Mail className="w-5 h-5 text-icons" />
            <a
              href={`mailto:${email}`}
              className="text-email hover:text-email-hover transition-colors"
            >
              {email}
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-800">
            <Phone className="w-5 h-5 text-icons" />
            <span>{telephoneTimes}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-800">
            <Clock className="w-5 h-5 text-icons" />
            <span>{timeStamp}</span>
          </p>
          <p className="mt-4 text-gray-800">{more}</p>
        </div>
      </div>
    </motion.section>
  );
};
