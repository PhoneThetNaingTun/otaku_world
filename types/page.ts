import { BaseOption } from "./util";

export type Page = {
  id: string;
  imgUrl: string;
  mangaSeasonChapterId: string;
  createdAt: string;
  updatedAt: string;
};

export interface pageSlice {
  pages: Page[];
  pageLoading: boolean;
}

export interface GetPagePayload extends BaseOption {
  mangaSeasonChapterId: string;
}
