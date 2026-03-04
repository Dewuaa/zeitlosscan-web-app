import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { seriesApi, chaptersApi, uploadApi } from "../../services/api";
import {
  MdUploadFile,
  MdDragIndicator,
  MdDelete,
  MdCheckCircle,
} from "react-icons/md";

interface Series {
  id: string;
  title: string;
  slug: string;
}
interface PageFile {
  file: File;
  preview: string;
  name: string;
}

type UploadStatus = "idle" | "creating" | "uploading" | "done" | "error";

export default function ChapterUpload() {
  const [series, setSeries] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [language, setLanguage] = useState("en");
  const [pages, setPages] = useState<PageFile[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    seriesApi
      .list(1, 100)
      .then((r) => setSeries(r.data.series))
      .catch(() => {});
  }, []);

  const onDrop = useCallback((accepted: File[]) => {
    const sorted = [...accepted].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true }),
    );
    const newPages = sorted.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setPages((prev) => [...prev, ...newPages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: true,
  });

  function removePage(index: number) {
    setPages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function movePage(from: number, to: number) {
    setPages((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  }

  async function handleUpload() {
    if (!selectedSeries) {
      setError("Select a series");
      return;
    }
    if (!chapterNumber) {
      setError("Enter chapter number");
      return;
    }
    if (pages.length === 0) {
      setError("Add at least one page");
      return;
    }

    setError("");
    setStatus("creating");
    setProgress(0);

    try {
      // 1. Create chapter record
      const { data: chapter } = await chaptersApi.create({
        seriesId: selectedSeries,
        number: parseFloat(chapterNumber),
        title: chapterTitle || undefined,
        language,
      });

      // 2. Upload pages
      setStatus("uploading");
      const form = new FormData();
      pages.forEach((p) => form.append("pages", p.file));

      await uploadApi.pages(chapter.id, form, (pct) => setProgress(pct));

      setStatus("done");
      // Reset
      setPages([]);
      setChapterNumber("");
      setChapterTitle("");
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Upload failed",
      );
      setStatus("error");
    }
  }

  function reset() {
    pages.forEach((p) => URL.revokeObjectURL(p.preview));
    setPages([]);
    setStatus("idle");
    setProgress(0);
    setError("");
    setChapterNumber("");
    setChapterTitle("");
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <MdCheckCircle className="text-6xl text-green-400" />
        <h3 className="text-2xl font-bold text-white">Chapter uploaded!</h3>
        <p className="text-zinc-400 text-sm">
          {pages.length === 0 ? "Pages have been processed." : ""}
        </p>
        <button
          onClick={reset}
          className="mt-4 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Upload Another Chapter
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Upload Chapter</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Upload translated pages for a new chapter
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Chapter info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-medium">Chapter Info</h3>

        <div>
          <label className="text-sm text-zinc-400 block mb-1">
            Series <span className="text-red-400">*</span>
          </label>
          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
          >
            <option value="">Select a series…</option>
            {series.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm text-zinc-400 block mb-1">
              Chapter # <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              placeholder="e.g. 12 or 12.5"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">
              Title (optional)
            </label>
            <input
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="Chapter title…"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-violet-500 transition"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="pt">Portuguese</option>
              <option value="id">Indonesian</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drop zone */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-medium">Pages ({pages.length})</h3>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
            isDragActive
              ? "border-violet-500 bg-violet-500/5"
              : "border-zinc-700 hover:border-zinc-500"
          }`}
        >
          <input {...getInputProps()} />
          <MdUploadFile className="text-4xl text-zinc-500 mx-auto mb-2" />
          <p className="text-zinc-300 font-medium">
            {isDragActive ? "Drop pages here…" : "Drag & drop pages here"}
          </p>
          <p className="text-zinc-500 text-sm mt-1">
            or click to browse · JPG, PNG, WebP · files auto-sort by name
          </p>
        </div>

        {/* Page preview grid */}
        {pages.length > 0 && (
          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-72 overflow-y-auto pr-1">
            {pages.map((p, i) => (
              <div key={p.preview} className="relative group">
                <img
                  src={p.preview}
                  alt={`Page ${i + 1}`}
                  className="w-full aspect-[2/3] object-cover rounded-lg border border-zinc-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-lg flex flex-col items-center justify-center gap-1">
                  <span className="text-white text-xs font-bold">#{i + 1}</span>
                  <div className="flex gap-1">
                    {i > 0 && (
                      <button
                        onClick={() => movePage(i, i - 1)}
                        className="p-1 bg-zinc-700 rounded text-white hover:bg-zinc-600 transition"
                      >
                        <MdDragIndicator className="rotate-90 text-xs" />
                      </button>
                    )}
                    <button
                      onClick={() => removePage(i)}
                      className="p-1 bg-red-600 rounded text-white hover:bg-red-700 transition"
                    >
                      <MdDelete className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload progress */}
      {(status === "uploading" || status === "creating") && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-300">
              {status === "creating"
                ? "Creating chapter…"
                : `Uploading pages… ${progress}%`}
            </span>
            <span className="text-zinc-400">{progress}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-violet-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={status === "uploading" || status === "creating"}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-medium rounded-lg py-3 transition"
      >
        {status === "uploading"
          ? `Uploading… ${progress}%`
          : status === "creating"
            ? "Creating chapter…"
            : `Upload Chapter (${pages.length} pages)`}
      </button>
    </div>
  );
}
