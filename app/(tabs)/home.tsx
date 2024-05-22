import { Image, Text, View, RefreshControl } from "react-native"
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { images } from "../../constants";
import useAppwrite from "@/hooks/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";

import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/globalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, refetch: refetchPosts } = useAppwrite(getAllPosts);
  const { data: latestPosts, refetch: refetchLatestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPosts();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.$id}`}
        renderItem={({ item }) => (
          <View>
            <VideoCard
              video={item}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-gray-100">{user!.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular mb-3 text-gray-100">Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Create a Video!"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
      </FlatList>
    </SafeAreaView>
  )
}

export default Home;
