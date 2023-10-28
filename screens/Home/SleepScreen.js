import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SleepTimer from './SleepTimer';

const SleepScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('SleepTimer');
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={require('../../assets/night.jpg')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }} />
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 30, color: '#E6E7F2', textAlign: 'center', marginBottom: 20, fontFamily: 'AnekOdia-Bold' }}>Welcome to Sleep</Text>
        <Text style={{ fontFamily: 'AbhayaLibre-ExtraBold', fontSize: 16, color: '#EBEAEC', textAlign: 'center', marginBottom: 20, lineHeight: 24 }}>
          Discover the emerging sleep champion that{'\n'}
          employs a combination of soundscapes and{'\n'}
          visual elements to craft an ideal environment{'\n'}
          for rejuvenating rest.
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 36 }}>
        <TouchableOpacity style={{ backgroundColor: '#2196F3', padding: 15, borderRadius: 10, alignSelf: 'center', width: '90%' }} onPress={handleGetStarted}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SleepScreen;
