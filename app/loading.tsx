export default function LoadingPage() {
  return (
    <div className="page-container bg-gradient-to-br from-yellow-100 via bg-yellow-50 to-white">
      <main className="flex-1 flex flex-col items-center h-screen justify-center">
        <div className="w-40 h-40 animate-spin border-yellow-300 border-t-8 rounded-full"></div>
        <div className="text-center mt-15 text-2xl font-bold">Loading page</div>
      </main>
    </div>
  );
}
