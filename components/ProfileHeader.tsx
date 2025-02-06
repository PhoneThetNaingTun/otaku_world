import { View, Text } from "react-native";
import React from "react";
import { LucideProps } from "lucide-react-native";

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
    <View className="flex flex-row justify-center items-center gap-3 mt-2">
      {Icon && <Icon color={iconColor} fill={iconFill ? iconFill : ""} />}
      <Text className="font-lexend-extraBold text-3xl text-center ">
        {header}
      </Text>
    </View>
  );
}
