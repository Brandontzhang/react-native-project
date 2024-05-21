import { Link } from "expo-router";
import { Text, View } from "react-native"

const Index = () => {
  return (
    <View className="h-full w-full justify-center items-center">
      <Text>Index</Text>
      <Link href="/home">Home</Link>
    </View>
  )
}

export default Index;
