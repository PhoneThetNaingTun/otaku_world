import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Filter() {
  return (
    <View className="flex flex-row gap-2">
      <TouchableOpacity className="bg-black rounded-full w-fit px-5 py-3">
        <Text className="text-white">Action</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-300 rounded-full w-fit px-5 py-3">
        <Text>Horror</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-300 rounded-full w-fit px-5 py-3">
        <Text>Romatic</Text>
      </TouchableOpacity>
    </View>
  );
}
