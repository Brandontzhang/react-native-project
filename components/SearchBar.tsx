import { Image, TouchableOpacity, View, TextInput } from "react-native";

import { icons } from "../constants";
import { useRef } from "react";

interface SearchBarProps {
  styles?: string,
  value: string,
  setValue: (s: string) => void,
  handleSearch: () => void,
  placeholder?: string,
}

const SearchBar: React.FC<SearchBarProps> = ({ styles, value, setValue, handleSearch, placeholder }) => {
  const input = useRef<TextInput>(null);

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
          value={value}
          placeholder={placeholder ? placeholder : "Search for a video"}
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setValue(e)}
          enterKeyHint="search"
          onBlur={handleSearch}
        />
      </View>
    </View>
  )
}

export default SearchBar;
