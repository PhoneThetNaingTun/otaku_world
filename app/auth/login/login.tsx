import images from "@/constants/images";
import { setToken } from "@/utils/setTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    const response = await fetch("http://192.168.99.96:8000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    });
    const dataFromServer = await response.json();
    if (response.ok) {
      const { token } = dataFromServer;
      await setToken(token, true);
      router.push("/");
    } else {
      alert(dataFromServer.error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={["bottom"]} className="w-full h-full">
        <Image
          source={images.tanjiroLoginBg}
          resizeMode="cover"
          className="w-screen h-screen absolute top-0 left-0"
        />
        <View className="px-5 flex justify-end items-center h-full z-10">
          <View className="w-full">
            <Text className="text-white text-4xl font-lexend-bold text-center">
              Otaku World
            </Text>
            <Text className="text-white text-center text-sm font-lexend-regular">
              Your ultimate destination for reading and discovering manga!
            </Text>
            <Text className="text-blue-500 text-center text-3xl font-lexend-bold mt-3">
              Login
            </Text>
            <View className="mt-10 flex flex-col gap-5">
              <TextInput
                placeholder="Email"
                className="bg-white rounded-full p-5  w-full"
                placeholderTextColor="gray"
                onChangeText={(e) => setEmail(e)}
              />
              <View className="relative w-full">
                <TextInput
                  className="bg-white rounded-full p-5  w-full"
                  value={password}
                  placeholder="Enter password"
                  onChangeText={(e) => {
                    setPassword(e);
                  }}
                  secureTextEntry={!isPasswordVisible} // Toggles password visibility
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {isPasswordVisible ? (
                    <Eye size={20} color="black" />
                  ) : (
                    <EyeOff size={20} color="black" />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity className="bg-blue-500 p-5 rounded-full">
                <Text
                  className="text-white text-center font-lexend-bold text-lg"
                  onPress={handleLogin}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-white font-lexend">
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/auth/register/register");
                  }}
                >
                  <Text className="text-white font-lexend-extraBold underline">
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Image
          source={images.imageGradient}
          resizeMode="cover"
          className="absolute bottom-0 left-0 w-full h-full"
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
