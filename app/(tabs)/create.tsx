import FormField from "@/components/FormField";
import VideoCard from "@/components/VideoCard";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Image, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import CustomButton from "@/components/CustomButton";

const Create = () => {
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const submit = () => {

  }

  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <ScrollView className="space-y-2 m-4">
        <View className="my-4">
          <Text className="text-white font-psemibold text-3xl">Upload Video</Text>
        </View>
        <FormField
          title="Video Title"
          value={form.title}
          handleChangeText={(e) => setForm(cur => ({ ...cur, title: e }))}
          styles="my-4"
        />
        {
          !form.video ?
            <View className="my-4 space-y-2">
              <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
              <View className="w-full h-48 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center">
                <TouchableOpacity className="h-full w-full items-center justify-center">
                  <View className="border border-dashed border-secondary">
                    <Image
                      source={icons.upload}
                      className="h-10 w-10 m-3"
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            :
            <VideoCard
              video={form.video}
            />
        }
        {
          !form.thumbnail ?
            <View className="my-4 space-y-2">
              <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
              <View className="w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center">
                <TouchableOpacity className="h-full w-full flex-row items-center justify-center">
                  <Image
                    source={icons.upload}
                    className="h-8 w-8 m-3"
                    resizeMode="contain"
                  />
                  <Text className="font-pregular text-sm text-white">Choose a file</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <Image
              source={{ uri: form.thumbnail }}
            />
        }

        <FormField
          title="AI Prompt"
          value={form.prompt}
          handleChangeText={(e) => setForm(cur => ({ ...cur, prompt: e }))}
          styles="my-4"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="my-8"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create;
