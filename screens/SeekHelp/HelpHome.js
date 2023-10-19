import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const HelpHome = () => {
    const [followStatus, setFollowStatus] = useState(Array(4).fill(false));
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isJoinGroupPopupVisible, setJoinGroupPopupVisible] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const navigation = useNavigation();

    const handleFollow = (index) => {
        setFollowStatus((prevStatus) => {
            const newStatus = [...prevStatus];
            newStatus[index] = !newStatus[index];
            return newStatus;
        });
    };

    useEffect(() => {
        const fetchGroups = async () => {
            const groupsCollection = collection(FIREBASE_DB, 'groups');
            const groupsSnapshot = await getDocs(groupsCollection);
            const groupsData = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGroups(groupsData);
        };

        fetchGroups();
    }, []);

    const handleJoinGroup = () => {
        navigation.navigate('Group', { groupId: selectedGroup.id });
        setJoinGroupPopupVisible(false);
    };

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
        setJoinGroupPopupVisible(true);
    };

    const handlePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const handleOkay = () => {
        navigation.navigate('PsychologistHelp');
        alert('Navigating to PsychologistHelp page');
        handlePopup();
    };


    return (
        <View className='p-4 pt-24'>
            <TouchableOpacity onPress={handlePopup}
                className='absolute top-10 right-4'>
                <Image source={require('../../assets/notification.png')} className='w-6 h-6' />
            </TouchableOpacity>
            {/* Social Gatherings Section */}
            <View className='mb-6'>
                <Text className='text-2xl font-bold'>Social Gatherings</Text>
                <Text className='text-gray-500 mb-2'>Near you</Text>

                {/* Gathering Details */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} className='flex-row items-center mb-2'>
                        <Image source={require('../../assets/roundedPicture.jpeg')} className='w-12 h-12 rounded-full mr-2' />
                        <View className='flex-1'>
                            <Text className='text-base'>Place: London</Text>
                            <Text className='text-gray-500'>By Dr. Hank</Text>
                        </View>
                        <TouchableOpacity className={`bg-pink-500 py-1 px-2 rounded ${followStatus[index] && 'bg-silver'}`} onPress={() => handleFollow(index)}>
                            <Text className='text-white font-bold'>{followStatus[index] ? 'Followed' : 'Follow'}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Groups to Join Section */}
            <View className='mb-6'>
                <Text className='text-2xl font-bold'>Groups to Join</Text>

                {/* Group Details */}
                {groups.map((group) => (
                    <TouchableOpacity
                        key={group.id}
                        className='mb-2 p-2 border border-gray-300 rounded'
                        onPress={() => handleGroupClick(group)}
                    >
                        {/* Group Details */}
                        <Text className='text-base font-bold'>{group.name}</Text>
                        <Text className='text-gray-500'>Members: {group.members}</Text>
                    </TouchableOpacity>

                ))}
            </View>

            {isJoinGroupPopupVisible && (
                <>
                    <View className='fixed inset-0 bg-black bg-opacity-50' onTouchEnd={() => setJoinGroupPopupVisible(false)} 
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: -200, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}/>
                    <Modal transparent={true} visible={isJoinGroupPopupVisible} onRequestClose={() => setJoinGroupPopupVisible(false)}>
                        <View className='flex-1 justify-center items-center'>
                            <View className='bg-white p-4'>
                                {selectedGroup && (
                                    <>
                                        <Text className='text-2xl font-bold mb-4'>{`Join ${selectedGroup.name}`}</Text>
                                        <Text className='text-base mb-4'>By joining this group, you’ll accept all of their rules.</Text>
                                        <View className='flex-row justify-between'>
                                            <TouchableOpacity className='bg-blue-500 py-2 px-4 rounded' onPress={handleJoinGroup}>
                                                <Text className='text-white font-bold'>Yes</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity className='bg-gray-500 py-2 px-4 rounded' onPress={() => setJoinGroupPopupVisible(false)}>
                                                <Text className='text-white font-bold'>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>
                    </Modal>
                </>
            )}


            {isPopupVisible && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: -200, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />}

            <Modal transparent={true} visible={isPopupVisible} onRequestClose={handlePopup}>
                <View className='flex-1 justify-center items-center'>
                    <View className='bg-white p-4'>
                        <Text className='text-2xl font-bold mb-4'>Pop UP!!!!!</Text>
                        <Text className='text-base mb-4'>For the past month, your mental health isn't being great. Do you want to seek help from a specialist?</Text>
                        <View className='flex-row justify-between'>
                            <TouchableOpacity className='bg-blue-500 py-2 px-4 rounded' onPress={handleOkay}>
                                <Text className='text-white font-bold'>Okay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-gray-500 py-2 px-4 rounded' onPress={handlePopup}>
                                <Text className='text-white font-bold'>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default HelpHome;
