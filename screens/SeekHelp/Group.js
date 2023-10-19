import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Linking } from 'react-native';
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
            // Use Linking to open WhatsApp URL
            Linking.openURL('https://web.whatsapp.com/');
        } else if (action === 'join') {
            // Redirect to Chat page
            navigation.navigate('Chat');
        }

        setJoinChatPopupVisible(false);
    };

    const handlePopup = () => {
        setJoinChatPopupVisible(!isJoinChatPopupVisible);
    };

    return (
        <View>
            {/* Golden Rectangle Box */}
            <View className='p-4 mt-4 bg-yellow-300 rounded'>
                <View className='flex-row items-center mb-4'>
                    <Image source={require('../../assets/group.jpeg')} className='w-12 h-12 rounded-full mr-4' />
                    <Text className='text-2xl font-bold'>{groupDetails?.name}</Text>
                </View>

                <Text className='mb-2'>
                    Some sample sentences about mental health. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>

                <Text className='mb-4'>Members: {groupDetails?.members}</Text>

                <TouchableOpacity
                    className='bg-blue-500 py-2 px-4 rounded'
                    onPress={handlePopup}
                >
                    <Text className='text-white font-bold'>Join Group</Text>
                </TouchableOpacity>
            </View>

            {/* Next Sessions Section */}
            <View className='mt-6'>
                <Text className='text-2xl font-bold mb-4'>Next Sessions</Text>

                {/* Dummy Session Data */}
                <View className='mb-4 p-4 bg-white rounded'>
                    <Text className='text-base font-bold'>Session Title</Text>
                    <Text className='text-gray-500'>Location: Some Place</Text>
                    <Text className='text-gray-500'>By Dr. Someone</Text>
                </View>

                <View className='mb-4 p-4 bg-white rounded'>
                    <Text className='text-base font-bold'>Session Title</Text>
                    <Text className='text-gray-500'>Location: Some Place</Text>
                    <Text className='text-gray-500'>By Dr. Someone</Text>
                </View>

                <View className='mb-4 p-4 bg-white rounded'>
                    <Text className='text-base font-bold'>Session Title</Text>
                    <Text className='text-gray-500'>Location: Some Place</Text>
                    <Text className='text-gray-500'>By Dr. Someone</Text>
                </View>

                <View className='mb-4 p-4 bg-white rounded'>
                    <Text className='text-base font-bold'>Session Title</Text>
                    <Text className='text-gray-500'>Location: Some Place</Text>
                    <Text className='text-gray-500'>By Dr. Someone</Text>
                </View>
            </View>

            {isJoinChatPopupVisible && (
                <>
                    <View className='fixed inset-0 bg-black bg-opacity-50' onTouchEnd={() => setJoinGroupPopupVisible(false)}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: -200, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    <Modal transparent={true} visible={isJoinChatPopupVisible} onRequestClose={() => setJoinChatPopupVisible(false)}>
                        <View className='flex-1 justify-center items-center'>
                            <View className='bg-white p-4'>
                                <Text className='text-2xl font-bold mb-4'>Join Chat</Text>
                                <Text className='text-base mb-4'>Would you like to join the chat?</Text>
                                <View className='flex-row justify-center'>
                                    <TouchableOpacity style={{ marginRight: 8 }} className='bg-green-500 py-2 px-4 rounded' onPress={() => handleJoinChat('whatsapp')}>
                                        <Text className='text-white font-bold'>Hop into WhatsApp</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginLeft: 8 }} className='bg-blue-500 py-2 px-4 rounded' onPress={() => handleJoinChat('join')}>
                                        <Text className='text-white font-bold'>Join Inside Chat</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className='flex-row justify-center'>
                                    <TouchableOpacity style={{ marginTop: 8 }} className='bg-gray-500 py-2 px-4 rounded' onPress={handlePopup}>
                                        <Text className='text-white font-bold'>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </>
            )}

        </View>
    );
};

export default Group;