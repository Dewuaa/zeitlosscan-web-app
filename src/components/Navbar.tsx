import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiGrid, FiBook, FiUser } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const isImmersiveMobile =
    location.pathname.startsWith("/manga/") ||
    location.pathname.startsWith("/read/");
  const pillClass =
    "group inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white";

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
            <FiSearch size={18} className="transition-transform group-hover:scale-110" />
          </button>

          <Link to="/browse" className={`${pillClass} max-md:hidden`}>
            <FiGrid size={18} className="transition-transform group-hover:scale-110" />
            <span>Series</span>
          </Link>

          <button
            type="button"
            aria-label="Open library"
            className={`${pillClass} max-md:hidden`}
          >
            <FiBook size={18} className="transition-transform group-hover:scale-110" />
            <span>Library</span>
          </button>

          <button
            type="button"
            aria-label="Sign in"
            className={`${pillClass} max-md:hidden`}
          >
            <FiUser size={18} className="transition-transform group-hover:scale-110" />
            <span>Sign in</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
