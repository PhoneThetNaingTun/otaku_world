import { ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserData } from "@/store/Slices/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeTokens } from "@/utils/removeTokens";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const ProtectedLayout = () => {
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.User);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      Alert.alert("Push notifications only work on real devices.");
      return;
    }

    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Notification permissions not granted!");
        return;
      }
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);

    try {
      await fetch(
        "https://otaku-server-o9rc.onrender.com/api/notification/save-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  }

  const redirectToLogin = () => {
    router.replace("/auth/login/login");
    removeTokens();
  };

  useEffect(() => {
    if (!user || !isLoaded) {
      dispatch(
        getUserData({
          onSuccess: () => {
            setIsloaded(true);
            registerForPushNotificationsAsync();
          },
          onError: redirectToLogin,
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
