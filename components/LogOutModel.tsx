import { Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { X } from "lucide-react-native";
import { router } from "expo-router";
import { removeTokens } from "@/utils/removeTokens";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/Slices/userSlice";
interface Prop {
  showModel: boolean;
  setshowModel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogoutModel({ showModel, setshowModel }: Prop) {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    setshowModel(false);
    await removeTokens();
    dispatch(setUser(null));
    router.replace("/auth/login/login");
  };
  return (
    <Modal isOpen={showModel} onClose={() => setshowModel(false)} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton>
            <X color="black" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text className="font-lexend-bold text-lg text-center">
            Are You Sure You Want to Logout?
          </Text>
          <TouchableOpacity
            className="bg-red-500 rounded-md p-3 mt-3"
            onPress={handleLogout}
          >
            <Text className="text-white text-center">Logout</Text>
          </TouchableOpacity>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
