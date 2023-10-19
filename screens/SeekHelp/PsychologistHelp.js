import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PsychologistHelp = () => {
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [psychologists] = useState([
    { id: 1, name: 'Dr. Smith', contactNumber: '+94 11 1234567', address: '123 Main St, Colombo 01', location: { latitude: 6.8871, longitude: 79.8612 } },
    { id: 2, name: 'Dr. Johnson', contactNumber: '+94 11 2345678', address: '456 First St, Colombo 02', location: { latitude: 6.8710, longitude: 79.8617 } },
    { id: 3, name: 'Dr. Williams', contactNumber: '+94 11 3456789', address: '789 Center St, Colombo 03', location: { latitude: 6.9271, longitude: 79.8475 } },
    { id: 4, name: 'Dr. Davis', contactNumber: '+94 11 4567890', address: '101 Second St, Colombo 04', location: { latitude: 6.8871, longitude: 79.8675 } },
    { id: 5, name: 'Dr. Brown', contactNumber: '+94 11 5678901', address: '202 Park St, Colombo 05', location: { latitude: 6.9271, longitude: 79.8682 } },
    { id: 6, name: 'Dr. Miller', contactNumber: '+94 11 6789012', address: '303 Oak St, Colombo 06', location: { latitude: 6.8271, longitude: 79.8679 } },
    { id: 7, name: 'Dr. Garcia', contactNumber: '+94 11 7890123', address: '404 Pine St, Colombo 07', location: { latitude: 6.9071, longitude: 79.8664 } },
    { id: 8, name: 'Dr. Rodriguez', contactNumber: '+94 11 8901234', address: '505 Elm St, Colombo 08', location: { latitude: 6.9171, longitude: 79.8676 } },
    { id: 9, name: 'Dr. Martinez', contactNumber: '+94 11 9012345', address: '606 Maple St, Colombo 09', location: { latitude: 6.8771, longitude: 79.8668 } },
    { id: 10, name: 'Dr. Jackson', contactNumber: '+94 11 0123456', address: '707 Birch St, Colombo 10', location: { latitude: 6.8971, longitude: 79.8671 } },
  ]);
  
  

  const handleSearch = () => {
    const result = psychologists.filter((psychologist) =>
      psychologist.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleMarkerPress = (psychologist) => {
    setSelectedPsychologist(psychologist);
  };

  return (
    <View className='flex-1 p-4 pt-16'>
      <Text className='text-2xl mb-7 text-center font-medium'>Psychologists near you</Text>
      
      {/* Search Input */}
      <TextInput
        className='h-12 border border-gray-300 mb-4 px-4'
        placeholder="Search Psychologists"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} />

      {/* Map */}
      <MapView className='flex-1 mb-4' initialRegion={{ latitude: 6.9271, longitude: 79.8612, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
        {psychologists.map((psychologist) => (
          <Marker
            key={psychologist.id}
            coordinate={psychologist.location}
            title={psychologist.name}
            onPress={() => handleMarkerPress(psychologist)}
          />
        ))}
      </MapView>

      {/* Selected Psychologist Details */}
      {selectedPsychologist && (
        <View className='bg-white p-4 rounded-lg shadow'>
          <Text className='text-2xl font-bold mb-2'>Selected Psychologist</Text>
          <Text>Name: {selectedPsychologist.name}</Text>
            <Text>Contact Number: {selectedPsychologist.contactNumber}</Text>
            <Text>Address: {selectedPsychologist.address}</Text>
          {/* Add more details as needed */}
        </View>
      )}
    </View>
  );
};

export default PsychologistHelp;