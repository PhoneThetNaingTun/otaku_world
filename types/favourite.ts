import { Manga } from "./manga";
import { BaseOption } from "./util";

export type Favourite = {
  id: string;
  mangaId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  manga: Manga;
};

export interface favouriteSlice {
  favouriteMangas: Favourite[];
  favouriteLoading: boolean;
}

export interface FavouriteMangaPayload extends BaseOption {
  mangaId: string;
}
