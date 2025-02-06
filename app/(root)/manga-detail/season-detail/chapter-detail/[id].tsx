import BackNav from "@/components/BackNav";
import audio from "@/constants/audio";
import images from "@/constants/images";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GetPages } from "@/store/Slices/PageSlice";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Animated,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const [scrollY] = useState(new Animated.Value(0));
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { pages } = useAppSelector((state) => state.Page);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(audio.knifeDraw);
    await sound.playAsync();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(GetPages({ mangaSeasonChapterId: id as string }));
    await playSound();
    setIsRefreshing(false);
  };
  const [loadingStates, setLoadingStates] = useState(pages.map(() => true));

  const handleImageLoadStart = (index: any) => {
    setLoadingStates((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleImageLoadEnd = (index: any) => {
    setLoadingStates((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  useEffect(() => {
    dispatch(GetPages({ mangaSeasonChapterId: id as string }));
  }, []);
  return (
    <View className=" bg-white">
      <BackNav />
      {pages.length < 0 ? (
        <SafeAreaView className="w-full h-full flex justify-center items-center">
          <Text>No pages found!</Text>
        </SafeAreaView>
      ) : (
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          {pages.map((page, index) => (
            <View key={page.id} style={{ flex: 1, position: "relative" }}>
              {loadingStates[index] && (
                <ActivityIndicator
                  size="large"
                  color="#ff4500"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -15 }, { translateY: -15 }],
                  }}
                />
              )}
              <Image
                key={page.id}
                source={{ uri: page.imgUrl }}
                className="w-screen h-screen"
                resizeMode="contain"
                onLoadStart={() => handleImageLoadStart(index)}
                onLoad={() => handleImageLoadEnd(index)}
              />
            </View>
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default App;
