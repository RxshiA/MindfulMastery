import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';


const MusicScreen = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = () => {
    setPlaying(!isPlaying);
  };

  const handleSliderChange = (value) => {
    setProgress(value);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/music.png')} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Calm Playlist</Text>
        <Text style={styles.artist}>Play Next</Text>

        <Slider
          style={styles.slider}
          value={progress}
          onValueChange={handleSliderChange}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />

        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayback}>
            <Text style={styles.playPauseButton}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: undefined,
    height: undefined,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  artist: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  playPauseButton: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MusicScreen;
