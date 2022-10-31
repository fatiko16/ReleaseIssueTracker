export default function Layout({ children }) {
  return (
    <main className="bg-emerald-700 text-center pt-4 flex flex-col items-center min-h-screen">
      {children}
    </main>
  );
}
