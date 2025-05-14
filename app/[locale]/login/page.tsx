import SigninForm from "@/components/forms/SigninForm";

export default function Login() {
  return (
    <div className="page-container bg-bg">
      <main className="flex-1 flex flex-col items-center h-screen justify-center py-16 px-4">
        <SigninForm />
      </main>
    </div>
  );
}
