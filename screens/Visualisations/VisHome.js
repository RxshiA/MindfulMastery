import React, { useState } from 'react';
import { View, Text, Image, Modal, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const emotionsList = ['Happy', 'Sad', 'Fear', 'Loneliness', 'Joy', 'Anger'];

const VisHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('Happy');
  const [emotionValue, setEmotionValue] = useState(5);
  const [selectedDate, setSelectedDate] = useState('');

  const handleAddEmotions = () => {
    setModalVisible(true);
  };

  const handleSaveEmotions = async () => {
    try {
      const emotionsCollection = collection(FIREBASE_DB, 'emotions');
      await addDoc(emotionsCollection, {
        emotion: selectedEmotion,
        value: emotionValue,
        date: selectedDate,
      });

      setModalVisible(false);
    } catch (error) {
      console.error('Error saving emotions:', error);
    }
  };

  const handleCancelEmotions = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Images with Spacing */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Bar_chart.png')} style={styles.image} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Pie_chart.png')} style={styles.image} />
      </View>

      {/* Modal for Adding Emotions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Today's Emotions</Text>

            {/* Date Input */}
            <TextInput
              placeholder="Date"
              style={styles.input}
              value={selectedDate}
              onChangeText={(text) => setSelectedDate(text)}
            />

            {/* Emotion Input */}
            <Text style={styles.label}>Emotion:</Text>
            <Picker
              selectedValue={selectedEmotion}
              onValueChange={(itemValue, itemIndex) => setSelectedEmotion(itemValue)}
              style={styles.picker}
            >
              {emotionsList.map((emotion, index) => (
                <Picker.Item key={index} label={emotion} value={emotion} />
              ))}
            </Picker>

            {/* Emotion Value Input */}
            <Text style={styles.label}>Value:</Text>
            <TextInput
              placeholder="0-10"
              keyboardType="numeric"
              style={styles.input}
              value={emotionValue.toString()}
              onChangeText={(text) => setEmotionValue(parseInt(text) || 0)}
            />

            {/* Save and Cancel Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEmotions}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEmotions}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Button to Add Today's Emotions */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddEmotions}>
        <Text style={styles.buttonText}>Add Today's Emotions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 310,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default VisHome;
