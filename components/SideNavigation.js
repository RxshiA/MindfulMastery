import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SideNavigation = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    console.log('Navigating to:', screenName);
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, marginVertical: 35, fontFamily: 'EBGaramond-MediumItalic' }}>Navigation Panel</Text>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Text style={{ fontSize: 18, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Music')}>
        <Text style={{ fontSize: 12, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}> Music Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Sleep')}>
        <Text style={{ fontSize: 12, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}> Sleep Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Help')}>
        <Text style={{ fontSize: 18, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}>Seek Help</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Visualisations')}>
        <Text style={{ fontSize: 18, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}>Visualisations</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Journal')}>
        <Text style={{ fontSize: 18, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}>Journal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Pomodoro')}>
        <Text style={{ fontSize: 18, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}>Pomodoro</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Tranquil')}>
        <Text style={{ fontSize: 18, marginBottom: 10, fontFamily:'EBGaramond-Regular' }}>Tranquil</Text>
      </TouchableOpacity>

      {/* Image at the bottom */}
      <Image
        source={require('../assets/greenMount.png')}
        style={{ width: 250, height: 250, marginTop: 'auto' }}
      />
    </View>
  );
};

export default SideNavigation;
