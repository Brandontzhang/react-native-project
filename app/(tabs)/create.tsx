import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";

interface FormType {
  title: string,
  video: DocumentPicker.DocumentPickerAsset | null,
  thumbnail: ImagePicker.ImagePickerAsset | null,
  prompt: string,
}

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormType>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectType: string) => {
    let type: string[] = [];
    switch (selectType) {
      case 'image':
        type = ['image/jpg', 'img/jpeg'];
        break;
      case 'video':
        type = ['video/quicktime', 'video/mp4'];
        break;
      default:
        type = ['*/*'];
    }

    if (selectType == "image") {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        setForm(cur => ({ ...cur, thumbnail: result.assets[0] }))
      }
    } else if (selectType == "video") {
      const result = await DocumentPicker.getDocumentAsync({
        type: type
      });
      if (!result.canceled) {
        setForm(cur => ({ ...cur, video: result.assets[0] }))
      }
    }
    return;
  }

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert("Please fill in all the fields");
      return;
    }

    setUploading(true);

    try {
      await createVideo({
        ...form,
        userId: user!.$id
      });

      Alert.alert('Success', "Post uploaded");
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    } finally {
      setUploading(false);
    }
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
        <View className="my-4 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          {
            !form.video ?
              <View className="w-full h-48 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center">
                <TouchableOpacity
                  className="h-full w-full items-center justify-center"
                  onPress={() => openPicker('video')}
                >
                  <View className="border border-dashed border-secondary">
                    <Image
                      source={icons.upload}
                      className="h-10 w-10 m-3"
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              :
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-60 rounded-xl"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                  // TODO: there's some error with the types here
                  // console.log(status);
                }}
              />
          }
        </View>

        <View className="my-4 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
          {
            !form.thumbnail ?
              <View className="w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center">
                <TouchableOpacity
                  className="h-full w-full flex-row items-center justify-center"
                  onPress={() => openPicker('image')}
                >
                  <Image
                    source={icons.upload}
                    className="h-8 w-8 m-3"
                    resizeMode="contain"
                  />
                  <Text className="font-pregular text-sm text-white">Choose a file</Text>
                </TouchableOpacity>
              </View>
              :
              <View className="h-48 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary w-full items-center justify-center">
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  className="h-full w-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
          }
        </View>

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
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView >
  )
}

export default Create;
