import { FlatList, Text, View, SafeAreaView, RefreshControl } from "react-native"
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import useAppwrite from "@/hooks/useAppwrite";
import { getAllPosts, getBookmarkVideos } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/globalProvider";
import VideoCard from "@/components/VideoCard";

const Bookmark = () => {
  const [query, setQuery] = useState('');
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();

  const fetchData = async () => {
    // WARN: Appwrite doesn't support relationship querying
    // const data = await getBookmarkVideos(user.$id);

    // WARN: Temporary workaround by filtering on client side
    const data = await getAllPosts();

    return data.filter(post => post.bookmarkUsers.map((user: { $id: string }) => user.$id).includes(user.$id));
  }
  const { data: posts, refetch } = useAppwrite(fetchData);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  useEffect(() => {
    if (query.length > 0) {
      setBookmarkedPosts(posts.filter(posts => posts.title.includes(query)))
    } else {
      setBookmarkedPosts(posts);
    }
  }, [posts]);

  return (
    <SafeAreaView className="bg-primary">
      <View className="h-full bg-primary m-4">
        <View className="w-full my-4 space-y-6">
          <Text className="text-white font-psemibold text-3xl">Saved Videos</Text>
          <SearchBar
            value={query}
            setValue={setQuery}
            handleSearch={refetch}
            placeholder="Search your saved videos"
            styles="my-4"
          />
        </View>

        <FlatList
          data={bookmarkedPosts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => (
            <View>
              <VideoCard
                video={item}
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="h-full justify-center items-center">
              <Text className="text-3xl text-white font-pregular">No saved videos</Text>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    </SafeAreaView>
  )
}

export default Bookmark;
