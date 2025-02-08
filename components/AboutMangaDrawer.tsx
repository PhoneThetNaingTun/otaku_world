import { View, Text } from "react-native";
import React from "react";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ScrollView } from "react-native";
import { X } from "lucide-react-native";
interface Prop {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}

export default function AboutMangaDrawer({
  showDrawer,
  setShowDrawer,
  description,
}: Prop) {
  return (
    <View>
      <Drawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        size="md"
        anchor="bottom"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton>
              <X color="black" className="border-2 border-black" />
            </DrawerCloseButton>
            <Text className="font-lexend-bold text-lg">About This Manga</Text>
          </DrawerHeader>
          <DrawerBody>
            <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
              <Text className="text-gray-600 font-lexend mt-2">
                {description}
              </Text>
            </ScrollView>
          </DrawerBody>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </View>
  );
}
