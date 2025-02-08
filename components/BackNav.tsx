import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function BackNav() {
  return (
    <TouchableOpacity
      className="absolute top-5 left-5  z-10 w-11 rounded-md bg-white"
      onPress={() => {
        router.back();
      }}
    >
      <View>
        <ChevronLeft size={35} color="black" />
      </View>
    </TouchableOpacity>
  );
}
