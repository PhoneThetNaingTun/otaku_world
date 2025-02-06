import { View, Text } from "react-native";
import React from "react";
import { Card } from "./ui/card";
import { LucideIcon } from "lucide-react-native";

interface Prop {
  header: string;
  content: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function ContactUsCard({
  header,
  content,
  icon: Icon,
  iconColor,
}: Prop) {
  return (
    <Card className="flex flex-row gap-3">
      <View className="flex flex-row items-center gap-2">
        {Icon && <Icon color={iconColor} size={20} />}
        <Text>{header} -</Text>
      </View>
      <Text>{content}</Text>
    </Card>
  );
}
