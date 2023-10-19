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

  const handleMarkerPress = (tranquil) => {
    setSelectedTranquil(tranquil);
  };

  return (
    <View className='flex-1 p-4 pt-16'>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} style={{ position: 'absolute', top: 46, left: 26, zIndex: 12 }}>
        <Image source={require('../../assets/back.png')} style={{ width: 44, height: 44 }} />
      </TouchableOpacity>

      {/* Rest of the code remains unchanged */}
      <Text className='text-2xl mb-7 text-center font-medium'>Mindful Places {'\n'} generated for you</Text>
      {/* ... (rest of the code) */}

      
      {/* Search Input */}
      <TextInput
        className='h-12 border border-gray-300 mb-4 px-4'
        placeholder="Search Tranquils"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      {/* Map */}
      <MapView className='flex-1 mb-4' initialRegion={{ latitude: 6.9271, longitude: 79.8612, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
        {tranquils.map((tranquil) => (
          <Marker
            key={tranquil.id}
            coordinate={tranquil.location}
            title={tranquil.name}
            onPress={() => handleMarkerPress(tranquil)}
          />
        ))}
      </MapView>

      {/* Selected Tranquil Details */}
      {selectedTranquil && (
        <View className='bg-white p-4 rounded-lg shadow'>
          <Text className='text-2xl font-bold mb-2'>Selected Place</Text>
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