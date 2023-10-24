import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const TranquilMiddle = ({ navigation }) => {
    const [userInputs, setUserInputs] = useState(Array(12).fill(''));

    const handleNext = () => {
        navigation.navigate('TranquilMiddle2');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 16, marginTop: 30 }}>
            {/* Blue Slider with Circle at 0th Position */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                <View style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
                <View style={{ height: 12, width: 12, backgroundColor: '#3D8DFF', borderRadius: 6, position: 'absolute', left: 40 }} />
                <View style={{ height: 12, width: 12, backgroundColor: '#CED6DF', borderRadius: 6, position: 'absolute', right: 40 }} />
                <View style={{ height: 12, width: 12, backgroundColor: '#CED6DF', borderRadius: 6, position: 'absolute', right: 187 }} />
            </View>

            {/* Heading */}
            <Text style={{ color: '#38a69d', fontSize: 24, fontFamily: 'Archivo-SemiBold', marginVertical: 16 }}>Write Down Your Emotions</Text>

            <Text style={{ fontFamily: 'KantumruyPro-Regular', fontSize: 14, textAlign: 'center', marginTop: 20 }}>
                What are the first words that pop into your head when you think of a tranquil place?
            </Text>

            {/* Text Input Grid */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 56, marginBottom: 80 }}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    {userInputs.slice(0, 6).map((input, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                            <TextInput
                                style={{ borderWidth: 1, padding: 10, borderRadius: 8, color: 'white', backgroundColor: 'black'}}
                                placeholder={`Word ${index + 1}`}
                                placeholderTextColor={'white'}
                                value={input}
                                onChangeText={(text) => {
                                    const newInputs = [...userInputs];
                                    newInputs[index] = text;
                                    setUserInputs(newInputs);
                                }}
                            />
                        </View>
                    ))}
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    {userInputs.slice(6).map((input, index) => (
                        <View key={index + 6} style={{ marginBottom: 8 }}>
                            <TextInput
                                style={{ borderWidth: 1, padding: 10, borderRadius: 8, color: 'white', backgroundColor: 'black'}}
                                placeholder={`Word ${index + 7}`}
                                placeholderTextColor={'white'}
                                value={input}
                                onChangeText={(text) => {
                                    const newInputs = [...userInputs];
                                    newInputs[index + 6] = text;
                                    setUserInputs(newInputs);
                                }}
                            />
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity onPress={handleNext} style={{ backgroundColor: '#202832', paddingHorizontal: 166, paddingVertical: 16, borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default TranquilMiddle;