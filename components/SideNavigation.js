import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const SideNavigation = () => {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        console.log('Navigating to:', screenName);
        navigation.navigate(screenName);
    };
  
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Navigation Panel</Text>
        <TouchableOpacity onPress={() => navigateToScreen('Home')}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Music')}>
          <Text style={{ fontSize: 12, marginBottom: 10 }}> Music Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Sleep')}>
          <Text style={{ fontSize: 12, marginBottom: 10 }}> Sleep Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Help')}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Seek Help</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Visualisations')}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Visualisations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Journal')}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Pomodoro')}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Tranquil')}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Tranquil</Text>
        </TouchableOpacity>
      </View>
    );
}

export default SideNavigation