import NavBar from "@/components/Navbar";
import Link from "next/link";
import { CirclePlay } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
          <h1 className="text-5xl mt-10 md:text-7xl font-bold text-center mb-2 tracking-tight">
            HögskoleprovetQuizes
          </h1>
          <p className="text-sm text-center text-gray-500 mb-12">
            powered by Mindswarm
          </p>

          {/* Länk till /start-now (ex) */}
          <Link
            href="/start-now"
            className="mb-16 bg-yellow-500 hover:scale-110 transition-transform duration-500
                      text-white rounded-full flex items-center justify-center w-40 h-40 md:w-56 md:h-56"
          >
            <div className="flex flex-col items-center justify-center">
              <CirclePlay className="h-16 w-16 md:h-24 md:w-24" />
              <span className="font-semibold text-lg md:text-xl mt-2">
                Start Now
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Upload PDFs</h3>
              <p className="text-gray-600">
                Easy upload of your study materials in PDF format.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Generate Quizzes</h3>
              <p className="text-gray-600">
                Our AI creates customized quizzes from your content.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Learn Efficiently</h3>
              <p className="text-gray-600">
                Test your knowledge and improve your retention.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-600 bg-white border-t">
        <p>© 2025 MindSwarm. All rights reserved.</p>
      </footer>
    </div>
  );
}
