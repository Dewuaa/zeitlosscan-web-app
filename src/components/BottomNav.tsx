import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Hide on immersive pages to maintain focus
  if (pathname.startsWith("/read/") || pathname.startsWith("/manga/")) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[68px] items-center justify-around border-t border-white/10 bg-black/90 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl md:hidden">
      <Link
        to="/"
        aria-label="Go to home"
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${isActive("/") ? "border-red-500/40 bg-red-600 text-white shadow-[0_8px_24px_rgba(229,9,20,0.35)]" : "border-white/10 bg-white/[0.02] text-zinc-500"}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </Link>

      <Link
        to="/browse"
        aria-label="Browse series"
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${isActive("/browse") ? "border-red-500/40 bg-red-600 text-white shadow-[0_8px_24px_rgba(229,9,20,0.35)]" : "border-white/10 bg-white/[0.02] text-zinc-500"}`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <circle cx="17" cy="17" r="1.5" fill="currentColor"></circle>
        </svg>
      </Link>

      <button
        type="button"
        aria-label="Open search"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-zinc-500"
        onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6h2v14H4zm14-2H6v2h12zm0 14H6v2h12zm2-14h2v14h-2V4z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Open info"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-zinc-500"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6zm-1-9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            opacity="0.8"
          />
        </svg>
      </button>
    </nav>
  );
};

export default BottomNav;
