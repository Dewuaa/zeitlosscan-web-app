import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { seriesApi } from "../../services/api";
import { MdMenuBook, MdUploadFile, MdArrowForward } from "react-icons/md";

export default function AdminDashboard() {
  const [seriesCount, setSeriesCount] = useState<number | null>(null);

  useEffect(() => {
    seriesApi
      .list(1, 1)
      .then((r) => setSeriesCount(r.data.total))
      .catch(() => {});
  }, []);

  const cards = [
    {
      label: "Total Series",
      value: seriesCount ?? "—",
      icon: MdMenuBook,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Welcome to the Zeitlos Scanlation Panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center gap-4"
          >
            <div className={`${bg} p-3 rounded-lg`}>
              <Icon className={`text-2xl ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-zinc-400 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/series"
          className="group bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 rounded-xl p-6 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <MdMenuBook className="text-3xl text-violet-400 mb-2" />
              <h3 className="text-white font-semibold">Manage Series</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Create and edit your manga series
              </p>
            </div>
            <MdArrowForward className="text-zinc-600 group-hover:text-violet-400 text-xl transition" />
          </div>
        </Link>

        <Link
          to="/admin/upload"
          className="group bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 rounded-xl p-6 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <MdUploadFile className="text-3xl text-violet-400 mb-2" />
              <h3 className="text-white font-semibold">Upload Chapter</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Upload pages for a new chapter
              </p>
            </div>
            <MdArrowForward className="text-zinc-600 group-hover:text-violet-400 text-xl transition" />
          </div>
        </Link>
      </div>
    </div>
  );
}
