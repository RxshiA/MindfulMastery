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
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Music Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Sleep')}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Sleep Screen</Text>
        </TouchableOpacity>
      </View>
    );
}

export default SideNavigation