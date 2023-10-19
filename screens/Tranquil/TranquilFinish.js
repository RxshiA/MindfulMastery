import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const TranquilFinish = ({ navigation }) => {
    const handleFinish = () => {
        navigation.navigate('TranquilMap');
      };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 56 }}>
        <View style={{ height: 4, width: '100%', backgroundColor: 'black' }} />
        <View style={{ height: 12, width: 12, backgroundColor: 'blue', borderRadius: 6, position: 'absolute', left: 350 }} />
      </View>

      {/* Image */}
      <Image source={require('../../assets/correct.png')} style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 26 }} />

        {/* Heading */}
      <Text style={{ color: '#38a69d', fontSize: 24, fontWeight: 'bold', marginBottom: 56 }}>Success</Text>
    
      <Text style={{ textAlign: 'center', marginBottom: 56 }}>
  You've successfully entered details to get {'\n'} your <Text className='text-blue-600'>tranquil </Text> place
</Text>

        <TouchableOpacity onPress={handleFinish} style={{ backgroundColor: 'black', padding: 16, borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default TranquilFinish