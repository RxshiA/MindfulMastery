import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const TranquilMiddle2 = ({ navigation }) => {
    const [selectedWords, setSelectedWords] = useState([]);
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

    const handleNext = () => {
        navigation.navigate('TranquilFinish');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 16, marginTop: 30 }}>
            {/* Blue Slider with Circle at 0th Position */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                <View style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
                <View style={{ height: 12, width: 12, backgroundColor: '#3D8DFF', borderRadius: 6, position: 'absolute', left: 40 }} />
                <View style={{ height: 12, width: 12, backgroundColor: '#CED6DF', borderRadius: 6, position: 'absolute', right: 40 }} />
                <View style={{ height: 12, width: 12, backgroundColor: '#3D8DFF', borderRadius: 6, position: 'absolute', right: 187 }} />
            </View>

            {/* Heading */}
            <Text style={{ color: '#38a69d', fontSize: 24, fontFamily: 'Archivo-SemiBold', marginVertical: 16 }}>Confirm The Places</Text>

            <Text style={{ textAlign: 'left', fontFamily: 'KantumruyPro-Regular', fontSize: 14 }}>
                Select each word that is a place for meditation
            </Text>

            <Text style={{ fontFamily: 'Archivo-SemiBold', fontSize: 100, color: '#54F0D1', marginTop:20 }}>
                3.
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 114 }}>
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

            <TouchableOpacity onPress={handleNext} style={{ backgroundColor: '#202832', paddingHorizontal: 156, paddingVertical: 16, borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default TranquilMiddle2;
