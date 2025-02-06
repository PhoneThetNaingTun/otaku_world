import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Prop {
  onPress: () => void;
  season: string;
  seasonNo: string;
}

const SeasonCard = ({ onPress, season, seasonNo }: Prop) => {
  return (
    <TouchableOpacity
      className="flex flex-row items-center gap-5 py-5 border border-gray-500  px-2"
      onPress={onPress}
    >
      <View>
        <Text className="text-gray-600 text-2xl">{seasonNo}</Text>
      </View>
      <View>
        <Text className="font-lexend-bold text-xl text-gray-600">{season}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SeasonCard;
