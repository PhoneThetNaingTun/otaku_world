import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { House, Search, User } from "lucide-react-native";

const TabIcon = ({
  focused,
  icon: Icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    {Icon ? <Icon size={24} color={focused ? "#020202" : "#9ca3af"} /> : null}
    <Text
      className={`${
        focused ? `text-black font-bold` : `text-gray-400 font-rubik`
      } text-xs w-full text-end mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "relative",
          borderTopColor: "#0061FF1A0",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={House} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={User} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
