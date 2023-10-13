import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const OnboardScreen = ({navigation}) => {
  return (
    <View className='flex-1 items-center justify-center bg-blue-200'>
      <Image
        source={require('../assets/favicon.png')}
        className='mb-8'
      />
      <Text className='text-3xl font-bold mb-4 text-center'>
        Welcome to Mindful Mastery
      </Text>
      <Text className='text-gray-700 text-center mb-8'>
        Elevate your focus, achieve more, and find balance in your daily life.
      </Text>

      <TouchableOpacity
        className='bg-green-500 py-3 px-6 rounded-full mb-4'
        onPress={() => navigation.navigate('Register')}
      >
        <Text className='text-white font-bold text-lg'>
          Get Started
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        className='flex-row items-center'
      >
        <Text className='text-gray-600 mr-2'>Already have an account?</Text>
        <Text className='text-blue-500 font-bold'>Log in</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OnboardScreen