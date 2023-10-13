import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Button } from 'react-native'
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig'

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout'/>
    </View>
  )
}

export default HomeScreen