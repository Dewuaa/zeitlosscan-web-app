import { useEffect, useState } from "react";
import { seriesApi } from "../services/api";
import type { ApiSeries } from "../types/api";

export function useSeriesDetail(slug: string | undefined) {
  const [series, setSeries] = useState<ApiSeries | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    seriesApi
      .get(slug)
      .then((r) => setSeries(r.data))
      .catch(() => setError("Series not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  return { series, loading, error };
}
