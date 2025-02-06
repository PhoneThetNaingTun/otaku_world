import BackNav from "@/components/BackNav";
import images from "@/constants/images";
import { setToken } from "@/utils/setTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect, router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleregistesr = async () => {
    setIsLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all the fields");
      setIsLoading(false);

      return;
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm Password must be the same");
      setIsLoading(false);

      return;
    }
    const response = await fetch(
      "http://192.168.99.96:8000/api/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          password,
          email,
        }),
      }
    );
    const dataFromServer = await response.json();
    if (response.ok) {
      const { token } = dataFromServer;
      alert(dataFromServer.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      await setToken(token, true);
      router.push("/");
      setIsLoading(false);
    } else {
      alert(dataFromServer.error);
      setIsLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={["bottom"]} className="w-full h-full">
        <Image
          source={images.tanjiroBg}
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
            <Text className="text-red-500 text-center text-3xl font-lexend-bold mt-3">
              Register
            </Text>
            <View className="mt-10 flex flex-col gap-5">
              <TextInput
                placeholder="User Name"
                className="bg-white rounded-full p-5  w-full"
                placeholderTextColor="gray"
                onChangeText={(e) => {
                  setName(e);
                }}
              />
              <TextInput
                placeholder="Email"
                className="bg-white rounded-full p-5  w-full"
                placeholderTextColor="gray"
                textContentType="emailAddress"
                onChangeText={(e) => {
                  setEmail(e);
                }}
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

              <TextInput
                placeholder="Confirm Password"
                className="bg-white rounded-full p-5  w-full"
                placeholderTextColor="gray"
                textContentType="password"
                onChangeText={(e) => {
                  setConfirmPassword(e);
                }}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                className="bg-red-500 p-5 rounded-full"
                onPressOut={handleregistesr}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text className="text-white text-center font-lexend-bold">
                    Register
                  </Text>
                )}
              </TouchableOpacity>
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-white font-lexend">
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/auth/login/login");
                  }}
                >
                  <Text className="text-white font-lexend-extraBold underline">
                    Login
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
