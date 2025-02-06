import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

interface Prop {
  image: any;
  title: string;
  author: string;
  onPress: () => void;
}

export default function Card({ image, title, author, onPress }: Prop) {
  return (
    <TouchableOpacity
      className="w-60 h-80 relative flex flex-col items-start"
      onPress={onPress}
    >
      <Image source={{ uri: image }} className="size-full rounded-lg" />
      <Image
        source={images.imageGradient}
        className="size-full absolute bottom-0 left-0 rounded-lg"
      />
      <View className="px-3 py-1.5 absolute bottom-0 left-0">
        <Text className="text-xl font-semibold text-white" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-white mt-1">{author}</Text>
      </View>
    </TouchableOpacity>
  );
}
