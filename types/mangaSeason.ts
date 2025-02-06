import { Season } from "./season";

export type MangaSeason = {
  id: string;
  mangaId: string;
  seasonId: string;
  createdAt: Date;
  updatedAt: Date;
  season: Season;
};

export interface mangaSeasonSlice {
  mangaSeasons: MangaSeason[];
  mangaSeasonLoading: boolean;
}
