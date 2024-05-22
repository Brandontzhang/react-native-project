import { View, FlatList, Text } from "react-native";

interface TrendingProps {
  posts: { id: number }[]
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <View>
          <Text className="text-3xl text-white">
            {item.id}
          </Text>
        </View>
      )}
      horizontal
    >
    </FlatList>
  )
}

export default Trending;
