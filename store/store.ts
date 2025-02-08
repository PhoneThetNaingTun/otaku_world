import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./Slices/userSlice";
import CategorySliceReducer from "./Slices/CategorySlice";
import MangaSliceReducer from "./Slices/MangaSlice";
import MangaCategorySliceReducer from "./Slices/MangaCategorySlice";
import MangaSeasonSliceReducer from "./Slices/MangaSeasonSlice";
import MangaSeasonChapterSliceReducer from "./Slices/MangaSeasonChapter";
import PageSliceReducer from "./Slices/PageSlice";
import RatingAndReviewSliceReducer from "./Slices/RatingAndReviewSlice";
import FavouriteSliceReducer from "./Slices/FavouriteSlice";

export const store = configureStore({
  reducer: {
    User: UserSliceReducer,
    Category: CategorySliceReducer,
    Manga: MangaSliceReducer,
    MangaCategory: MangaCategorySliceReducer,
    MangaSeason: MangaSeasonSliceReducer,
    MangaSeasonChapter: MangaSeasonChapterSliceReducer,
    Page: PageSliceReducer,
    RatingAndReview: RatingAndReviewSliceReducer,
    Favourite: FavouriteSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
