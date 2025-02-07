import Card from "@/components/Card";
import ProfileTop from "@/components/profileTop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, RefreshControl, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import audio from "@/constants/audio";
import { CategoryCards } from "@/components/CategoryCards";
import { GetCategories } from "@/store/Slices/CategorySlice";
import { GetLatestMangas, GetMostRatedMangas } from "@/store/Slices/MangaSlice";
import { Ban } from "lucide-react-native";
import { GetFavManga } from "@/store/Slices/FavouriteSlice";

export default function Index() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.Category);
  const { latestMangas, mostRatedMangas } = useAppSelector(
    (state) => state.Manga
  );
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(audio.knifeDraw);
    await sound.playAsync();
  };
  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(GetCategories({}));
    dispatch(GetLatestMangas({}));
    dispatch(GetMostRatedMangas({}));
    dispatch(GetFavManga({}));
    await playSound();
    setIsRefreshing(false);
  };

  useEffect(() => {
    dispatch(GetCategories({}));
    dispatch(GetLatestMangas({}));
    dispatch(GetMostRatedMangas({}));
    dispatch(GetFavManga({}));
  }, []);
  return (
    <SafeAreaView edges={["top"]} className="bg-white h-full px-5">
      <ProfileTop />

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#ff4500"]}
            tintColor="#ff4500"
            progressBackgroundColor="#fff"
          />
        }
      > */}
      <View className="mt-5">
        <Text className="font-lexend-bold text-xl mb-5">Latest Manga</Text>
        <FlatList
          data={latestMangas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              image={item.manga_image}
              title={item.manga_name}
              author={item.author.author_name}
              onPress={() => router.push(`/(root)/manga-detail/${item.id}`)}
            />
          )}
          horizontal
          contentContainerClassName="flex gap-5"
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
        <Text className="font-lexend-bold text-xl my-3">Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row"
          contentContainerStyle={{ gap: 10 }}
        >
          {categories.map((category) => (
            <CategoryCards
              category_name={category.category_name}
              key={category.id}
              onPress={() => {
                router.push(`/(root)/category/${category.id}`);
              }}
            />
          ))}
        </ScrollView>
        <View className="w-full mt-5">
          <Text className="font-lexend-bold text-xl mb-5">
            Most Rated Mangas
          </Text>
          {mostRatedMangas.length < 1 ? (
            <View className="w-full h-56 flex justify-center items-center">
              <View className="flex items-center gap-2 flex-row">
                <Ban color="black" size={30} />
                <Text>Empty</Text>
              </View>
            </View>
          ) : (
            <FlatList
              data={mostRatedMangas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card
                  image={item.manga_image}
                  title={item.manga_name}
                  author={item.author.author_name}
                  onPress={() => router.push(`/(root)/manga-detail/${item.id}`)}
                />
              )}
              horizontal
              contentContainerClassName="flex gap-5"
              showsHorizontalScrollIndicator={false}
              bounces={false}
            />
          )}
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
