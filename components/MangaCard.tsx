import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import { UserRound } from "lucide-react-native";
import { Manga } from "@/types/manga";

interface Prop {
  onPress: () => void;
  manga: Manga;
}
export default function MangaCard({ onPress, manga }: Prop) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row gap-4 items-center bg-white p-4 w-full h-40 rounded-lg border border-gray-100"
    >
      <Image
        source={{ uri: manga.manga_image }}
        className="w-32 h-full rounded-lg"
      />
      <View className="flex-1 flex flex-col justigy-between gap-3">
        <Text numberOfLines={1} className="text-xl">
          {manga.manga_name}
        </Text>
        <View className="flex flex-row gap-1 items-center">
          <UserRound size={15} color="#B8B8D2" fill={"#B8B8D2"} />
          <Text className="text-gray-400 text-sm">
            {manga.author.author_name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
