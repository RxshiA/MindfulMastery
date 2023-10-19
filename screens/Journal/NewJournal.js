import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const NewJournal = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString();
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const handleSave = async () => {
    try {
      const journalsCollection = collection(FIREBASE_DB, 'journal');
      const newJournal = {
        date: new Date(selectedDate),
        description,
      };
      await addDoc(journalsCollection, newJournal);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Journal Saved!',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      console.error('Error saving journal:', error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error Saving Journal',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <View className='flex-1 justify-center items-center p-4'>
      {/* Beautiful Header */}
      <View className='mb-8'>
        <Image source={require('../../assets/mountains.jpeg')} className='w-54 h-24' />
        <Text className='text-2xl font-bold mt-4'>New Journal</Text>
      </View>

      {/* Date Picker */}
      <TouchableOpacity onPress={showDatePicker} className='bg-blue-500 p-2 rounded mb-4'>
        <Text className='text-white'>Select Date</Text>
      </TouchableOpacity>
      <Text className='text-lg'>{selectedDate}</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* Description Input */}
      <TextInput
        placeholder='Enter Description...'
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 8,
          padding: 8,
          height: 100,
          width: '100%',
          marginBottom: 16,
        }}
      />

      {/* Save Button */}
      <TouchableOpacity onPress={handleSave} className='bg-green-500 p-3 rounded'>
        <Text className='text-white'>Save Journal</Text>
      </TouchableOpacity>

      {/* Toast Messages */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default NewJournal;
