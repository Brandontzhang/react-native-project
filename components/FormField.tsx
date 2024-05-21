import { useState } from "react";
import { Image, KeyboardType, Text, TextInput, TouchableOpacity, View } from "react-native";

import { icons } from "../constants";

interface FormFieldProps {
  title: string,
  value: string,
  placeholder?: string,
  handleChangeText: (e: string) => void,
  styles?: string,
  keyboardType?: KeyboardType,
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, styles, keyboardType }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${styles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="flex-row w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === "Password" &&
          <TouchableOpacity onPress={() => setShowPassword(cur => !cur)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default FormField;
