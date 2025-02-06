import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./ui/modal";
import { X } from "lucide-react-native";
import { useAppDispatch } from "@/store/hooks";
import { User } from "@/types/user";
import { UpdateUser } from "@/store/Slices/userSlice";

interface Prop {
  showModal: boolean;
  loading: boolean;
  setshowModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
}

export default function UpdateUserModel({
  showModal,
  loading,
  user,
  setshowModal,
}: Prop) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>(user?.name || "");
  const handleUpdateUser = () => {
    if (!name) {
      alert("Name canonot be emapty!");
      return;
    }
    dispatch(
      UpdateUser({
        name: name,
        onSuccess: (message) => {
          alert(message);
          setshowModal(false);
        },
        onError: (error) => {
          alert(error);
        },
      })
    );
  };

  return (
    <Modal isOpen={showModal} onClose={() => setshowModal(false)} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton>
            <X color="black" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text className="font-lexend-bold text-lg text-center">
            Editing Name
          </Text>
          <TextInput
            placeholder="Enter Name"
            defaultValue={user?.name}
            onChangeText={(e) => setName(e)}
            className="py-4 px-2 bg-slate-100 rounded-md my-3"
          />
          <TouchableOpacity
            className="bg-black rounded-md p-3 mt-3"
            disabled={loading}
            onPress={handleUpdateUser}
          >
            {loading ? (
              <Text className="text-white font-lexend-bold text-lg text-center">
                Loading...
              </Text>
            ) : (
              <Text className="text-white font-lexend-bold text-lg text-center">
                Edit
              </Text>
            )}
          </TouchableOpacity>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
