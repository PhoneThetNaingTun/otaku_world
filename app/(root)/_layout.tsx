import { ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserData } from "@/store/Slices/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeTokens } from "@/utils/removeTokens";

const ProtectedLayout = () => {
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.User);

  useEffect(() => {
    if (!user || !isLoaded) {
      dispatch(
        getUserData({
          onSuccess: () => {
            setIsloaded(true);
          },
          onError: (error) => {
            router.replace("/auth/login/login");
            removeTokens();
          },
        })
      );
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="small" color="red" />
      </SafeAreaView>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default ProtectedLayout;
