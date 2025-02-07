import { View, Text, Image } from "react-native";
import React from "react";
import { Card } from "./ui/card";
import images from "@/constants/images";
import StarRating from "react-native-star-rating-widget";
import { User } from "@/types/user";

interface Prop {
  rating: number;
  review: string;
  user: User;
}

export default function ReviewCard({ rating, review, user }: Prop) {
  return (
    <Card size="lg" variant="outline" className="m-3 bg-white">
      <View className="flex flex-row items-center gap-3">
        <Image
          source={images.profile}
          alt="Avator"
          className="w-14 h-14 rounded-md"
        />
        <View>
          <Text className="font-lexend-bold text-lg">{user.name}</Text>
          <StarRating rating={rating} onChange={() => {}} starSize={20} />
        </View>
      </View>
      <View className="mt-3">
        <Text>{review}</Text>
      </View>
    </Card>
  );
}
