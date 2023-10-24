import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Linking, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';

const Group = () => {
    const [isJoinChatPopupVisible, setJoinChatPopupVisible] = useState(false);
    const [groupDetails, setGroupDetails] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();

    const groupId = route.params?.groupId;

    useEffect(() => {
        const fetchGroupDetails = async () => {
            if (groupId) {
                const groupDoc = await getDoc(doc(FIREBASE_DB, 'groups', groupId));
                if (groupDoc.exists()) {
                    setGroupDetails(groupDoc.data());
                }
            }
        };

        fetchGroupDetails();
    }, [groupId]);

    const handleJoinChat = (action) => {
        if (action === 'whatsapp') {
            Linking.openURL('https://web.whatsapp.com/');
        } else if (action === 'join') {
            navigation.navigate('Chat');
        }

        setJoinChatPopupVisible(false);
    };

    const handlePopup = () => {
        setJoinChatPopupVisible(!isJoinChatPopupVisible);
    };

    return (
        <ScrollView>
            {/* Golden Rectangle Box */}
            <View style={{ padding: 16, marginTop: 55, backgroundColor: '#EBD18D', borderRadius: 8, marginHorizontal: 20, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Image source={require('../../assets/avatar_group.png')} style={{ width: 105, height: 50, marginRight: 16 }} />
                    <Text style={{ fontFamily: 'AnekOdia-Bold', fontSize: 20 }}>{groupDetails?.name}</Text>
                </View>

                <Text style={{ marginBottom: 8, fontFamily: 'Roboto-Regular' }}>
                    This social accountability group is dedicated to heal your mind
                </Text>

                <Text style={{ marginBottom: 16, fontFamily: 'Roboto-Bold' }}>Members: {groupDetails?.members}</Text>

                <TouchableOpacity
                    style={{ backgroundColor: '#C58BF2', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 }}
                    onPress={handlePopup}
                >
                    <Text style={{ color: 'white', fontFamily: 'Popins-Regular' }}>Join Group</Text>
                </TouchableOpacity>
            </View>

            {/* Next Sessions Section */}
            <View style={{ marginTop: 24, marginHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Popins-SemiBold' }}>Next Sessions</Text>
                    <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#9DCEFF', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 5 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Popins-Regular' }}>This month{' \u25BE'}</Text>
                        </View>
                    </View>
                </View>

                {/* Dummy Session Data */}
                {[
                    { title: 'Mindfulness Meditation', location: 'Zen Center', presenter: 'Dr. Calm' },
                    { title: 'Coping with Stress', location: 'Wellness Hub', presenter: 'Dr. Serene' },
                    { title: 'Positive Thinking Workshop', location: 'Joyful Place', presenter: 'Dr. Cheerful' },
                    { title: 'Emotional Resilience Session', location: 'Resilience Center', presenter: 'Dr. Strong' },
                ].map((session, index) => (
                    <View key={index} style={{ marginBottom: 16, padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../assets/Date.png')} style={{ width: 30, height: 30, marginRight: 16 }} />
                            <View>
                                <Text style={{ fontSize: 16, fontFamily: 'Popins-Medium' }}>{session.title}</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'Popins-Regular', color: '#7B6F72' }}>Location: {session.location}</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'Popins-Regular', color: '#7B6F72' }}>By {session.presenter}</Text>
                            </View>
                        </View>
                        <Image source={require('../../assets/Reminders.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </View>
                ))}


            </View>


            {isJoinChatPopupVisible && (
                <>
                    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)', marginBottom: -95 }} onTouchEnd={() => setJoinGroupPopupVisible(false)} />
                    <Modal transparent={true} visible={isJoinChatPopupVisible} onRequestClose={() => setJoinChatPopupVisible(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 15 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Join Chat</Text>
                                <Text style={{ fontSize: 16, marginBottom: 16 }}>Would you like to join the chat?</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ marginRight: 8, backgroundColor: '#4CAF50', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4 }} onPress={() => handleJoinChat('whatsapp')}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Hop into WhatsApp</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginLeft: 8, backgroundColor: '#2196F3', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4 }} onPress={() => handleJoinChat('join')}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Join Inside Chat</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ marginTop: 8, backgroundColor: '#888', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4 }} onPress={handlePopup}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
        </ScrollView>

    );
};

export default Group;