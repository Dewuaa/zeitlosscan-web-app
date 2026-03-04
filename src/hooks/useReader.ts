import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { ApiReaderResponse } from "../types/api";

export function useReader(chapterId: string | undefined) {
  const [data, setData] = useState<ApiReaderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chapterId) return;
    setLoading(true);
    api
      .get(`/reader/${chapterId}`)
      .then((r) => setData(r.data))
      .catch(() => setError("Chapter not found"))
      .finally(() => setLoading(false));
  }, [chapterId]);

  return { data, loading, error };
}
