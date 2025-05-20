import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="bg-bg min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl shadow-xl p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-10 bg-btn-next rounded w-full" />
        </div>
      </Card>
    </div>
  );
}
