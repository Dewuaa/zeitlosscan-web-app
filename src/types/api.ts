// Shared API response types matching the Prisma models

export interface ApiSeries {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverUrl?: string;
  status: "ONGOING" | "COMPLETED" | "HIATUS" | "CANCELLED";
  source: "ORIGINAL" | "MANGADEX";
  genres: string[];
  author?: string;
  artist?: string;
  createdAt: string;
  updatedAt: string;
  _count?: { chapters: number };
  chapters?: ApiChapterSummary[];
}

export interface ApiChapterSummary {
  id: string;
  number: number;
  title?: string;
  language: string;
  publishedAt: string;
}

export interface ApiPage {
  pageNumber: number;
  imageUrl: string;
  width?: number;
  height?: number;
}

export interface ApiChapter {
  id: string;
  seriesId: string;
  number: number;
  title?: string;
  language: string;
  publishedAt: string;
  pages: ApiPage[];
  series: {
    id: string;
    title: string;
    slug: string;
    coverUrl?: string;
  };
}

export interface ApiReaderResponse {
  chapter: ApiChapter;
  prev: { id: string; number: number } | null;
  next: { id: string; number: number } | null;
}

export interface ApiSeriesListResponse {
  series: ApiSeries[];
  total: number;
  page: number;
  pages: number;
}
