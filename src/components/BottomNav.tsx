import { Link, useLocation } from "react-router-dom";
import { FiHome, FiGrid, FiSearch, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

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

  const navItems = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Series", path: "/browse", icon: FiGrid },
    {
      name: "Search",
      action: () => window.dispatchEvent(new Event("open-command-palette")),
      icon: FiSearch,
    },
    { name: "Profile", action: () => {}, icon: FiUser },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[68px] items-center justify-around border-t border-white/10 bg-black/90 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.path ? isActive(item.path) : false;

        const content = (
          <>
            {active && (
              <motion.div
                layoutId="bottom-nav-active"
                className="absolute inset-0 rounded-xl border border-red-500/40 bg-red-600 shadow-[0_8px_24px_rgba(229,9,20,0.35)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon
              size={20}
              className={`relative z-10 transition-colors ${active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
            />
          </>
        );

        const baseClass = "group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]";

        if (item.path) {
          return (
            <Link
              key={item.name}
              to={item.path}
              aria-label={`Go to ${item.name}`}
              className={baseClass}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={item.name}
            type="button"
            aria-label={`Open ${item.name}`}
            onClick={item.action}
            className={baseClass}
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
