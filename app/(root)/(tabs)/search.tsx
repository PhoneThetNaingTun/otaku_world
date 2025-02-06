import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Easing,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileTop from "@/components/profileTop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FlatList } from "react-native";
import MangaCard from "@/components/MangaCard";
import { router } from "expo-router";
import { Ban, RefreshCcw, Search } from "lucide-react-native";
import { GetMangaBySearch } from "@/store/Slices/MangaSlice";
import { Animated } from "react-native";

const SearchPage = () => {
  const [searchName, setSearchName] = useState<string>("");
  const { searchMangas } = useAppSelector((state) => state.Manga);
  const handleOnPress = (id: string) => {
    router.push(`/(root)/manga-detail/${id}`);
  };
  const [searchInput, setSearchInput] = useState<string>("");
  const { searchMangaLoading } = useAppSelector((state) => state.Manga);

  const dispatch = useAppDispatch();
  const spinValue = useRef(new Animated.Value(0)).current;
  const handleSearchMangas = () => {
    if (!searchInput) {
      return;
    }
    dispatch(
      GetMangaBySearch({
        search: searchInput,
        onSuccess: () => {
          setSearchName && setSearchName(searchInput);
          setSearchInput("");
        },
        onError: (error) => {
          alert(error);
        },
      })
    );
  };
  useEffect(() => {
    if (searchMangaLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000, // 1 second for a full rotation
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [searchMangaLoading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={["top"]} className="bg-white flex-1">
        <View className="px-5 flex-1">
          <ProfileTop />
          <View className=" my-5 flex flex-row items-center gap-2">
            <TextInput
              placeholder="Search"
              className="bg-[#ECECEC] rounded-md p-4 flex-1"
              placeholderTextColor="#888888"
              onChangeText={(e) => setSearchInput(e)}
              value={searchInput}
            />
            <TouchableOpacity
              className="p-4 bg-black rounded-md"
              disabled={searchMangaLoading || !searchInput}
              onPress={handleSearchMangas}
            >
              {searchMangaLoading ? (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <RefreshCcw size={20} color="white" />
                </Animated.View>
              ) : (
                <Search color="white" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {searchMangas.length > 0 ? (
            <FlatList
              data={searchMangas}
              keyExtractor={(item) => item.id}
              renderItem={({ item: manga }) => (
                <MangaCard
                  manga={manga}
                  onPress={() => {
                    handleOnPress(manga.id);
                  }}
                />
              )}
              ListHeaderComponent={() => (
                <Text className="font-lexend-extraBold text-lg">
                  Results For "{searchName}"
                </Text>
              )}
            />
          ) : (
            <View className="flex flex-row items-center gap-4 justify-center">
              <Ban color="black" size={20} />
              <Text className="text-center font-lexend-extraBold text-xl">
                No Result
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SearchPage;
