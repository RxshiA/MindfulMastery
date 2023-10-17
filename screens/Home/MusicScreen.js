import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

const MusicScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/music.jpeg')} style={styles.backgroundImage} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch', // Stretch to fill the width
      justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      width: undefined, // Use undefined to respect aspect ratio
      height: undefined, // Use undefined to respect aspect ratio
    },
  });
   
    
export default MusicScreen;
