import ForgotPasswordForm from "@/components/forms/ForgatPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="page-container bg-bg">
      <main className="flex-1 flex flex-col items-center h-screen justify-center py-16 px-4">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
