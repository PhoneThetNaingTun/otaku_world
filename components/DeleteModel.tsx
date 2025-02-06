import { View, Text, TouchableOpacity, TextInput } from "react-native";
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
import StarRating from "react-native-star-rating-widget";
interface Prop {
  showModel: boolean;
  setshowModel: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  loading: boolean;
}

export default function DeleteModel({
  showModel,
  setshowModel,
  onDelete,
  loading,
}: Prop) {
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
            Are You Sure You Want to Delete This Review?
          </Text>
          <TouchableOpacity
            className="bg-red-500 rounded-md p-3 mt-3"
            disabled={loading}
            onPress={onDelete}
          >
            {loading ? (
              <Text className="text-white font-lexend-bold text-lg text-center">
                Loading...
              </Text>
            ) : (
              <Text
                className="text-white font-lexend-bold text-lg text-center"
                onPress={onDelete}
              >
                Delete
              </Text>
            )}
          </TouchableOpacity>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
