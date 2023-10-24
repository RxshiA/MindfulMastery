import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const TranquilMap = () => {
  const navigation = useNavigation();
  const [selectedTranquil, setSelectedTranquil] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [tranquils] = useState([
    { id: 1, name: "St. Smith's Park", hours: '24 Hrs', address: '123 Main St, Colombo 01', location: { latitude: 6.8871, longitude: 79.8612 } },
    { id: 2, name: 'Clinton Park', hours: '24 Hrs', address: '456 First St, Colombo 02', location: { latitude: 6.8710, longitude: 79.8617 } },
    { id: 3, name: 'Recreation Dept', hours: '9AM-6PM', address: '789 Center St, Colombo 03', location: { latitude: 6.9271, longitude: 79.8475 } },
    { id: 4, name: 'Liveliness Park', hours: '24 Hrs', address: '101 Second St, Colombo 04', location: { latitude: 6.8871, longitude: 79.8675 } },
    { id: 5, name: "Brown's Park", hours: '24 Hrs', address: '202 Park St, Colombo 05', location: { latitude: 6.9271, longitude: 79.8682 } },
    { id: 6, name: 'Miller Arena', hours: '9AM-11PM', address: '303 Oak St, Colombo 06', location: { latitude: 6.8271, longitude: 79.8679 } },
    { id: 7, name: 'Garcia Place', hours: '8AM-10PM', address: '404 Pine St, Colombo 07', location: { latitude: 6.9071, longitude: 79.8664 } },
    { id: 8, name: 'Rodriguez Coffee', hours: '24 Hrs', address: '505 Elm St, Colombo 08', location: { latitude: 6.9171, longitude: 79.8676 } },
    { id: 9, name: 'Zen Temple', hours: '24 Hrs', address: '606 Maple St, Colombo 09', location: { latitude: 6.8771, longitude: 79.8668 } },
    { id: 10, name: 'Ave Maria Church', hours: '24 Hrs', address: '707 Birch St, Colombo 10', location: { latitude: 6.8971, longitude: 79.8671 } },
  ]);



  const handleSearch = () => {
    const result = tranquils.filter((tranquil) =>
      tranquil.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleBackButton = () => {
    navigation.navigate('Home');
  };

  const handleMarkerPress = (tranquil) => {
    setSelectedTranquil(tranquil);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
        onPress={handleBackButton}
      >
        <Image source={require('../../assets/back.png')} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>

      {/* Map */}
      <MapView style={{ flex: 1 }} initialRegion={{ latitude: 6.9271, longitude: 79.8612, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
        {tranquils.map((tranquil) => (
          <Marker
            key={tranquil.id}
            coordinate={tranquil.location}
            title={tranquil.name}
            onPress={() => handleMarkerPress(tranquil)}
          />
        ))}
      </MapView>

      <Text style={{ position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center', fontFamily: 'Popins-Bold', fontSize: 20 }}>
        Mindful Places {'\n'} Generated For You
      </Text>

      {/* Search Input */}
      <View style={{ position: 'absolute', top: 100, left: 0, right: 0, alignItems: 'center' }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 100,
            paddingHorizontal: 10,
            backgroundColor: 'white',
            width: '85%'
          }}
          placeholder="Try coffee, temples, parks..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Selected Tranquil Details */}
      {selectedTranquil && (
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Selected Place</Text>
          <Text>Name: {selectedTranquil.name}</Text>
          <Text>Open Hours: {selectedTranquil.hours}</Text>
          <Text>Address: {selectedTranquil.address}</Text>
          {/* Add more details as needed */}
        </View>
      )}
    </View>
  );
}

export default TranquilMap