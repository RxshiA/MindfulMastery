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
        <ScrollView>
            <View style={{ height: '15.5%', backgroundColor: 'lightblue', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <Text style={{ fontFamily: 'Popins-SemiBold', fontSize: 24, textAlign: 'center', backgroundColor: '#EEA4CE', marginVertical: 10, marginHorizontal: 120, borderRadius: 12, marginTop: 30, marginBottom: 8 }}>Seek Help</Text>
            </View>

            <TouchableOpacity onPress={handlePopup} style={{ position: 'absolute', top: 30, right: 7 }}>
                <Image source={require('../../assets/notification.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>

            {/* Social Gatherings Section */}
            <View style={{ marginTop: 30, marginLeft: 20, marginRight: 15 }}>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 29 }}>Social Gatherings</Text>
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, color: '#606060', marginBottom: 20 }}>Near you</Text>

                {/* Gathering Details */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                        <Image source={require('../../assets/roundedPicture.jpeg')} className='w-12 h-12 rounded-full mr-2' />
                        <View className='flex-1'>
                            <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 15 }}>Place: London</Text>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13, color: '#78858F' }}>By Dr. Hank</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#C223EA',
                                paddingVertical: 1,
                                paddingHorizontal: 2,
                                backgroundColor: followStatus[index] ? '#EEA4CE' : '#C223EA',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                            }}
                            onPress={() => handleFollow(index)}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                {followStatus[index] ? 'Followed' : 'Follow'}
                            </Text>
                        </TouchableOpacity>

                    </View>
                ))}
            </View>

            {/* Groups to Join Section */}
            <View style={{ marginTop: 30, marginLeft: 20, marginRight: 15, marginBottom: 50 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Popins-SemiBold' }}>Groups to Join</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 110 }}>
                    {groups.map((group) => (
                        <TouchableOpacity
                            key={group.id}
                            style={{
                                marginRight: 15,
                                padding: 10,
                                borderWidth: 2,
                                borderRadius: 4,
                            }}
                            onPress={() => handleGroupClick(group)}
                        >
                            {/* Group Details */}
                            <Text style={{ fontSize: 14, fontFamily: 'Popins-Medium' }}>{group.name}</Text>
                            <Text style={{ color: '#888' }}>Members: {group.members}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {isJoinGroupPopupVisible && (
                <>
                    <View onTouchEnd={() => setJoinGroupPopupVisible(false)}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: -200, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    <Modal transparent={true} visible={isJoinGroupPopupVisible} onRequestClose={() => setJoinGroupPopupVisible(false)}>
                        <View className='flex-1 justify-center items-center'>
                            <View className='bg-white p-4' style={{ borderRadius: 10 }}>
                                {selectedGroup && (
                                    <>
                                        <Text className='text-2xl font-bold mb-4'>{`Join ${selectedGroup.name}`}</Text>
                                        <Text className='text-base mb-4'>By joining this group, you’ll accept all of their rules.</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: '#272829', // Assuming 'bg-blue-500' corresponds to blue-500
                                                    paddingVertical: 3,
                                                    paddingHorizontal: 15,
                                                    borderRadius: 4,
                                                    marginRight: 10,
                                                }}
                                                onPress={handleJoinGroup}
                                            >
                                                <Text style={{ color: 'white', fontFamily: 'Roboto-Bold' }}>Accept</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: 'white', // Assuming 'bg-gray-500' corresponds to gray-500
                                                    paddingVertical: 2,
                                                    paddingHorizontal: 12,
                                                    borderRadius: 4,
                                                    borderWidth: 1,
                                                    borderColor: '#000',
                                                }}
                                                onPress={() => setJoinGroupPopupVisible(false)}
                                            >
                                                <Text style={{ color: '#272829', fontFamily: 'Roboto-Bold' }}>Cancel</Text>
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
                    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <Text style={{ marginHorizontal: 5, marginVertical: 5, fontFamily: 'Roboto-Bold', fontSize: 22 }}>Pop UP!!!!!</Text>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 15, marginVertical:15 }}>For the past month, your mental health isn't being great. Do you want to seek help from a specialist?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#272829', // Assuming 'bg-blue-500' corresponds to blue-500
                                    paddingVertical: 3,
                                    paddingHorizontal: 15,
                                    borderRadius: 4,
                                    marginRight: 10,
                                }}
                                onPress={handleOkay}>
                                <Text style={{ color: 'white', fontFamily: 'Roboto-Bold' }}>Okay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'white', // Assuming 'bg-gray-500' corresponds to gray-500
                                    paddingVertical: 2,
                                    paddingHorizontal: 12,
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    borderColor: '#000',
                                }} 
                                onPress={handlePopup}>
                                <Text style={{ color: '#272829', fontFamily: 'Roboto-Bold' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
};

export default HelpHome;
