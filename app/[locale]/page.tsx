// import Link from "next/link";
import {Link} from '@/i18n/navigation';
import { CirclePlay } from "lucide-react";
import { getTranslations } from "next-intl/server";
//import siteInfo from "@/configs/sv-static";

// this comp should take as props the title and description of the app and the logo
export default async function Home() {
  const t = await getTranslations("home");
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
          <h1 className="text-5xl mt-10 md:text-7xl font-bold text-center mb-2 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm text-center text-gray-500 mb-12">
            {t("company")}
          </p>
          <StartButton />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
            <Kontakt />
            <FAQ />
            <AboutUs />
          </div>
        </div>
      </main>
    </div>
  );
}

const StartButton = () => {
  return (
    <Link
      href="/quizMenu"
      className="bg-yellow-500 text-orange-50 rounded-full flex items-center justify-center w-40 h-40 md:w-56 md:h-56
               hover:scale-110 transition-transform duration-300 border-4 border-orange-200 hover:border-orange-50 shadow-md"
    >
      <div className="flex flex-col items-center justify-center">
        <CirclePlay className="h-16 w-16 md:h-24 md:w-24" />
        {/* {siteInfo.startButton.showText && (
          <span className="font-semibold text-lg md:text-xl mt-2">
            {siteInfo.startButton.text}
          </span>
        )} */}
      </div>
    </Link>
  );
};

const Kontakt = async () => {
  const t = await getTranslations("home");
  return (
    <Link
      href="/info#kontakt"
      className="bg-white rounded-xl p-6 shadow-md 
               hover:shadow-lg hover:scale-105 transition-all duration-300 block"
    >
      <h3 className="text-xl font-semibold mb-2">{t("contact.title")}</h3>
      <p className="text-gray-600">
        {t("contact.description")}
      </p>
    </Link>
  );
};

const FAQ = async () => {
  const t = await getTranslations("home");
  return (
    <Link
      href="/info#faq"
      className="bg-white rounded-xl p-6 shadow-md 
               hover:shadow-lg hover:scale-105 transition-all duration-300 block"
    >
      <h3 className="text-xl font-semibold mb-2">{t("faq.title")}</h3>
      <p className="text-gray-600">
        {t("faq.description")}
      </p>
    </Link>
  );
};

const AboutUs = async () => {
  const t = await getTranslations("home");
  return (
    <Link
      href="/info#om-oss"
      className="bg-white rounded-xl p-6 shadow-md 
               hover:shadow-lg hover:scale-105 transition-all duration-300 block"
    >
      <h3 className="text-xl font-semibold mb-2">{t("about.title")}</h3>
      <p className="text-gray-600">
        {t("about.description")}
      </p>
    </Link>
  );
};
