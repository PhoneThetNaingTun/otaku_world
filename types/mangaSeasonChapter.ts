import { Chapter } from "./chapter";
import { BaseOption } from "./util";

export type MangaSeasonChapter = {
  id: string;
  mangaSeasonId: string;
  chapterId: string;
  chapter: Chapter;
  pageCount?: string;
};

export interface mangaSeasonChapterSlice {
  mangaSeasonChapters: MangaSeasonChapter[];
  mangaSeasonChapterLoading: boolean;
}

export interface GetMangaSeasonChapterPayload extends BaseOption {
  mangaSeasonId: string;
}
