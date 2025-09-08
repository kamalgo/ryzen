import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./components/ThemeToggle";
import { useEffect } from "react";

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Redirect bare root to /login for clarity
  useEffect(() => {
    if (pathname === "/") navigate("/login");
  }, [pathname, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/70 px-4 py-3 backdrop-blur dark:bg-zinc-900/70">
        <div className="flex items-center gap-2">
          {/* <div className="h-8 w-8 rounded-xl bg-sky-500"></div> */}
          <span className="text-lg font-semibold tracking-tight">FORSTU</span>
          <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">MVP</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <main className="px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FORSTU x KAMAL
      </footer>
    </div>
  );
}
