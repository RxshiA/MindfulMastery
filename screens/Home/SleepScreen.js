import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SleepTimer from './SleepTimer';

const SleepScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('SleepTimer');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/night.jpg')} style={styles.backgroundImage} />
      <View style={styles.overlay}/>
      <Text style={styles.headline}>Welcome to Sleep</Text>
        <Text style={styles.description}>
          Discover the emerging sleep champion that{'\n'}
          employs a combination of soundscapes and{'\n'}
          visual elements to craft an ideal environment{'\n'}
          for rejuvenating rest.
        </Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headline: {
    fontSize: 30,
    color: '#E6E7F2',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'AnekOdia-Bold',
  },
  description: {
    fontFamily: 'AbhayaLibre-ExtraBold',
    fontSize: 16,
    color: '#EBEAEC',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36, // Adjust as needed
  },
  getStartedButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SleepScreen;
