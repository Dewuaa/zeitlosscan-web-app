import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isImmersiveMobile =
    location.pathname.startsWith("/manga/") ||
    location.pathname.startsWith("/read/");
  const pillClass =
    "inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-2xl ${isImmersiveMobile ? "max-md:hidden" : ""}`}
    >
      <div className="content-shell flex h-[68px] items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-3">
          <img
            src="/Zeitlos_Logo_Var_1.webp"
            alt="Zeitlos Scan"
            className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
          />
          <span className="text-lg font-extrabold tracking-[-0.02em] text-zinc-100">
            Zeitlos Scan
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open search"
            className={`${pillClass} w-10 justify-center px-0`}
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <Link to="/browse" className={`${pillClass} max-md:hidden`}>
            <svg
              width="20"
              height="20"
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
            </svg>
            <span>Series</span>
          </Link>

          <button
            type="button"
            aria-label="Open library"
            className={`${pillClass} max-md:hidden`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h2v14H4zm14-2H6v2h12zm0 14H6v2h12zm2-14h2v14h-2V4z" />
            </svg>
            <span>Library</span>
          </button>

          <button
            type="button"
            aria-label="Sign in"
            className={`${pillClass} max-md:hidden`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6zm-1-9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span>Sign in</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
