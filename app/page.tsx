import Link from "next/link";
import { CirclePlay } from "lucide-react";
import siteInfo from "@/siteConfig";

// this comp should take as props the title and description of the app and the logo
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
          <h1 className="text-5xl mt-10 md:text-7xl font-bold text-center mb-2 tracking-tight">
            {siteInfo.title}
          </h1>
          <p className="text-sm text-center text-gray-500 mb-12">
            powered by Mindswarm
          </p>

          {/* "Start Now"-cirkelknapp */}
          <Link
            href="/start-now"
            className="mb-16 bg-yellow-500 text-white rounded-full flex items-center justify-center w-40 h-40 md:w-56 md:h-56
                       hover:scale-110 transition-transform duration-300"
          >
            <div className="flex flex-col items-center justify-center">
              <CirclePlay className="h-16 w-16 md:h-24 md:w-24" />
              <span className="font-semibold text-lg md:text-xl mt-2">
                Start Now
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {/* Kontakt */}
            <Link
              href="/info#kontakt"
              className="bg-white rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-2">Kontakt</h3>
              <p className="text-gray-600">
                Tveka inte att höra av dig till oss om du har frågor eller funderingar.
              </p>
            </Link>

            {/* FAQ */}
            <Link
              href="/info#faq"
              className="bg-white rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-2">FAQ</h3>
              <p className="text-gray-600">
                Kolla in vår FAQ-sektion för svar på vanliga frågor och funderingar.
              </p>
            </Link>

            {/* Om oss */}
            <Link
              href="/info#om-oss"
              className="bg-white rounded-xl p-6 shadow-md 
                         hover:shadow-lg hover:scale-105 transition-all duration-300 block"
            >
              <h3 className="text-xl font-semibold mb-2">Om oss</h3>
              <p className="text-gray-600">
                Vi är ett team av passionerade individer som gör lärande roligt och effektivt.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
