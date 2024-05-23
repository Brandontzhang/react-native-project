import { TouchableOpacity, Image, Text, View } from "react-native";
import { Video, ResizeMode } from "expo-av";

import { icons } from "../constants";
import { useState } from "react";
import { useGlobalContext } from "@/context/globalProvider";
import { bookmarkVideo } from "@/lib/appwrite";

interface VideoCardProps {
  video: any
}

const VideoCard: React.FC<VideoCardProps> = ({ video: { $id, title, thumbnail, video, users: { avatar, username }, bookmarkUsers } }) => {
  const [play, setPlay] = useState(false);
  const { user } = useGlobalContext();

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-white text-sm" numberOfLines={1}>{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{username}</Text>
          </View>
          <View className="flex-row space-x-2">
            <TouchableOpacity onPress={() => bookmarkVideo($id, bookmarkUsers, user.$id)}>
              <Image
                source={icons.bookmark}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.menu}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            // TODO: there's some error with the types here
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />

      ) :
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-60 rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      }

    </View>
  )
};

export default VideoCard;
