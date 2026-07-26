import AuditForm from "./components/AuditForm";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-32 -translate-y-32 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-700/10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-32 translate-y-32 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-700/10" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
        <AuditForm />
      </div>
    </main>
  );
}

export default App;
