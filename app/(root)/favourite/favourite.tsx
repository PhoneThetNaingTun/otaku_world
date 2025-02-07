import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BackNav from "@/components/BackNav";
import MangaCard from "@/components/MangaCard";
import { BanIcon, Heart } from "lucide-react-native";
import ProfileHeader from "@/components/ProfileHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { GetFavManga } from "@/store/Slices/FavouriteSlice";

export default function FavoritePage() {
  const { favouriteMangas } = useAppSelector((state) => state.Favourite);
  const mangaCardOnPress = (mangaId: string) => {
    router.push(`/(root)/manga-detail/${mangaId}`);
  };
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoaded) {
      dispatch(
        GetFavManga({
          onSuccess: () => {
            setIsLoaded(true);
          },
        })
      );
    }
  }, [isLoaded]);
  if (!isLoaded) {
    return (
      <SafeAreaView className="flex h-full justify-center items-center">
        <BackNav />
        <Text className="font-lexend-light text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="bg-white h-full">
      <ProfileHeader
        header="Your Favourite"
        icon={Heart}
        iconColor="red"
        iconFill="red"
      />

      {favouriteMangas.length > 0 ? (
        <FlatList
          data={favouriteMangas}
          renderItem={({ item }) => (
            <MangaCard
              manga={item.manga}
              onPress={() => mangaCardOnPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 10 }}
          className="mt-5 "
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <View className="flex items-center gap-2 flex-row">
            <BanIcon color="black" />
            <Text className="text-xl font-semibold text-center ">
              No Manga Found
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
