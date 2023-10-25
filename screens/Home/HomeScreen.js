import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import SideNavigation from '../../components/SideNavigation';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, ScrollView, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs, getDoc, setDoc, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import MusicScreen from './MusicScreen';
import SleepScreen from './SleepScreen';
import HelpHome from '../SeekHelp/HelpHome';
import VisHome from '../Visualisations/VisHome';
import JournalHome from '../Journal/JournalHome';
import Pomodoro from '../Pomodoro/Pomodoro';
import TranquilStart from '../Tranquil/TranquilStart';
import PracticeScreen from '../PracticeScreen';

const HomeScreenContent = ({ navigation }) => {
  const [schedule, setSchedule] = useState([]);
  const [newScheduleItem, setNewScheduleItem] = useState({
    fromTime: '',
    toTime: '',
    details: '',
    date: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingScheduleItem, setEditingScheduleItem] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedTimePicker, setSelectedTimePicker] = useState(null);
  const [isDatepickerVisible, setDatepickerVisible] = useState(false);
  const [meditationDetails, setMeditationDetails] = useState({
    meditationTime: '',
    meditationDays: '',
  });
  const [isMeditationTimePickerVisible, setMeditationTimePickerVisible] = useState(false);

  const username = FIREBASE_AUTH.currentUser.displayName;
  const email = FIREBASE_AUTH.currentUser.email;

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleCollection = collection(FIREBASE_DB, 'schedule');
        const scheduleSnapshot = await getDocs(scheduleCollection);
        const scheduleData = scheduleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchedule(scheduleData);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  const showDatePicker = (pickerType) => {
    setSelectedTimePicker(pickerType);
    setDatePickerVisible(true);
  };

  const showDatepicker = () => {
    setDatepickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const hideDatepicker = () => {
    setDatepickerVisible(false);
  };

  const handleDatepickerConfirm = (date) => {
    hideDatepicker();
    setNewScheduleItem((prevItem) => ({
      ...prevItem,
      date: date.toDateString(),
    }));
  };

  const handleTimeConfirm = (time) => {
    hideDatePicker();
    if (selectedTimePicker === 'fromTime') {
      setNewScheduleItem((prevItem) => ({
        ...prevItem,
        fromTime: time.toLocaleTimeString(),
      }));
    } else if (selectedTimePicker === 'toTime') {
      setNewScheduleItem((prevItem) => ({
        ...prevItem,
        toTime: time.toLocaleTimeString(),
      }));
    }
  };

  const addScheduleItem = async () => {
    try {
      const scheduleCollection = collection(FIREBASE_DB, 'schedule');
      if (editingScheduleItem) {
        // Update existing schedule item
        await updateDoc(doc(FIREBASE_DB, 'schedule', editingScheduleItem.id), newScheduleItem);
        setEditingScheduleItem(null);
      } else {
        // Add new schedule item
        const newScheduleDoc = await addDoc(scheduleCollection, newScheduleItem);
        setSchedule((prevSchedule) => [
          ...prevSchedule,
          { id: newScheduleDoc.id, ...newScheduleItem },
        ]);
      }
      setModalVisible(false);
      setNewScheduleItem({ fromTime: '', toTime: '', details: '', date: '' });
    } catch (error) {
      console.error('Error adding/updating schedule item:', error);
    }
  };

  const deleteScheduleItem = async (id) => {
    try {
      const scheduleDoc = doc(FIREBASE_DB, 'schedule', id);
      await deleteDoc(scheduleDoc);
      setSchedule((prevSchedule) => prevSchedule.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting schedule item:', error);
    }
  };

  const editScheduleItem = (item) => {
    setEditingScheduleItem(item);
    setNewScheduleItem(item);
    setModalVisible(true);
  };

  const showMeditationTimePicker = () => {
    setMeditationTimePickerVisible(true);
  };

  // Function to hide meditation time picker
  const hideMeditationTimePicker = () => {
    setMeditationTimePickerVisible(false);
  };

  // Function to handle meditation time confirmation
  const handleMeditationTimeConfirm = (time) => {
    hideMeditationTimePicker();
    setMeditationDetails((prevDetails) => ({
      ...prevDetails,
      meditationTime: time.toLocaleTimeString(),
    }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => editScheduleItem(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Epilogue-Regular', fontSize: 16 }}>{`${item.fromTime} - ${item.toTime}`}</Text>
          <Text style={{ fontFamily: 'Epilogue-Bold', fontSize: 16 }}>{item.details}</Text>
          <Text style={{ fontFamily: 'Epilogue-Medium', fontSize: 13, color: '#888888' }}>{item.date}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteScheduleItem(item.id)}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const saveMeditationDetails = async () => {
    try {
      const userDocRef = doc(FIREBASE_DB, 'users', FIREBASE_AUTH.currentUser.uid);

      // Retrieve the existing user document
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();

      if (userData) {
        // Only update the meditationDetails field
        await updateDoc(userDocRef, {
          meditationDetails: meditationDetails,
        });

        console.log('Meditation details saved successfully!');
        Toast.show({
          type: 'success',
          text1: 'Meditation Details Saved',
          position: 'bottom',
        });
      } else {
        // If the user document doesn't exist, create it
        await setDoc(userDocRef, {
          meditationDetails: meditationDetails,
        });
        Toast.show({
          type: 'success',
          text1: 'Meditation Details Saved',
          position: 'bottom',
        });
        console.log('User document created with meditation details!');
      }
    } catch (error) {
      console.error('Error saving meditation details:', error);
      Toast.show({
        type: 'error',
        text1: 'Error Saving Meditation Details',
        position: 'bottom',
      });
    }
  };

  const handleMeditationDaySelection = (selectedDay) => {
    // Toggle the selected day
    setMeditationDetails((prevDetails) => {
      const updatedDays = [...prevDetails.meditationDays];
      const index = updatedDays.indexOf(selectedDay);

      if (index !== -1) {
        // If the day is already selected, remove it
        updatedDays.splice(index, 1);
      } else {
        // If the day is not selected, add it
        updatedDays.push(selectedDay);
      }

      return {
        ...prevDetails,
        meditationDays: updatedDays,
      };
    });
  };

  const renderMeditationQuestions = () => (
    <View style={{marginBottom: 50}}>
      {/* Meditation Time Question */}
      <Text style={{ fontFamily: 'AnekOdia-Bold', fontSize: 24, marginBottom: 10 }}>1. What time would you like to meditate?</Text>
      <TouchableOpacity
        onPress={() => showMeditationTimePicker()}
        style={{
          borderBottomWidth: 1,
          padding: 5,
        }}
      >
        {/* Display selected meditation time */}
        <Text style={{ fontFamily: 'AbhayaLibre-ExtraBold', color: '#A1A4B2' }}>{meditationDetails.meditationTime ? meditationDetails.meditationTime : 'Any time you can choose but We recommend first thing in the morning.'}</Text>
      </TouchableOpacity>

      {/* Meditation Day Question */}
      <Text style={{ fontFamily: 'AnekOdia-Bold', fontSize: 24, marginTop: 20 }}>2. Which day(s) would you like to meditate?</Text>
      <Text style={{ fontFamily: 'AbhayaLibre-ExtraBold', color: '#A1A4B2', fontSize: 14, marginBottom: 10 }}>Everyday is best, but we recommend picking at least five.</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => handleMeditationDaySelection(day)}
            style={{
              borderWidth: 1,
              borderColor: meditationDetails.meditationDays.includes(day) ? '#4CAF50' : 'black',
              borderRadius: 20,
              padding: 10,
              margin: 5,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'AbhayaLibre-ExtraBold', color: meditationDetails.meditationDays.includes(day) ? '#4CAF50' : 'black' }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={saveMeditationDetails}
        style={{
          backgroundColor: '#2196F3',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="save" size={20} color="white" />
        <Text style={{ color: 'white', textAlign: 'center', marginLeft: 5 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 10 }}>
        <Text style={{ fontFamily: 'Popins-Regular', color: '#ADA4A5', fontSize: 12 }}>Welcome Back,</Text>
        <Text style={{ fontFamily: 'Popins-Bold', color: '1D1617', fontSize: 20 }}>Rashi Amarasiri</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        <Text style={{ fontFamily: 'Epilogue-Bold', color: '#555555', fontSize: 20 }}>Discover</Text>
        <Text style={{ fontFamily: 'Epilogue-Bold', color: '#222222', fontSize: 32 }}>Your Inner Self</Text>
      </View>

      <Image
        source={require('../../assets/Card.png')} 
        style={{ width: '100%', height: 450, borderRadius: 15, marginBottom: 10 }}
        resizeMode="cover"
      />

      <View style={{ backgroundColor: '#9DCEFF', borderRadius: 15, padding: 12, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Popins-Medium', fontSize: 16, color: '#1D1617', marginLeft: 15 }}>Today's Schedule</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons name="add-circle" size={40} color="#92A3FD" />
          </TouchableOpacity>
        </View>
      </View>


      <FlatList data={schedule} renderItem={renderItem} keyExtractor={(item) => item.id} style={{ marginBottom: 40 }} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditingScheduleItem(null);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '80%',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {editingScheduleItem ? 'Edit Schedule' : 'Add Schedule'}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text>From Time</Text>
                <TouchableOpacity
                  onPress={() => showDatePicker('fromTime')}
                  style={{
                    borderBottomWidth: 1,
                    padding: 5,
                  }}
                >
                  <Text>{newScheduleItem.fromTime}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text>To Time</Text>
                <TouchableOpacity
                  onPress={() => showDatePicker('toTime')}
                  style={{
                    borderBottomWidth: 1,
                    padding: 5,
                  }}
                >
                  <Text>{newScheduleItem.toTime}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text>Date</Text>
                <TouchableOpacity
                  onPress={() => showDatepicker()}
                  style={{
                    borderBottomWidth: 1,
                    padding: 5,
                  }}
                >
                  <Text>{newScheduleItem.date}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatepickerVisible}
                  mode="date"
                  onConfirm={handleDatepickerConfirm}
                  onCancel={hideDatepicker}
                />
              </View>
            </View>
            <Text>Details</Text>
            <TextInput
              value={newScheduleItem.details}
              onChangeText={(text) => setNewScheduleItem((prevItem) => ({ ...prevItem, details: text }))}
              style={{
                borderBottomWidth: 1,
                padding: 5,
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setEditingScheduleItem(null);
                }}
                style={{
                  backgroundColor: '#E53935',
                  padding: 10,
                  borderRadius: 5,
                  marginRight: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialIcons name="cancel" size={20} color="white" />
                <Text style={{ color: 'white', textAlign: 'center', marginLeft: 5 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addScheduleItem}
                style={{
                  backgroundColor: '#2196F3',
                  padding: 10,
                  borderRadius: 5,
                  marginLeft: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialIcons name="add" size={20} color="white" />
                <Text style={{ color: 'white', textAlign: 'center', marginLeft: 5 }}>
                  {editingScheduleItem ? 'Save' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Meditation Time Picker */}
      <DateTimePickerModal
        isVisible={isMeditationTimePickerVisible}
        mode="time"
        onConfirm={(time) => handleMeditationTimeConfirm(time)}
        onCancel={() => hideMeditationTimePicker()}
      />

      {/* Meditation Day Picker */}
      {renderMeditationQuestions()}
    </ScrollView>
  );
};

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideNavigation {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreenContent} />
      <Drawer.Screen name="Music" component={MusicScreen} />
      <Drawer.Screen name="Sleep" component={SleepScreen} />
      <Drawer.Screen name="Help" component={HelpHome} />
      <Drawer.Screen name="Visualisations" component={VisHome} />
      <Drawer.Screen name="Journal" component={JournalHome} />
      <Drawer.Screen name="Pomodoro" component={Pomodoro} />
      <Drawer.Screen name="Tranquil" component={TranquilStart} />
      <Drawer.Screen name="Practice" component={PracticeScreen} />
    </Drawer.Navigator>
  );
};

export default HomeScreen;