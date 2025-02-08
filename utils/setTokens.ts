import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token: string, isLoggedIn: boolean) => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("isLoggedIn", isLoggedIn.toString());
  } catch (err) {
    console.log(err);
  }
};
