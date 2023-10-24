import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const TranquilStart = ({ navigation }) => {

  const handleGetStarted = () => {
    navigation.navigate('TranquilMiddle');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 16 }}>
      {/* Blue Slider with Circle at 0th Position */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
        <View style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
        <View style={{ height: 12, width: 12, backgroundColor: '#3D8DFF', borderRadius: 6, position: 'absolute', left: 40 }} />
        <View style={{ height: 12, width: 12, backgroundColor: '#CED6DF', borderRadius: 6, position: 'absolute', right: 187 }} />
        <View style={{ height: 12, width: 12, backgroundColor: '#CED6DF', borderRadius: 6, position: 'absolute', right: 40 }} />
      </View>

      {/* Heading */}
      <Text style={{ color: '#38a69d', fontSize: 24, fontFamily: 'Archivo-SemiBold', marginVertical: 16 }}>Tour to Tranquil</Text>

      {/* Image */}
      <Image source={require('../../assets/tranquilMail.png')} style={{ width: 200, height: 200, borderRadius: 8, marginVertical: 16 }} />

      <View>
        <Text style={{ textAlign: 'left',marginTop: 50, fontFamily: 'KantumruyPro-Regular', fontSize: 16 }}>
          Discover your next <Text style={{ color: '#5F97FF' }}>Tranquil</Text> via our app. This will be the upgrade of your mental health.
        </Text>
        <Text style={{ marginBottom: 16, fontFamily: 'KantumruyPro-Regular', fontSize: 15, color: '#748393' }}>
          We will provide you the locations for your mindfulness gain
        </Text>
      </View>


      <Text style={{ marginTop:90, marginBottom:10, color: '#5F97FF', fontFamily: 'Archivo-SemiBold', fontSize: 16 }}>
        Remind Me Later
      </Text>
      {/* Get Started Button */}
      <TouchableOpacity onPress={handleGetStarted} style={{ backgroundColor: '#202832', paddingHorizontal: 136, paddingVertical:16, borderRadius: 8}}>
        <Text style={{ color: 'white', fontSize: 18 }}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TranquilStart;
