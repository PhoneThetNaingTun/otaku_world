import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeft, LucideProps } from "lucide-react-native";
import { router } from "expo-router";

interface Prop {
  header: string;
  icon: React.ComponentType<LucideProps>;
  iconColor?: string;
  iconFill?: string;
}

export default function ProfileHeader({
  header,
  icon: Icon,
  iconColor,
  iconFill,
}: Prop) {
  return (
    <View className="flex flex-row justify-center items-center gap-3 mt-2 relative">
      <TouchableOpacity
        className="absolute top-1 left-5  z-10 w-11 rounded-md bg-white"
        onPress={() => {
          router.back();
        }}
      >
        <View>
          <ChevronLeft size={35} color="black" />
        </View>
      </TouchableOpacity>
      {Icon && <Icon color={iconColor} fill={iconFill ? iconFill : ""} />}
      <Text className="font-lexend-extraBold text-3xl text-center ">
        {header}
      </Text>
    </View>
  );
}
