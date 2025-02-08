import { MangaSeason, mangaSeasonSlice } from "@/types/mangaSeason";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: mangaSeasonSlice = {
  mangaSeasons: [],
  mangaSeasonLoading: false,
};

const MangaSeasonSlice = createSlice({
  name: "MangaSeasonSlice",
  initialState,
  reducers: {
    setMangaSeasons: (state, action: PayloadAction<MangaSeason[]>) => {
      state.mangaSeasons = action.payload;
    },
    setMangaSeasonLoading: (state, action: PayloadAction<boolean>) => {
      state.mangaSeasonLoading = action.payload;
    },
  },
});

export const { setMangaSeasons, setMangaSeasonLoading } =
  MangaSeasonSlice.actions;
export default MangaSeasonSlice.reducer;
