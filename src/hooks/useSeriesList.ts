import { useEffect, useState } from "react";
import { seriesApi } from "../services/api";
import type { ApiSeries, ApiSeriesListResponse } from "../types/api";

export function useSeriesList(page = 1, limit = 50) {
  const [data, setData] = useState<ApiSeriesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    seriesApi
      .list(page, limit)
      .then((r) => setData(r.data))
      .catch(() => setError("Failed to load series"))
      .finally(() => setLoading(false));
  }, [page, limit]);

  return {
    series: data?.series ?? ([] as ApiSeries[]),
    total: data?.total ?? 0,
    loading,
    error,
  };
}
