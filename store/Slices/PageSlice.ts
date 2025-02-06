import { GetPagePayload, Page, pageSlice } from "@/types/page";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: pageSlice = {
  pageLoading: false,
  pages: [],
};

export const GetPages = createAsyncThunk(
  "PageSlice/GetPage",
  async (payload: GetPagePayload, thunkapi) => {
    const { onSuccess, onError, mangaSeasonChapterId } = payload;
    thunkapi.dispatch(setPageLoading(true));
    try {
      const reaponse = await fetch(
        `http://192.168.99.96:8000/api/pages/get-pages?mangaSeasonChapterId=${mangaSeasonChapterId}`
      );
      const dataFromServer = await reaponse.json();
      const { pages } = dataFromServer;
      if (reaponse.ok) {
        thunkapi.dispatch(setPages(pages));
        onSuccess && onSuccess({});
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error");
    } finally {
      thunkapi.dispatch(setPageLoading(false));
    }
  }
);

const PageSlice = createSlice({
  name: "PageSlice",
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<Page[]>) => {
      state.pages = action.payload;
    },
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },
  },
});

export const { setPages, setPageLoading } = PageSlice.actions;
export default PageSlice.reducer;
