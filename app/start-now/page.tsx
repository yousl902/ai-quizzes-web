import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/auth";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white min-h-screen flex flex-col items-center justify-center">
      <QuizCard />
      <form>
        <Button
          formAction={logout}
          className="bg-black text-white mt-5 hover:bg-gray-800"
        >
          Logout
        </Button>
      </form>
    </div>
  );
}
