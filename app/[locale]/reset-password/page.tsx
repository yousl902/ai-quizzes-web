import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="page-container bg-bg">
      <main className="flex-1 flex flex-col items-center h-screen justify-center py-16 px-4">
        <ResetPasswordForm />
      </main>
    </div>
  );
}
