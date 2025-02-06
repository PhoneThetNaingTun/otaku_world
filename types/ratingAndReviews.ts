import { Manga } from "./manga";
import { User } from "./user";
import { BaseOption } from "./util";

export type Rating_Review = {
  id: string;
  rating: number;
  review: string;
  userId: string;
  mangaId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  manga?: Manga;
};

export interface ratingAndReviewSlice {
  ratingAndReviews: Rating_Review[];
  ratingAndReviewLoading: boolean;
}
export interface GetRatingAndReviewPayload extends BaseOption {
  mangaId: string;
}

export interface NewRatingAndReviewPayload extends BaseOption {
  rating?: number;
  review?: string;
  mangaId: string;
  userId?: string;
}

export interface DeleteRatingAndReviewPayload extends BaseOption {
  id: string;
}
