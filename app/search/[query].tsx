import { Text, View, RefreshControl } from "react-native"
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "@/hooks/useAppwrite";

import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { searchPosts } from "@/lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const search = async () => {
    let searchString = "";
    if (query && query.length > 0) {
      searchString = query as string;
    }

    const posts = await searchPosts(searchString);
    return posts;
  }

  const { data: posts, refetch: refetchPosts } = useAppwrite(search);

  useEffect(() => {
    refetchPosts();
  }, [query])


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
            <View className="my-4">
              <Text className="text-white font-psemibold text-sm">Search Results</Text>
              <Text className="text-white font-psemibold text-2xl">{query}</Text>
            </View>
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this query"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
      </FlatList>
    </SafeAreaView>

  )
}

export default Search;
