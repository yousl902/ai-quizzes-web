import SignupForm from "@/components/forms/SignupForm";

export default function Signup() {
  return (
    <div className="page-container bg-gradient-to-br from-yellow-100 via-yellow-50 to-white">
      <main className="flex-1 flex flex-col h-screen items-center justify-center py-16 px-4">
        <SignupForm />
      </main>
    </div>
  );
}
