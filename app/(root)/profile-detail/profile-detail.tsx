import BackNav from "@/components/BackNav";
import ProfileHeader from "@/components/ProfileHeader";
import UpdateUserModel from "@/components/UpdateUserModel";
import images from "@/constants/images";
import { useAppSelector } from "@/store/hooks";
import { Edit, UserRoundPen } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileDetailPage = () => {
  const { user, userLoading } = useAppSelector((state) => state.User);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <ProfileHeader
        header="Profile"
        icon={UserRoundPen}
        iconColor="black"
        iconFill="white"
      />
      <View className="w-full flex items-center justify-center mt-5">
        <Image source={images.profile} className="w-32 h-32 rounded-full " />
        <View className="flex items-center flex-row gap-3">
          <Text className="mt-3 text-2xl font-lexend-extraBold">
            {user?.name}
          </Text>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Edit size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <UpdateUserModel
        setshowModal={setShowModal}
        showModal={showModal}
        loading={userLoading}
        user={user}
      />
    </SafeAreaView>
  );
};

export default ProfileDetailPage;
