import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Prop {
  onPress: () => void;
  chapter: string;
  chapterNo: string;
  pageCount?: string;
}
export default function ChapterCard({
  onPress,
  chapter,
  chapterNo,
  pageCount,
}: Prop) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center gap-5 py-5 border border-gray-500 rounded-md px-2"
      onPress={onPress}
    >
      <View>
        <Text className="text-gray-600 text-2xl">{chapterNo}</Text>
      </View>
      <View>
        <Text>{chapter}</Text>
        <Text className="text-gray-600 text-sm">{pageCount} pages</Text>
      </View>
    </TouchableOpacity>
  );
}
