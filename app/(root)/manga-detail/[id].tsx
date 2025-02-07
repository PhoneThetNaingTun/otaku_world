import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import BackNav from "@/components/BackNav";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronRight, Heart, Star, X } from "lucide-react-native";
import AboutMangaDrawer from "@/components/AboutMangaDrawer";
import { Divider } from "@/components/ui/divider";
import ReviwModel from "@/components/ReviwModel";
import SeasonCard from "@/components/SeasonCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetMangaDetail } from "@/store/Slices/MangaSlice";
import audio from "@/constants/audio";
import { Audio } from "expo-av";
import { ToogleFavManga } from "@/store/Slices/FavouriteSlice";

const MangaDetail = () => {
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const [isImageViewing, setIsImageViewing] = React.useState<string | null>(
    null
  );
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { mangaLoading } = useAppSelector((state) => state.Manga);
  const { mangaDetail } = useAppSelector((state) => state.Manga);
  const { mangaCategories } = useAppSelector((state) => state.MangaCategory);
  const { mangaSeasons } = useAppSelector((state) => state.MangaSeason);
  const { favouriteMangas } = useAppSelector((state) => state.Favourite);
  const isFavourite = favouriteMangas.find(
    (fav) => fav.mangaId === mangaDetail?.id
  )
    ? true
    : false;
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(audio.knifeDraw);
    await sound.playAsync();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(GetMangaDetail({ id: id as string }));
    await playSound();
    setIsRefreshing(false);
  };
  const handleFavourite = () => {
    dispatch(
      ToogleFavManga({
        mangaId: mangaDetail.id,
      })
    );
  };

  useEffect(() => {
    dispatch(GetMangaDetail({ id: id as string }));
  }, [id]);

  if (mangaLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <BackNav />
        {/* <Image
          source={images.loadingRimuru}
          style={{ width: 200, height: 200 }}
        /> */}
      </SafeAreaView>
    );
  }
  if (!mangaDetail) {
    return (
      <SafeAreaView className=" bg-white">
        <BackNav />
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mb-24 h-full"
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <View className="w-full h-full flex justify-center items-center">
            <Text className="text-center">Manga not found</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      className="h-full  bg-white"
    >
      <BackNav />

      <FlatList
        data={mangaSeasons}
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
        keyExtractor={(item) => item.id}
        renderItem={({ item: mangaSeason, index }) => (
          <SeasonCard
            season={mangaSeason.season.season}
            seasonNo={(index + 1).toString().padStart(2, "0")}
            onPress={() => router.push(`./season-detail/${mangaSeason.id}`)}
          />
        )}
        contentContainerClassName="flex flex-col gap-5 pb-24"
        ListHeaderComponent={() => (
          <View>
            <View className="w-full h-96 relative">
              <Image
                source={{ uri: mangaDetail.manga_image }}
                className=" w-full h-full"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setIsImageViewing(mangaDetail.manga_image)}
                className="w-full h-full absolute bg-black opacity-20"
              ></TouchableOpacity>
            </View>
            <View className="p-5 pt-5">
              <View className="flex flex-row w-full justify-between">
                <Text className="text-3xl font-lexend-extraBold w-1/2">
                  {mangaDetail.manga_name}
                </Text>
                <TouchableOpacity
                  className="flex flex-row items-center gap-1 bg-gray-200 h-12  px-5 rounded-md"
                  onPress={() => {
                    router.push(`/(root)/reviews/${mangaDetail.id}`);
                  }}
                >
                  <Star size={20} color="orange" fill="orange" />
                  <Text>{mangaDetail.rating}/5</Text>
                </TouchableOpacity>
              </View>
              <View className="mt-4">
                <Text className="text-gray-600 text-lg font-lexend">
                  {mangaDetail.numOfChapter} Chapters
                </Text>
              </View>
              <View>
                <FlatList
                  data={mangaCategories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  contentContainerClassName="my-4 gap-2"
                  renderItem={({ item: mangacategory }) => (
                    <View
                      key={mangacategory.id}
                      className="bg-gray-200 px-3 py-2 rounded-full"
                    >
                      <Text className="text-gray-600 font-lexend">
                        {mangacategory.category.category_name}
                      </Text>
                    </View>
                  )}
                />
              </View>
              <Divider className="my-4" />
              <View>
                <Text className="font-lexend-bold text-xl">
                  About this Manga
                </Text>

                <Text
                  className="text-gray-600 font-lexend mt-2"
                  numberOfLines={2}
                >
                  {mangaDetail.manga_description}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDrawer(true)}
                  className="bg-black w-36 py-3 rounded-md mt-2 flex flex-row items-center justify-center"
                >
                  <Text className="text-white text-center  gap-2">
                    See More
                  </Text>
                  <ChevronRight color="white" size={15} />
                </TouchableOpacity>
              </View>
              <Divider className="my-4" />
              <Text className="text-xl font-lexend-extraBold">Seasons</Text>
            </View>
          </View>
        )}
      />
      <View className="absolute right-0 left-0 bottom-0 w-full bg-white h-24 border border-top border-gray-300  flex flex-row items-center px-5 justify-between gap-3">
        <TouchableOpacity
          className={
            isFavourite
              ? "w-1/4 flex justify-center items-center bg-red-500 py-3 rounded-md"
              : "w-1/4 flex justify-center items-center border border-red-500 py-3 rounded-md"
          }
          onPress={handleFavourite}
        >
          <Heart color={isFavourite ? "white" : "red"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-black  rounded-md py-4"
          onPress={() => setShowModal(true)}
        >
          <Text className="text-center text-white">Give Reviews</Text>
        </TouchableOpacity>
      </View>
      <AboutMangaDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        description={mangaDetail.manga_description}
      />
      <ReviwModel
        showModel={showModal}
        setshowModel={setShowModal}
        mangaId={mangaDetail.id}
      />

      {isImageViewing && (
        <View className="absolute w-full h-full bg-black/50">
          <TouchableOpacity
            onPress={() => setIsImageViewing(null)}
            className="w-full h-full"
          >
            <Image
              source={{ uri: mangaDetail.manga_image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MangaDetail;
