import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileTop from "@/components/profileTop";
import MangaCard from "@/components/MangaCard";
import BackNav from "@/components/BackNav";
import { BanIcon, ChevronLeft } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetMangaByCategory } from "@/store/Slices/MangaSlice";

const Category = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { mangas } = useAppSelector((state) => state.Manga);
  const { categories } = useAppSelector((state) => state.Category);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const category = categories.find((item) => item.id === id);
  useEffect(() => {
    dispatch(
      GetMangaByCategory({
        id: id as string,
        onSuccess: () => {
          setIsLoaded(true);
        },
      })
    );
  }, []);
  const mangaCardOnPress = (mangaId: string) => {
    router.push(`/(root)/manga-detail/${mangaId}`);
  };
  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <BackNav />
        <ActivityIndicator size="small" color="red" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="bg-white flex-1">
      <View className="px-5 flex-1">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          className="w-full flex flex-row items-center gap-5"
        >
          <ChevronLeft size={35} color="black" />
          <Text className="text-2xl font-lexend-extraBold ">
            {category?.category_name}
          </Text>
        </TouchableOpacity>

        {mangas.length > 0 ? (
          <FlatList
            data={mangas}
            renderItem={({ item }) => (
              <MangaCard
                manga={item}
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
      </View>
    </SafeAreaView>
  );
};

export default Category;
