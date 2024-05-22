import { Image, Text, View } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string,
  subtitle: string,
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px] px-4"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title="Create video"
        handlePress={() => { router.push("/create") }}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState;
