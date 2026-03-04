import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001/api",
  withCredentials: false,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("zl_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("zl_token");
      localStorage.removeItem("zl_user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  },
);

// ── Auth ──────────────────────────────────────────────
export const authApi = {
  register: (data: { email: string; username: string; password: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
};

// ── Series ───────────────────────────────────────────
export const seriesApi = {
  list: (page = 1, limit = 20) =>
    api.get("/series", { params: { page, limit } }),
  get: (slug: string) => api.get(`/series/${slug}`),
  create: (form: FormData) =>
    api.post("/series", form, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: string, form: FormData) =>
    api.patch(`/series/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: string) => api.delete(`/series/${id}`),
};

// ── Chapters ─────────────────────────────────────────
export const chaptersApi = {
  create: (data: {
    seriesId: string;
    number: number;
    title?: string;
    language?: string;
  }) => api.post("/chapters", data),
  delete: (id: string) => api.delete(`/chapters/${id}`),
};

// ── Upload ───────────────────────────────────────────
export const uploadApi = {
  pages: (
    chapterId: string,
    form: FormData,
    onProgress?: (pct: number) => void,
  ) =>
    api.post(`/upload/pages/${chapterId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total)
          onProgress(Math.round((e.loaded * 100) / e.total));
      },
    }),
  deletePages: (chapterId: string) => api.delete(`/upload/pages/${chapterId}`),
};
