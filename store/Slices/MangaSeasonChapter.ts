import {
  GetMangaSeasonChapterPayload,
  MangaSeasonChapter,
  mangaSeasonChapterSlice,
} from "@/types/mangaSeasonChapter";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: mangaSeasonChapterSlice = {
  mangaSeasonChapters: [],
  mangaSeasonChapterLoading: false,
};

export const GetChapters = createAsyncThunk(
  "MangaSeasonSlice/GetChapters",
  async (payload: GetMangaSeasonChapterPayload, thunkapi) => {
    const { onSuccess, onError, mangaSeasonId } = payload;
    thunkapi.dispatch(setMangaSeasonChapterLoading(true));
    try {
      const response = await fetch(
        `https://otaku-server-o9rc.onrender.com/api/chapters/get-chapters?mangaSeasonId=${mangaSeasonId}`
      );
      const dataFromServer = await response.json();
      const { mangaSeasonChapterWithPageCount } = dataFromServer;
      if (response.ok) {
        thunkapi.dispatch(
          setMangaSeasonChapters(mangaSeasonChapterWithPageCount)
        );
        onSuccess && onSuccess({});
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error");
    } finally {
      thunkapi.dispatch(setMangaSeasonChapterLoading(false));
    }
  }
);

const MangaSeasonChapterSlice = createSlice({
  name: "MangaSeasonChapter",
  initialState,
  reducers: {
    setMangaSeasonChapters: (
      state,
      action: PayloadAction<MangaSeasonChapter[]>
    ) => {
      state.mangaSeasonChapters = action.payload;
    },
    setMangaSeasonChapterLoading: (state, action: PayloadAction<boolean>) => {
      state.mangaSeasonChapterLoading = action.payload;
    },
  },
});

export const { setMangaSeasonChapters, setMangaSeasonChapterLoading } =
  MangaSeasonChapterSlice.actions;
export default MangaSeasonChapterSlice.reducer;
