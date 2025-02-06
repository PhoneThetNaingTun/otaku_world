import {
  GetMangaByCategoryPayload,
  GetMangaPayload,
  Manga,
  mangaSlice,
  SearchMangaPayload,
} from "@/types/manga";
import { BaseOption } from "@/types/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setMangaSeasons } from "./MangaSeasonSlice";
import { setMangaCategories } from "./MangaCategorySlice";

const initialState: mangaSlice = {
  mangas: [],
  mangaLoading: false,
  latestMangas: [],
  mangaDetail: {} as Manga,
  mostRatedMangas: [],
  searchMangas: [],
  searchMangaLoading: false,
};

export const GetMangas = createAsyncThunk(
  "MangaSlice/GetMangas",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `http://192.168.99.96:8000/api/mangas/get-mangas`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { mangas } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setMangas(mangas));
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get mangas");
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);

export const GetLatestMangas = createAsyncThunk(
  "MangaSlice/GetMangas",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `http://192.168.99.96:8000/api/mangas/get-latest-mangas`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { mangas } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setLatestMangas(mangas));
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get mangas");
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);

export const GetMostRatedMangas = createAsyncThunk(
  "MangaSlice/GetMostRatedMangas",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `http://192.168.99.96:8000/api/mangas/get-most-rated-mangas`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { mangas } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setMostRatedMangas(mangas));
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get mangas");
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);

export const GetMangaDetail = createAsyncThunk(
  "MangaSlice/GetManga",
  async (payload: GetMangaPayload, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `http://192.168.99.96:8000/api/mangas/get-manga?mangaId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { mangaWithChapters, mangaSeasons, mangaCategories } =
        dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setMangaDetail(mangaWithChapters));

        thunkapi.dispatch(setMangaSeasons(mangaSeasons));
        thunkapi.dispatch(setMangaCategories(mangaCategories));
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get manga");
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);

export const GetMangaByCategory = createAsyncThunk(
  "MangaSlice/GetMangaByCategory",
  async (payload: GetMangaByCategoryPayload, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setMangaLoading(true));
    try {
      const response = await fetch(
        `http://192.168.99.96:8000/api/mangas/get-manga-by-category?id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { mangas } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setMangas(mangas));
      } else {
        onError && onError({});
      }
    } catch (error) {
      throw new Error("Failed to get mangas");
    } finally {
      thunkapi.dispatch(setMangaLoading(false));
    }
  }
);

export const GetMangaBySearch = createAsyncThunk(
  "MangaSlice/GetMangaBySearch",
  async (payload: SearchMangaPayload, thunkapi) => {
    const { onSuccess, onError, search } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setSearchMangaLoading(true));
    try {
      const response = await fetch(
        `http://192.168.99.96:8000/api/mangas/get-mangas-by-search?search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { mangas, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setSearchMangas(mangas));
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get mangas");
    } finally {
      thunkapi.dispatch(setSearchMangaLoading(false));
    }
  }
);

const MangaSlice = createSlice({
  name: "MangaSlice",
  initialState,
  reducers: {
    setMangas: (state, action: PayloadAction<Manga[]>) => {
      state.mangas = action.payload;
    },
    setMangaLoading: (state, action: PayloadAction<boolean>) => {
      state.mangaLoading = action.payload;
    },
    addManga: (state, action: PayloadAction<Manga>) => {
      state.mangas.push(action.payload);
    },
    setLatestMangas: (state, action: PayloadAction<Manga[]>) => {
      state.latestMangas = action.payload;
    },
    setMangaDetail: (state, action: PayloadAction<Manga>) => {
      state.mangaDetail = action.payload;
    },
    setMostRatedMangas: (state, action: PayloadAction<Manga[]>) => {
      state.mostRatedMangas = action.payload;
    },
    setSearchMangaLoading: (state, action: PayloadAction<boolean>) => {
      state.searchMangaLoading = action.payload;
    },
    setSearchMangas: (state, action: PayloadAction<Manga[]>) => {
      state.searchMangas = action.payload;
    },
  },
});

export const {
  setMangas,
  setMangaLoading,
  addManga,
  setLatestMangas,
  setMangaDetail,
  setMostRatedMangas,
  setSearchMangaLoading,
  setSearchMangas,
} = MangaSlice.actions;
export default MangaSlice.reducer;
