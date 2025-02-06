import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { X } from "lucide-react-native";
import StarRating from "react-native-star-rating-widget";
import { NewRatingAndReviewPayload } from "@/types/ratingAndReviews";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateRatingAndReview } from "@/store/Slices/RatingAndReviewSlice";
interface Prop {
  showModel: boolean;
  setshowModel: React.Dispatch<React.SetStateAction<boolean>>;
  mangaId: string;
}

export default function ReviwModel({ showModel, setshowModel, mangaId }: Prop) {
  const [newRatingAndReview, setNewRatingAndReview] =
    useState<NewRatingAndReviewPayload>({
      rating: 0,
      review: "",
      mangaId,
    });
  const dispatch = useAppDispatch();
  const { ratingAndReviewLoading } = useAppSelector(
    (state) => state.RatingAndReview
  );
  const handleGiveRatingAndReview = () => {
    if (newRatingAndReview.rating == 0) {
      alert("Please provide a rating ");
      return;
    }
    dispatch(
      CreateRatingAndReview({
        ...newRatingAndReview,
        onSuccess: (message) => {
          alert(message);
          setNewRatingAndReview({ rating: 0, review: "", mangaId });
          setshowModel(false);
        },
        onError: (error) => {
          alert(error);
          setshowModel(false);
        },
      })
    );
  };

  return (
    <Modal isOpen={showModel} onClose={() => setshowModel(false)} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton>
            <X color="black" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <View className="flex flex-row justify-center">
            <StarRating
              rating={newRatingAndReview.rating as number}
              onChange={(e) =>
                setNewRatingAndReview((prev) => ({ ...prev, rating: e }))
              }
            />
          </View>
          <TextInput
            placeholder="Write your review (optional)"
            className=" p-5 bg-slate-100 rounded-md my-3 "
            onChangeText={(review) =>
              setNewRatingAndReview((prev) => ({ ...prev, review }))
            }
          />
          <TouchableOpacity
            className=" bg-black py-4 rounded-md"
            onPress={handleGiveRatingAndReview}
          >
            {ratingAndReviewLoading ? (
              <Text className="text-white text-center">Loading...</Text>
            ) : (
              <Text className="text-white text-center">
                Give Rating and Review
              </Text>
            )}
          </TouchableOpacity>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
