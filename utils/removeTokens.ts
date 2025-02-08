import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeTokens = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("isLoggedIn");
};
