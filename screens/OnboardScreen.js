import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';

const OnboardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/mainBackground.png')}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <View style={styles.absoluteContainer}>
          <ImageBackground
            source={require('../assets/BackgroundSplash.png')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 50,
              width: '100%',
            }}
          >
            <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 36, marginBottom: 4, color: 'white', textAlign: 'center' }}>
              The first and best {'\n'} victory is to {'\n'} conquer self
            </Text>
            <Text style={{ fontFamily: 'Sora-Regular', fontSize: 16, color: '#A9A9A9', textAlign: 'center', marginBottom: 8 }}>
              Begin your mindfulness journey today, {'\n'}not tomorrow 
            </Text>

            <TouchableOpacity
              style={{ backgroundColor: '#C67C4E', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 14, marginBottom: 4, width: '80%', height: '15%', alignItems: 'center' }}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={{ fontFamily: 'Sora-SemiBold', fontSize: 16, color: '#fff' }}>
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontFamily: 'Sora-Regular', color: '#A9A9A9', marginRight: 8 }}>Already have an account?</Text>
              <Text style={{ fontFamily: 'Sora-Regular', color: '#007BFF' }}>Log in</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    top: '50%', 
  },
});

export default OnboardScreen;
