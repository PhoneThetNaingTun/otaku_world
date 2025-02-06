import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import {
  ChevronRight,
  Headset,
  Heart,
  LogOut,
  Star,
  UserRoundPen,
} from "lucide-react-native";
import { Divider } from "@/components/ui/divider";
import { router } from "expo-router";
import LogoutModel from "@/components/LogOutModel";
import { useAppSelector } from "@/store/hooks";

const Profile = () => {
  const [showModel, setshowModel] = React.useState(false);
  const { user } = useAppSelector((state) => state.User);
  return (
    <SafeAreaView edges={["top"]} className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-col items-center justify-center">
          <Image
            source={images.profile}
            className="w-40 h-40 rounded-full shadow-lg"
          />
          <Text className="font-semibold text-3xl">{user?.name}</Text>
        </View>
        <View className="my-10 flex flex-col gap-2">
          <TouchableOpacity
            className="flex flex-row justify-between  items-center gap-2 py-3"
            onPress={() => router.push("/(root)/profile-detail/profile-detail")}
          >
            <UserRoundPen color="black" />
            <Text className="font-lexend-light text-lg">Edit Profile</Text>
            <ChevronRight color="black" />
          </TouchableOpacity>
          <Divider className="my-2" />
          <TouchableOpacity
            className="flex flex-row justify-between  items-center gap-2 py-3"
            onPress={() => {
              router.push("/(root)/favourite/favourite");
            }}
          >
            <Heart color="red" fill="red" />
            <Text className="font-lexend-light text-lg">Your Favourites</Text>
            <ChevronRight color="black" />
          </TouchableOpacity>
          <Divider className="my-2" />

          <TouchableOpacity
            className="flex flex-row justify-between  items-center gap-2 py-3"
            onPress={() => router.push("/(root)/review-given/review-given")}
          >
            <Star color="orange" fill="orange" />
            <Text className="font-lexend-light text-lg">Review Given</Text>
            <ChevronRight color="black" />
          </TouchableOpacity>
          <Divider className="mt-2" />
        </View>
        <TouchableOpacity
          className="flex flex-row justify-between  items-center gap-2 py-3"
          onPress={() => router.push("/(root)/contact-us/contact-us")}
        >
          <Headset color="black" />
          <Text className="font-lexend-light text-lg">Contact Us</Text>
          <ChevronRight color="black" />
        </TouchableOpacity>
        <Divider className="my-2" />
        <TouchableOpacity
          className="flex flex-row justify-between  items-center gap-2 py-3"
          onPress={() => setshowModel(!showModel)}
        >
          <LogOut color="red" />
          <Text className="font-lexend-light text-lg text-red-500">Logout</Text>
          <ChevronRight color="red" />
        </TouchableOpacity>
      </View>
      <LogoutModel showModel={showModel} setshowModel={setshowModel} />
    </SafeAreaView>
  );
};

export default Profile;
