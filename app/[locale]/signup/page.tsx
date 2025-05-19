import SignupForm from "@/components/forms/SignupForm";

export default function Signup() {
  return (
    <div className="page-container bg-bg">
      <main className="flex-1 flex flex-col h-screen items-center justify-center py-16 px-4">
        <SignupForm />
      </main>
    </div>
  );
}
