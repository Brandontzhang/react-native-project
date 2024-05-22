import { useState } from "react";
import { FlatList, Image, Text, View, RefreshControl, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "@/hooks/useAppwrite";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { router } from "expo-router";

import { useGlobalContext } from "@/context/globalProvider";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";



import { icons } from "../../constants";

const Profile = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPosts();
    setRefreshing(false);
  }

  if (!user) {
    router.replace("/sign-in");
  }

  const { avatar, username, $id } = user;

  const search = async () => {
    const posts = await getUserPosts($id);
    return posts;
  }

  const { data: posts, refetch: refetchPosts } = useAppwrite(search);

  const logout = async () => {
    await signOut();

    router.replace('/sign-in');
  }

  // TODO: add # of posts and # views to database
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full mt-10 items-center relative">
        <View className="w-16 h-16 rounded-lg border border-secondary justify-center items-center p-0.5">
          <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
        </View>
        <Text className="text-white font-psemibold text-2xl my-2">{username}</Text>
        <View className="mt-4 mb-6 flex-row gap-x-10">
          <View className="items-center">
            <Text className="text-white text-2xl font-psemibold">10</Text>
            <Text className="text-white text-xl font-pregular">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-2xl font-psemibold">120k</Text>
            <Text className="text-white text-xl font-pregular">Views</Text>
          </View>
        </View>

        <View className="absolute right-8 top-0">
          <TouchableOpacity
            onPress={logout}
          >
            <Image
              source={icons.logout}
              className="h-7 w-7"
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        className="overflow-scroll"
        data={posts}
        keyExtractor={(item) => `${item.$id}`}
        renderItem={({ item }) => (
          <View>
            <VideoCard
              video={item}
            />
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

export default Profile;
