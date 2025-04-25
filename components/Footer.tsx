export default function Footer({ title }: { title: string }) {
  return (
    <footer className="bg-gray-100 text-center py-4">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {title}. All rights reserved.
      </p>
    </footer>
  );
}
