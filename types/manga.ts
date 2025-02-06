import { Author } from "./author";
import { BaseOption } from "./util";

export type Manga = {
  id: string;
  manga_name: string;
  manga_image: string;
  manga_description: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
  numOfChapter?: number;
  rating?: number;
};

export interface mangaSlice {
  mangas: Manga[];
  latestMangas: Manga[];
  mostRatedMangas: Manga[];
  mangaLoading: boolean;
  mangaDetail: Manga;
  searchMangas: Manga[];
  searchMangaLoading: boolean;
}

export interface GetMangaPayload extends BaseOption {
  id: string;
}

export interface GetMangaByCategoryPayload extends GetMangaPayload {}

export interface SearchMangaPayload extends BaseOption {
  search: string;
}
