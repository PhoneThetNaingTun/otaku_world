import { UpdateUserPayload, User } from "@/types/user";
import { BaseOption } from "@/types/util";
import { removeTokens } from "@/utils/removeTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { router } from "expo-router";

interface userSlice {
  user: null | User;
  userLoading: boolean;
}
const initialState: userSlice = {
  user: null,
  userLoading: false,
};
export const getUserData = createAsyncThunk(
  "UserSlice/getUserData",
  async (payload: BaseOption, thunkapi) => {
    const { onSuccess, onError } = payload;
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(
          `https://otaku-server-o9rc.onrender.com/api/user/getuser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataFromServer = await response.json();
        if (response.ok) {
          const { user } = dataFromServer;
          onSuccess && onSuccess({});
          thunkapi.dispatch(setUser(user));
        } else {
          alert(dataFromServer.error);
          router.push("/auth/login/login");
          removeTokens();
        }
      } else {
        removeTokens();
        router.push("/auth/login/login");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "UserSlice/UpdateUser",
  async (payload: UpdateUserPayload, thunkapi) => {
    const { onSuccess, onError, name } = payload;
    thunkapi.dispatch(setUserLoading(true));
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        "https://otaku-server-o9rc.onrender.com/api/user/update-user",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const dataFromServer = await response.json();
      const { updatedUser, message, error } = dataFromServer;
      if (response.ok) {
        onSuccess && onSuccess(message);
        thunkapi.dispatch(setUser(updatedUser));
      } else if (response.status == 401) {
        alert(error);
        router.push("/auth/login/login");
        removeTokens();
      } else {
        onError && onError(error);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update user");
    } finally {
      thunkapi.dispatch(setUserLoading(false));
    }
  }
);

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = UserSlice.actions;
export default UserSlice.reducer;
