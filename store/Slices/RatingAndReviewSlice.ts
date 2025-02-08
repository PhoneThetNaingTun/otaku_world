import {
  DeleteRatingAndReviewPayload,
  GetRatingAndReviewPayload,
  NewRatingAndReviewPayload,
  Rating_Review,
  ratingAndReviewSlice,
} from "@/types/ratingAndReviews";
import { BaseOption } from "@/types/util";
import { removeTokens } from "@/utils/removeTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { router } from "expo-router";

const initialState: ratingAndReviewSlice = {
  ratingAndReviews: [],
  ratingAndReviewLoading: false,
};

export const CreateRatingAndReview = createAsyncThunk(
  "RatingAndReviewSlice/CreateRatingAndReview",
  async (payload: NewRatingAndReviewPayload, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setRatingAndReviewLoading(true));
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        "https://otaku-server-o9rc.onrender.com/api/rating-review/create-rating-and-review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, newRatingAndReview, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(addRatingAndReview(newRatingAndReview));
      } else if (response.status === 401) {
        router.push("/auth/login/login");
        removeTokens();
        onError && onError(error);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create rating and review");
    } finally {
      thunkapi.dispatch(setRatingAndReviewLoading(false));
    }
  }
);

export const GetRatingAndReviews = createAsyncThunk(
  "RatingAndReviewSlice/GetRatingAndReviews",
  async (payload: GetRatingAndReviewPayload, thunkapi) => {
    const { onSuccess, onError, mangaId } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setRatingAndReviewLoading(true));
    try {
      const response = await fetch(
        `https://otaku-server-o9rc.onrender.com/api/rating-review/get-rating-and-review-by-manga?mangaId=${mangaId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { ratingAndReviews } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setRatingAndReviews(ratingAndReviews));
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get manga");
    } finally {
      thunkapi.dispatch(setRatingAndReviewLoading(false));
    }
  }
);

export const GetRatingAndReviewByUserId = createAsyncThunk(
  "RatingAndReviewSlice/GetRatingAndReviewByUserId",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    const token = await AsyncStorage.getItem("token");
    thunkapi.dispatch(setRatingAndReviewLoading(true));
    try {
      const response = await fetch(
        `https://otaku-server-o9rc.onrender.com/api/rating-review/get-rating-and-review-by-user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { ratingAndReviews } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});
        thunkapi.dispatch(setRatingAndReviews(ratingAndReviews));
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get manga");
    } finally {
      thunkapi.dispatch(setRatingAndReviewLoading(false));
    }
  }
);

export const DeleteRatingAndReveiw = createAsyncThunk(
  "RatingAndReviewSlice/DeleteRatingAndReveiw",
  async (payload: DeleteRatingAndReviewPayload, thunkapi) => {
    const { onSuccess, onError, id } = payload;
    thunkapi.dispatch(setRatingAndReviewLoading(true));
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `https://otaku-server-o9rc.onrender.com/api/rating-review/delete-rating-and-review`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { message, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(removeRatingAndReview(id));
      } else if (response.status === 401) {
        router.push("/auth/login/login");
        removeTokens();
        onError && onError(error);
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete manga");
    } finally {
      thunkapi.dispatch(setRatingAndReviewLoading(false));
    }
  }
);

const RatingAndReviewSlice = createSlice({
  name: "RatingAndReviewSlice",
  initialState,
  reducers: {
    setRatingAndReviews: (state, action: PayloadAction<Rating_Review[]>) => {
      state.ratingAndReviews = action.payload;
    },
    addRatingAndReview: (state, action: PayloadAction<Rating_Review>) => {
      state.ratingAndReviews.push(action.payload);
    },
    removeRatingAndReview: (state, action: PayloadAction<string>) => {
      state.ratingAndReviews = state.ratingAndReviews.filter(
        (ratingAndReview) => ratingAndReview.id !== action.payload
      );
    },
    setRatingAndReviewLoading: (state, action: PayloadAction<boolean>) => {
      state.ratingAndReviewLoading = action.payload;
    },
  },
});

export const {
  setRatingAndReviews,
  addRatingAndReview,
  removeRatingAndReview,
  setRatingAndReviewLoading,
} = RatingAndReviewSlice.actions;
export default RatingAndReviewSlice.reducer;
