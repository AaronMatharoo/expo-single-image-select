import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {
  Button,
  HStack,
  Icon,
  Image,
  Spinner,
  Text,
} from 'native-base'
import { useColorScheme } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'

const SingleImageUpload = ({
  imageWidth,
  imageHeight,
  round,
}) => {
  const [image, setImage] = useState<string | undefined>('')
  const [profilePic, setProfilePic] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setIsLoading(true)
      setImage(result.assets[0].uri)
      setProfilePic(true)
      setIsLoading(false)
    }
  }

  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <>
      <HStack
        pt={3}
        w={'full'}
        justifyContent={'space-evenly'}
        space={profilePic ? 4 : 2}
        alignItems={'center'}
      >
        {profilePic ? (
          <>
            {isLoading ? (
              <Spinner size="small" color={isDark ? 'white' : 'black'} />
            ) : (
              <Image
                rounded={round ? 'full' : 'sm'}
                alt="Uploaded Photo"
                source={{ uri: image }}
                style={{ width: imageWidth, height: imageHeight }}
              />
            )}
          </>
        ) : (
          <MaterialIcons
            color={isDark ? 'white' : 'black'}
            name="account-circle"
            size={50}
          />
        )}
        <Button onPress={pickImage} p={2} rounded={'md'}>
          <HStack space={2} alignItems={'center'}>
            <Icon as={Feather} size={5} name="upload" color={'white'} />
            <Text color={'white'} fontWeight={'semibold'} fontSize={16}>
              Set Profile Picture
            </Text>
          </HStack>
        </Button>
      </HStack>
    </>
  )
}

module.exports = SingleImageUpload
