import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserData, setUser } from "@/store/Slices/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";

const ProtectedLayout = () => {
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.User);

  useEffect(() => {
    if (!user) {
      dispatch(
        getUserData({
          onSuccess: () => {
            setIsloaded(true);
          },
        })
      );
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={images.loadingRimuru}
          style={{ width: 200, height: 200 }}
        />
      </SafeAreaView>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default ProtectedLayout;
