import { Text, TouchableOpacity } from "react-native"

interface CustomButtonProps {
  title: string,
  handlePress: () => void,
  containerStyles?: string,
  textStyles?: string,
  isLoading?: boolean,
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      className={
        `bg-secondary-200 rounded-xl p-4 items-center justify-center min-h-[62px] ${containerStyles} ${isLoading && 'opacity-50'}`
      }
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text
        className={`text-primary font-psemibold text-lg ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton;
