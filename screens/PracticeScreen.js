import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';

const PracticeScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const exercises = [
        { id: 1, name: 'Morning Stretch', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Start your day with a simple morning stretch routine. Focus on gentle movements to wake up your body and improve flexibility.' },
        { id: 2, name: 'Core Strength', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Build a strong core with this beginner-friendly workout. Target your abs and lower back for improved stability and posture.' },
        { id: 3, name: 'Leg Day', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Strengthen your legs with this workout. Incorporate lunges, squats, and leg lifts for toned and strong lower limbs.' },
        { id: 4, name: 'Cardio Blast', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Get your heart pumping with a cardio blast. Simple exercises like jumping jacks, high knees, and jogging in place will boost your cardiovascular health.' },
        { id: 5, name: 'Upper Body Toning', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Focus on your upper body with exercises targeting arms, shoulders, and chest. Use light weights or bodyweight for toning and definition.' },
        { id: 6, name: 'Yoga Flow', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Experience the benefits of yoga with a gentle flow. Improve flexibility, balance, and mental well-being with this yoga session.' },
        { id: 7, name: 'Full-Body Circuit', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Engage your entire body with a full-body circuit. Combine strength and cardio exercises for a well-rounded workout.' },
        { id: 8, name: 'Pilates for Beginners', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Introduce yourself to Pilates with beginner-friendly moves. Focus on core strength, flexibility, and controlled movements.' },
        { id: 9, name: 'Quick Ab Workout', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Target your abdominal muscles with a quick and effective ab workout. Strengthen your core for improved posture and stability.' },
        { id: 10, name: 'Resistance Band Routine', level: 'Beginner', image: require('../assets/exercise.jpeg'), details: 'Incorporate resistance bands into your workout for added resistance. Improve strength and muscle tone with this resistance band routine.' },
    ];

    const meditations = [
        { id: 1, name: 'Mindful Breathing', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Practice mindfulness through focused breathing. Clear your mind and reduce stress by paying attention to each breath.' },
        { id: 2, name: 'Guided Relaxation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Relax your body and mind with a guided meditation. Follow soothing instructions to release tension and find calmness.' },
        { id: 3, name: 'Body Scan Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Scan your body and release tension with this guided meditation. Bring awareness to each part of your body for relaxation.' },
        { id: 4, name: 'Loving-Kindness Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Cultivate feelings of love and kindness with this meditation. Focus on sending positive vibes to yourself and others.' },
        { id: 5, name: 'Breath Awareness Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Enhance mindfulness by focusing on your breath. Pay attention to the sensations of each inhale and exhale for a calming experience.' },
        { id: 6, name: 'Nature Sounds Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Immerse yourself in nature sounds during meditation. Connect with the calming sounds of birds, water, and rustling leaves.' },
        { id: 7, name: 'Gratitude Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Cultivate gratitude with this meditation. Reflect on the things you are thankful for and embrace a positive mindset.' },
        { id: 8, name: 'Mindful Walking Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Combine meditation with movement. Practice mindful walking to enhance awareness and relaxation.' },
        { id: 9, name: 'Chakra Balancing Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Balance your energy centers with a chakra meditation. Visualize each chakra spinning and radiating positive energy.' },
        { id: 10, name: 'Candle Gazing Meditation', level: 'Beginner', image: require('../assets/meditation.jpeg'), details: 'Focus your attention on a candle flame. Use this meditation to enhance concentration and inner calm.' },
    ];

    const filteredExercises = exercises.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    const filteredMeditations = meditations.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));

    const renderItems = (items) => {
        return items.map(item => (
            <TouchableOpacity key={item.id} onPress={() => setSelectedItem(item)}>
                <View style={{
                    marginBottom: 16,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    padding: 8,
                    width: 375,
                }}>
                    <Image source={item.image} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 16,
                    }} />
                    <View>
                        <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Epilogue-Bold' }}>{item.name}</Text>
                        <Text style={{ color: '#555555', fontSize: 12, fontFamily: 'Epilogue-Regular' }}>{item.level}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        ));
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 8,
                    marginBottom: 16,
                    paddingHorizontal: 8,
                    color: 'white',
                }}
                placeholder="Search"
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />

            <Text style={{
                fontSize: 23,
                fontFamily: 'Epilogue-Regular',
                marginTop: 16,
                marginBottom: 12,
                color: '#888888',
            }}>Exercises</Text>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}>
                {renderItems(filteredExercises)}
            </View>

            <Text style={{
                fontSize: 23,
                fontFamily: 'Epilogue-Regular',
                marginTop: 16,
                marginBottom: 12,
                color: '#888888',
            }}>Meditations</Text>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}>
                {renderItems(filteredMeditations)}
            </View>

            {/* Pop-up window for details */}
            <Modal visible={selectedItem !== null} transparent animationType="slide">
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
        <View style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 8,
            width: '80%',
        }}>
            <Text style={{
                fontSize: 24,
                fontFamily: 'Roboto-Bold',
                marginBottom: 16,
            }}>{selectedItem?.name}</Text>
            <Text style={{
                fontSize: 16,
                marginBottom: 16,
                color: '#7B7B7B',
                fontFamily: 'Roboto-Regular',
            }}>Level: {selectedItem?.level}</Text>
            <Text style={{
                fontSize: 16,
                marginBottom: 16,
                fontFamily: 'Roboto-Regular',
            }}>Instructions: {selectedItem?.details}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 16
            }}>
                <Image source={require('../assets/group.png')} style={{ width:160, height: 40}}/>
                <Image source={require('../assets/Icons.png')} style={{ width:40, height: 40}}/>
            </View>
            <TouchableOpacity onPress={() => setSelectedItem(null)}>
                <Text style={{
                    fontSize: 18,
                    color: 'blue',
                }}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

        </ScrollView>
    );
};

export default PracticeScreen;
