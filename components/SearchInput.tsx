import { Image, TextInput, TouchableOpacity, View } from "react-native"

import { icons } from "../constants";
import { useRef } from "react";

interface SearchInputProps {
  value: string,
  placeholder?: string,
  handleChangeText: (e: string) => void,
  styles?: string,
}

const SearchInput: React.FC<SearchInputProps> = ({ value, placeholder, handleChangeText, styles }) => {
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
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  )
}

export default SearchInput;
