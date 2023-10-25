import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const NewJournal = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

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
        onHide: () => {
          navigation.navigate('Journal');
        },
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
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      {/* Container with Light Blue Background */}

      {/* Beautiful Header */}
      <View style={{ marginBottom: 8, marginLeft: 10 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Hind-Bold', marginTop: 4, color: '#7CB1D1' }}>JOURNAL ENTRY</Text>
      </View>

      <View style={{ backgroundColor: '#E1F2F9', borderRadius: 20, padding: 20, width: '100%', height: '85%' }}>

        {/* Date Picker */}
        <TouchableOpacity onPress={showDatePicker} style={{ padding: 10, borderRadius: 4, marginBottom: 8 }}>
          <Text style={{ color: 'black' }}>Select Date</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>{selectedDate}</Text>
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
            height: '70%',
            width: '100%',
            marginBottom: 36,
          }}
        />

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#7CB1D1', padding: 10, borderRadius: 4, marginBottom: 8 }}>
          <Text style={{ color: 'white' }}>Save Journal</Text>
        </TouchableOpacity>

        {/* Toast Messages */}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </View>

  );
};

export default NewJournal;
