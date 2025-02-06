import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "./ui/card";
import images from "@/constants/images";
import StarRating from "react-native-star-rating-widget";
import { Trash2 } from "lucide-react-native";
import DeleteModel from "./DeleteModel";
import { Rating_Review } from "@/types/ratingAndReviews";
import { useAppDispatch } from "@/store/hooks";
import { DeleteRatingAndReveiw } from "@/store/Slices/RatingAndReviewSlice";

interface Prop {
  ratingAndReview: Rating_Review;
  loading: boolean;
}

export default function GivenReviewCard({ ratingAndReview, loading }: Prop) {
  const [showModel, setshowModel] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteRatingAndReview = (id: string) => {
    console.log(id);
    dispatch(
      DeleteRatingAndReveiw({
        id,
        onSuccess: (message) => {
          setshowModel(!showModel);
          alert(message);
        },
        onError: (error) => {
          alert(error);
        },
      })
    );
  };

  return (
    <Card size="lg" variant="outline" className="m-3 bg-white relative ">
      <TouchableOpacity
        onPress={() => {
          setshowModel(!showModel);
        }}
        className="bg-red-500 rounded-md p-3 absolute right-2 top-2 w-12"
      >
        <Trash2 color="#fff" size={20} />
      </TouchableOpacity>
      <View className="flex flex-row items-center gap-3 flex-1 w-52">
        <Image source={images.profile} className="w-14 h-14 rounded-md" />
        <View className="overflow-hidden ">
          <Text className="font-lexend-bold text-lg">
            {ratingAndReview.user.name}
          </Text>
          <StarRating
            rating={ratingAndReview.rating}
            onChange={() => {}}
            starSize={20}
          />
          <Text className="text-sm font-lexend" numberOfLines={1}>
            <Text className="text-md font-lexend-bold">Manga :</Text>{" "}
            {ratingAndReview.manga?.manga_name}
          </Text>
        </View>
      </View>

      <View className="mt-3">
        <Text>{ratingAndReview.review}</Text>
      </View>
      <DeleteModel
        showModel={showModel}
        setshowModel={setshowModel}
        onDelete={() => {
          handleDeleteRatingAndReview(ratingAndReview.id);
        }}
        loading={loading}
      />
    </Card>
  );
}
