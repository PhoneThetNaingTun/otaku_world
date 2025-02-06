import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BackNav from "@/components/BackNav";
import images from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import ReviewCard from "@/components/ReviewCard";
import { Star } from "lucide-react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetRatingAndReviews } from "@/store/Slices/RatingAndReviewSlice";

export default function Reviews() {
  const { mangaDetail } = useAppSelector((state) => state.Manga);
  const { ratingAndReviews } = useAppSelector((state) => state.RatingAndReview);
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      GetRatingAndReviews({
        mangaId: mangaDetail.id,
        onSuccess: () => {
          setIsloaded(true);
        },
      })
    );
  }, []);
  if (!isLoaded) {
    return (
      <SafeAreaView className="flex h-full justify-center items-center">
        <Image src={images.loadingRimuru} alt="Loading" className="w-32 h-32" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} className="h-full">
      <BackNav />

      <FlatList
        data={ratingAndReviews}
        renderItem={({ item }) => (
          <ReviewCard
            rating={item.rating}
            review={item.review}
            user={item.user}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-col gap-3"
        ListHeaderComponent={() => (
          <View>
            <View className="w-full h-96 relative">
              <Image
                source={{ uri: mangaDetail?.manga_image }}
                className=" w-full h-full"
                resizeMode="cover"
              />
              <View className="w-full h-full absolute bg-black opacity-20"></View>
            </View>
            <View className="px-5 mt-4 flex flex-row items-center gap-3">
              <Star color="orange" fill="orange" />
              <Text className="font-lexend-bold text-2xl">
                {mangaDetail.rating}/5
              </Text>
              <Text className="font-lexend-extraBold text-2xl">
                Rating And Reviews
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
