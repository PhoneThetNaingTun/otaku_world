import { ActivityIndicator, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserData, setUser } from "@/store/Slices/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const registerForPushNotificationsAsync = async () => {
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

    await fetch("http://192.168.99.96:8000/api/notification/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  };

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
  useEffect(() => {
    registerForPushNotificationsAsync();
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification Received:", notification);
      }
    );

    return () => subscription.remove();
  }, []);

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
