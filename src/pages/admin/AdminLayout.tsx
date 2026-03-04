import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  MdDashboard,
  MdMenuBook,
  MdUploadFile,
  MdLogout,
  MdPerson,
} from "react-icons/md";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: MdDashboard, end: true },
  { to: "/admin/series", label: "Series", icon: MdMenuBook, end: false },
  {
    to: "/admin/upload",
    label: "Upload Chapter",
    icon: MdUploadFile,
    end: false,
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col py-6 px-4">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold text-white">Zeitlos</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Scanlation Panel</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`
              }
            >
              <Icon className="text-lg" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-zinc-800 pt-4 mt-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-400">
            <MdPerson className="text-lg" />
            <div className="min-w-0">
              <p className="text-white truncate">{user?.username}</p>
              <p className="text-xs text-zinc-500 capitalize">
                {user?.role.toLowerCase()}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition"
          >
            <MdLogout className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
