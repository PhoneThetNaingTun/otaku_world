import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLayout = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const checkLogin = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.replace("/");
    } else {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    if (!isLoaded) {
      checkLogin();
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
