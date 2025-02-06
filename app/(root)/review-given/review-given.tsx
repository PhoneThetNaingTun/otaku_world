import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackNav from "@/components/BackNav";
import { Star } from "lucide-react-native";
import ReviewCard from "@/components/ReviewCard";
import GivenReviewCard from "@/components/GivenReviewCard";
import ProfileHeader from "@/components/ProfileHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetRatingAndReviewByUserId } from "@/store/Slices/RatingAndReviewSlice";
import images from "@/constants/images";

export default function ReviewGivenPage() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  const { ratingAndReviewLoading, ratingAndReviews } = useAppSelector(
    (state) => state.RatingAndReview
  );
  useEffect(() => {
    dispatch(
      GetRatingAndReviewByUserId({
        onSuccess: () => {
          setIsloaded(true);
        },
      })
    );
  }, []);

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex h-full justify-center items-center ">
        <BackNav />
        <Image src={images.loadingRimuru} alt="Loading" className="w-32 h-32" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="px-5 h-full bg-white">
      <BackNav />
      {ratingAndReviews.length == 0 ? (
        <View className="w-full h-full">
          <ProfileHeader
            header="Given Reviews And Ratings"
            icon={Star}
            iconColor="orange"
            iconFill="orange"
          />
          <Text className="font-lexend-bold text-xl ">
            You haven't given any review yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={ratingAndReviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GivenReviewCard
              ratingAndReview={item}
              loading={ratingAndReviewLoading}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <ProfileHeader
                header="Given Reviews"
                icon={Star}
                iconColor="orange"
                iconFill="orange"
              />
            </>
          )}
        />
      )}
    </SafeAreaView>
  );
}
