import { Image, TextInput, TouchableOpacity, View } from "react-native"

import { icons } from "../constants";
import { useRef, useState } from "react";
import { router, usePathname } from "expo-router";

interface SearchInputProps {
  styles?: string,
}

const SearchInput: React.FC<SearchInputProps> = ({ styles }) => {
  const [searchQuery, setQuery] = useState("");
  const pathname = usePathname();
  const input = useRef<TextInput>(null);

  const handleSearch = () => {
    if (pathname.startsWith('/search')) {
      router.setParams({ query: searchQuery });
    } else {
      router.push(`/search/${searchQuery}`);
    }
  }

  return (
    <View className={`space-y-2 ${styles}`}>
      <View className="flex-row w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TouchableOpacity
          onPress={() => input.current?.focus()}
          className="mr-2"
        >
          <Image
            source={icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TextInput
          ref={input}
          className="flex-1 text-white font-pregular text-base"
          value={searchQuery}
          placeholder="Search for a video"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
          enterKeyHint="search"
          onEndEditing={handleSearch}
        />
      </View>
    </View>
  )
}

export default SearchInput;
