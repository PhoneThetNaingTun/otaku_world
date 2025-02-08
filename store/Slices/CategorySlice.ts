import { Category, categorySlice } from "@/types/category";
import { BaseOption } from "@/types/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: categorySlice = {
  categories: [],
  categoryLoading: false,
};

export const GetCategories = createAsyncThunk(
  "Category/GetCategories",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    thunkapi.dispatch(setCategoryLoading(true));
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `https://otaku-server-o9rc.onrender.com/api/categories/get-categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataFromServer = await response.json();
      const { categories } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess({});

        thunkapi.dispatch(setCategories(categories));
      } else {
        onError && onError({});
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get categories");
    } finally {
      thunkapi.dispatch(setCategoryLoading(false));
    }
  }
);

const CategorySlice = createSlice({
  name: "CategorySLice",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setCategoryLoading: (state, action: PayloadAction<boolean>) => {
      state.categoryLoading = action.payload;
    },
  },
});

export const { setCategories, setCategoryLoading } = CategorySlice.actions;
export default CategorySlice.reducer;
