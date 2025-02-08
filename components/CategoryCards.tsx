import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Prop {
  category_name: string;
  onPress: () => void;
}

export const CategoryCards = ({ category_name, onPress }: Prop) => {
  return (
    <TouchableOpacity
      className="border-black border px-5 py-2  flex justify-center items-center rounded-full"
      onPress={onPress}
    >
      <Text className="text-black font-lexend-bold text-xl">
        {category_name}
      </Text>
    </TouchableOpacity>
  );
};
