import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackNav from "@/components/BackNav";
import ChapterCard from "@/components/ChapterCard";
import { router, useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  GetChapters,
  setMangaSeasonChapters,
} from "@/store/Slices/MangaSeasonChapter";

export default function SeasonDetail() {
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { mangaSeasonChapters } = useAppSelector(
    (state) => state.MangaSeasonChapter
  );
  const { mangaSeasons } = useAppSelector((state) => state.MangaSeason);
  const mangaSeason = mangaSeasons.find((mangaSeason) => mangaSeason.id === id);
  const [isloaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setMangaSeasonChapters([]));
    dispatch(
      GetChapters({
        mangaSeasonId: id as string,
        onSuccess: () => {
          setIsLoaded(true);
        },
      })
    );
  }, []);
  if (!isloaded) {
    <SafeAreaView className="h-full flex justify-center items-center  bg-white">
      <BackNav />
      <ActivityIndicator size="small" color="red" />
    </SafeAreaView>;
  }
  return (
    <SafeAreaView className="h-full px-5  bg-white">
      <BackNav />

      <FlatList
        data={mangaSeasonChapters}
        renderItem={({ item: mangaSeasonChapter, index }) => (
          <ChapterCard
            onPress={() => {
              router.push(`./chapter-detail/${mangaSeasonChapter.id}`);
            }}
            chapter={mangaSeasonChapter.chapter.chapter}
            chapterNo={(index + 1).toString().padStart(2, "0")}
            pageCount={mangaSeasonChapter.pageCount}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Text className="text-center font-lexend-bold text-2xl my-2">
            {mangaSeason?.season.season}
          </Text>
        )}
        contentContainerClassName="flex flex-col gap-5"
      />
    </SafeAreaView>
  );
}
