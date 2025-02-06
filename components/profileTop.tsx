import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import { useAppSelector } from "@/store/hooks";

export default function ProfileTop() {
  const { user } = useAppSelector((state) => state.User);

  return (
    <View>
      <View className="flex flex-row items-center gap-3">
        <Image source={images.profile} className="w-20 h-20 rounded-full" />
        <View>
          <Text className="text-gray-500">Hello! Welcome to Otaku World</Text>
          <Text className="font-semibold text-3xl w-64" numberOfLines={1}>
            {user?.name} dkajflafjdl
          </Text>
        </View>
      </View>
    </View>
  );
}
