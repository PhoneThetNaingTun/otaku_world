import {
  Favourite,
  FavouriteMangaPayload,
  favouriteSlice,
} from "@/types/favourite";
import { BaseOption } from "@/types/util";
import { removeTokens } from "@/utils/removeTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { router } from "expo-router";

const initialState: favouriteSlice = {
  favouriteMangas: [],
  favouriteLoading: false,
};
export const GetFavManga = createAsyncThunk(
  "MangaSlice/GetFavManga",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `https://otaku-server-o9rc.onrender.com/api/favourite/get-favorite-mangas`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const dataFromServer = await response.json();
      const { favouriteMangas, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setFavouriteMangas(favouriteMangas));
      } else if (response.status === 401) {
        router.push("/auth/login/login");
        removeTokens();
        onError && onError(error);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get mangas");
    }
  }
);

export const ToogleFavManga = createAsyncThunk(
  "MangaSlice/ToogleFavManga",
  async (payload: FavouriteMangaPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `https://otaku-server-o9rc.onrender.com/api/favourite/add-favourite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mangaId: payload.mangaId,
          }),
        }
      );
      const dataFromServer = await response.json();
      const { newFavourite, error, message, deletedFavourite } = dataFromServer;
      if (response.status === 201) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addFavorutieManga(newFavourite));
      } else if (response.status === 200) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(removeFavouriteManga(deletedFavourite));
      } else if (response.status === 401) {
        router.push("/auth/login/login");
        removeTokens();
        onError && onError(error);
      } else {
        onError && onError(error);
      }
    } catch (error) {}
  }
);

const FavouriteSlice = createSlice({
  name: "FavouriteSlice",
  initialState,
  reducers: {
    setFavouriteMangas: (state, action: PayloadAction<Favourite[]>) => {
      state.favouriteMangas = action.payload;
    },
    addFavorutieManga: (state, action: PayloadAction<Favourite>) => {
      state.favouriteMangas.push(action.payload);
    },
    removeFavouriteManga: (state, action: PayloadAction<Favourite>) => {
      state.favouriteMangas = state.favouriteMangas.filter(
        (favourite) => favourite.id !== action.payload.id
      );
    },
  },
});

export const { setFavouriteMangas, addFavorutieManga, removeFavouriteManga } =
  FavouriteSlice.actions;
export default FavouriteSlice.reducer;
