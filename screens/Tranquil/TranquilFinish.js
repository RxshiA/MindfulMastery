import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const TranquilFinish = ({ navigation }) => {
  const handleFinish = () => {
    navigation.navigate('TranquilMap');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 16, marginTop: 30 }}>
      {/* Blue Slider with Circle at 0th Position */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
        <View style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
        <View style={{ height: 12, width: 12, backgroundColor: '#3D8DFF', borderRadius: 6, position: 'absolute', left: 40 }} />
        <View style={{ height: 12, width: 12, backgroundColor: '#3D8DFF', borderRadius: 6, position: 'absolute', right: 40 }} />
        <View style={{ height: 12, width: 12, backgroundColor: '#3D8DFF', borderRadius: 6, position: 'absolute', right: 187 }} />
      </View>

      {/* Image */}
      <Image source={require('../../assets/illus.png')} style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 26, marginTop: 60 }} />

      <Text style={{ color: '#70A2FF', fontSize: 44, fontFamily: 'Archivo-SemiBold', marginVertical: 16 }}>Success ! </Text>

      <Text style={{ textAlign: 'center', marginBottom: 56 }}>
        You've successfully entered details to get {'\n'} your <Text className='text-blue-600'>tranquil </Text> place
      </Text>

      <TouchableOpacity onPress={handleFinish} style={{ backgroundColor: '#202832', paddingHorizontal: 146, paddingVertical: 16, borderRadius: 8, marginTop:100 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Finish</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default TranquilFinish