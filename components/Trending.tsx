import { useState } from "react";
import { FlatList, TouchableOpacity, ImageBackground, Image } from "react-native";
import * as Animatable from 'react-native-animatable';

import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

interface TrendingItemProps {
  isActive: boolean,
  item: any
}

const TrendingItem: React.FC<TrendingItemProps> = ({ isActive, item }) => {
  const [play, setPlay] = useState(false);

  const zoomIn: Animatable.CustomAnimation = {
    0: {
      scaleX: 0.9,
      scaleY: 0.9,
    },
    1: {
      scaleX: 1,
      scaleY: 1,
    }
  }

  const zoomOut = {
    0: {
      scaleX: 1,
      scaleY: 1,
    },
    1: {
      scaleX: 0.9,
      scaleY: 0.9,
    }
  }

  return (
    // TODO: Video player does not work for YouTube
    <Animatable.View
      className="mr-5"
      animation={isActive ? zoomIn : zoomOut}
      duration={500}
    >
      {play ?
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[36px] mt-3 bg-white/10"
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
        :
        <TouchableOpacity
          className="relative justify-center items-center h-full w-full"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[36px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      }
    </Animatable.View>
  )
}

interface TrendingProps {
  posts: any[],
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItemId, setActiveItemId] = useState(posts.length > 0 ? posts[Math.floor(posts.length / 2)].$id : "");

  const viewableItemsChanges = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveItemId(viewableItems[0].item.$id);
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => `${item.$id}`}
      renderItem={({ item }) => (
        <TrendingItem
          isActive={item.$id === activeItemId}
          item={item}
        />
      )}
      onViewableItemsChanged={viewableItemsChanges}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
        y: 0
      }}
      horizontal
    >
    </FlatList>
  )
}

export default Trending;
