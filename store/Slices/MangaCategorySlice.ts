import { MangaCategory, mangaCategorySlice } from "@/types/mangaCategories";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: mangaCategorySlice = {
  mangaCategories: [],
  mangaCategoryLoading: false,
};

const MangaCategorySlice = createSlice({
  name: "MangaCategorySlice",
  initialState,
  reducers: {
    setMangaCategories: (state, action: PayloadAction<MangaCategory[]>) => {
      state.mangaCategories = action.payload;
    },
    setMangaCategoryLoading: (state, action: PayloadAction<boolean>) => {
      state.mangaCategoryLoading = action.payload;
    },
  },
});

export const { setMangaCategories, setMangaCategoryLoading } =
  MangaCategorySlice.actions;
export default MangaCategorySlice.reducer;
