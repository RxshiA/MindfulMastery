import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const TranquilStart = ({ navigation }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [inputText, setInputText] = useState('');
  const meditationPlaces = ['Park', 'Coffee Shop', 'Yoga Center', 'Temple', 'Church', 'Mall'];

  const handleToggleSelection = (word) => {
    setSelectedWords((prevSelected) => {
      if (prevSelected.includes(word)) {
        return prevSelected.filter((selectedWord) => selectedWord !== word);
      } else {
        return [...prevSelected, word];
      }
    });
  };

  const handleGetStarted = () => {
    navigation.navigate('TranquilFinish');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      {/* Blue Slider with Circle at 0th Position */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ height: 4, width: '100%', backgroundColor: 'black' }} />
        <View style={{ height: 12, width: 12, backgroundColor: 'blue', borderRadius: 6, position: 'absolute', left: 40 }} />
      </View>

      {/* Heading */}
      <Text style={{ color: '#38a69d', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Tour to Tranquil</Text>

      {/* Image */}
      <Image source={require('../../assets/tranquil.jpeg')} style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 16 }} />

      {/* First Question with Writable Blank Boxes */}
      <Text style={{ textAlign: 'center', marginBottom: 16 }}>
        What are the first words that pop into your head when you think of <Text className='text-blue-600'>tranquil?</Text>
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 24 }}>
        {/* Three Writable Blank Boxes */}
        {[1, 2, 3].map((index) => (
          <TextInput
          placeholder='Enter Word'
            key={index}
            style={{
              backgroundColor: 'white',
              height: 30,
              width: 100,
              marginHorizontal: 8,
              borderRadius: 8,
              textAlign: 'center',
              placeholderTextColor: 'gray'
            }}
            onChangeText={(text) => {
              // You can handle the input text as needed
              setInputText(text);
            }}
          />
        ))}
      </View>

      {/* Second Question */}
      <Text style={{ textAlign: 'center', marginBottom: 16 }}>Select each word that is a place for meditation</Text>

      {/* Meditation Places Buttons */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
        {meditationPlaces.map((place) => (
          <TouchableOpacity
            key={place}
            onPress={() => handleToggleSelection(place)}
            style={{
              backgroundColor: selectedWords.includes(place) ? '#759694' : '#303b3a',
              padding: 10,
              margin: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white' }}>{place}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Get Started Button */}
      <TouchableOpacity onPress={handleGetStarted} style={{ backgroundColor: 'black', padding: 16, borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TranquilStart;
