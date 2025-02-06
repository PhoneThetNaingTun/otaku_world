import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BackNav from "@/components/BackNav";
import ProfileHeader from "@/components/ProfileHeader";
import { Headset, Mail, PhoneCall } from "lucide-react-native";
import ContactUsCard from "@/components/ContactUsCard";

const contactUsCard = [
  {
    header: "Email",
    content: "ddd@gmail.com",
    icon: Mail,
  },
  {
    header: "Phone Number",
    content: "08123456789",
    icon: PhoneCall,
  },
];

export default function ContactUsPage() {
  return (
    <SafeAreaView className="bg-white">
      <BackNav />
      <View className="px-5 h-full">
        <ProfileHeader
          header="Contact Us"
          icon={Headset}
          iconColor="black"
          iconFill="none"
        />
        <View className="mt-5 flex gap-5">
          <TextInput
            placeholder="Enter Your Name"
            className="bg-slate-100 p-3 rounded-md"
          />
          <TextInput
            placeholder="Enter Your Email"
            className="bg-slate-100 p-3 rounded-md"
          />
          <TextInput
            placeholder="Message"
            className="bg-slate-100 p-3 rounded-md"
          />
          <TouchableOpacity className="bg-black p-3 rounded-md">
            <Text className="font-lexend-semiBold text-center text-white">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 flex gap-3">
          {contactUsCard.map((item) => (
            <ContactUsCard
              header={item.header}
              content={item.content}
              icon={item.icon}
              iconColor="black"
              key={item.header}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
