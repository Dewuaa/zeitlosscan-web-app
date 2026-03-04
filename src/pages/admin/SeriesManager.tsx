import { useEffect, useState, FormEvent } from "react";
import { seriesApi } from "../../services/api";
import { MdAdd, MdDelete, MdEdit, MdClose } from "react-icons/md";

interface Series {
  id: string;
  title: string;
  slug: string;
  status: string;
  coverUrl?: string;
  author?: string;
  _count?: { chapters: number };
}

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Isekai",
  "Martial Arts",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];
const STATUSES = ["ONGOING", "COMPLETED", "HIATUS", "CANCELLED"];

export default function SeriesManager() {
  const [series, setSeries] = useState<Series[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [artist, setArtist] = useState("");
  const [status, setStatus] = useState("ONGOING");
  const [genres, setGenres] = useState<string[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");

  useEffect(() => {
    fetchSeries();
  }, []);

  async function fetchSeries() {
    setLoading(true);
    try {
      const { data } = await seriesApi.list(1, 50);
      setSeries(data.series);
      setTotal(data.total);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setAuthor("");
    setArtist("");
    setStatus("ONGOING");
    setGenres([]);
    setCover(null);
    setCoverPreview("");
    setError("");
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCover(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function toggleGenre(g: string) {
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const form = new FormData();
      form.append("title", title);
      if (description) form.append("description", description);
      if (author) form.append("author", author);
      if (artist) form.append("artist", artist);
      form.append("status", status);
      genres.forEach((g) => form.append("genres[]", g));
      if (cover) form.append("cover", cover);

      await seriesApi.create(form);
      await fetchSeries();
      resetForm();
      setShowForm(false);
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Failed to create series",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (
      !confirm(
        `Delete "${title}"? This will also delete all its chapters and pages.`,
      )
    )
      return;
    try {
      await seriesApi.delete(id);
      setSeries((prev) => prev.filter((s) => s.id !== id));
      setTotal((t) => t - 1);
    } catch {
      alert("Failed to delete series");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Series</h2>
          <p className="text-zinc-400 text-sm mt-1">{total} series total</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition"
        >
          <MdAdd className="text-lg" /> New Series
        </button>
      </div>

      {/* Series list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : series.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          No series yet. Create your first one!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {series.map((s) => (
            <div
              key={s.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4"
            >
              {s.coverUrl ? (
                <img
                  src={s.coverUrl}
                  alt={s.title}
                  className="w-12 h-16 object-cover rounded-lg shrink-0"
                />
              ) : (
                <div className="w-12 h-16 bg-zinc-800 rounded-lg shrink-0 flex items-center justify-center text-zinc-600 text-xs">
                  No Cover
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{s.title}</p>
                <p className="text-zinc-400 text-sm">
                  {s.author ?? "Unknown author"} · {s._count?.chapters ?? 0}{" "}
                  chapters
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                  s.status === "ONGOING"
                    ? "bg-green-500/10 text-green-400"
                    : s.status === "COMPLETED"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-zinc-500/10 text-zinc-400"
                }`}
              >
                {s.status}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition">
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDelete(s.id, s.title)}
                  className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Series Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="text-white font-semibold text-lg">New Series</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-zinc-400 hover:text-white transition"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              {/* Cover upload */}
              <div className="flex gap-4 items-start">
                <div>
                  <label className="text-sm text-zinc-400 block mb-2">
                    Cover Image
                  </label>
                  <label className="cursor-pointer block">
                    <div
                      className={`w-28 h-40 rounded-lg border-2 border-dashed border-zinc-700 hover:border-violet-500 transition flex items-center justify-center overflow-hidden ${coverPreview ? "border-solid border-zinc-700" : ""}`}
                    >
                      {coverPreview ? (
                        <img
                          src={coverPreview}
                          alt="cover"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-zinc-500 text-xs text-center p-2">
                          Click to upload cover
                        </span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverChange}
                    />
                  </label>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-sm text-zinc-400 block mb-1">
                      Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-zinc-400 block mb-1">
                        Author
                      </label>
                      <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 block mb-1">
                        Artist
                      </label>
                      <input
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-400 block mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-400 block mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-zinc-400 block mb-2">
                  Genres
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => toggleGenre(g)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition ${genres.includes(g) ? "bg-violet-600 border-violet-600 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg py-2.5 text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition"
                >
                  {saving ? "Creating…" : "Create Series"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
