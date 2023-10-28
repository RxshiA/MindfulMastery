import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FIREBASE_DB } from "../../FirebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import ProgressBar from "../../components/ProgressBar";
import PieChart from "react-native-pie-chart";

const emotionsList = ["Happy", "Sad", "Fear", "Loneliness", "Joy", "Anger"];

const VisHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("Happy");
  const [emotionValue, setEmotionValue] = useState(5);
  const [selectedDate, setSelectedDate] = useState("");
  const [emoArr, setEmoArr] = useState([]);
  // const [happy, setHappy] = useState();
  // const [sad, setSad] = useState();
  // const [fear, setFear] = useState();
  // const [lonliness, setLonliness] = useState();
  // const [joy, setJoy] = useState();
  // const [anger, setAnger] = useState();

  const handleAddEmotions = () => {
    setModalVisible(true);
  };

  const handleSaveEmotions = async () => {
    try {
      const emotionsCollection = collection(FIREBASE_DB, "emotions");
      await addDoc(emotionsCollection, {
        emotion: selectedEmotion,
        value: emotionValue,
        date: selectedDate,
      });

      setModalVisible(false);
    } catch (error) {
      console.error("Error saving emotions:", error);
    }
  };

  const handleCancelEmotions = () => {
    setModalVisible(false);
  };

  // useEffect(() => {
  //   const fetchSchedule = async () => {
  //     try {
  //       const emotionCollection = collection(FIREBASE_DB, "emotions");
  //       emotionsList.map(async (emotion) => {
  //         const q = query(emotionCollection, where("emotion", "==", emotion));
  //         const querySnapshot = await getDocs(q);
  //         emoArr.append(querySnapshot.size)
  //       });
  //     } catch (error) {
  //       console.error("Error fetching schedule:", error);
  //     }
  //   };

  //   fetchSchedule();
  // }, []);

  //pie chart
  const widthAndHeight = 250;
  const series = emoArr;
  const sliceColor = [
    "#0000ff",
    "#0044ff",
    "#0066ff",
    "#3388ff",
    "#55aaff",
    "#77ccff",
  ];

  useEffect(() => {
    const emotionCollection = collection(FIREBASE_DB, "emotions");

    // Create a listener for the entire collection
    const unsubscribe = onSnapshot(emotionCollection, async () => {
      try {
        // Clear emoArr before updating it with the new data
        setEmoArr([]);

        const newEmoArr = await Promise.all(
          emotionsList.map(async (emotion) => {
            const q = query(emotionCollection, where("emotion", "==", emotion));
            const querySnapshot = await getDocs(q);
            return querySnapshot.size;
          })
        );

        setEmoArr(newEmoArr);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    });
    console.log(emoArr);
    // Cleanup the listener when the component unmounts
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Title */}
      <Text
        style={{
          fontSize: 24,
          fontFamily: "AbhayaLibre-ExtraBold",
          marginBottom: 20,
        }}
      >
        Progress
      </Text>

      {/* Images with Spacing */}
      {/* <View style={styles.imageContainer}>
        <Image source={require('../../assets/card1.png')} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/card2.png')} />
      </View> */}
      {emoArr.length === 0 ? (
        emoArr.map((item, index) => (
          <View>
            <Text>{emotionsList[index]}</Text>
            <ProgressBar value={item / 10} />
          </View>
        ))
      ) : (
        <View style={{ alignItems: "center" }}>
  <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} style={{ marginBottom: 20 }} />
  <View style={{ width: "80%" }}>
    {emoArr.map((item, index) => (
      <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Text>{emotionsList[index]}</Text>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: sliceColor[index],
            marginLeft: 5,
          }}
        />
      </View>
    ))}
  </View>
</View>

      )}

      {/* Modal for Adding Emotions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            marginBottom: -95,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 26,
                borderRadius: 15,
              }}
            >
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
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedEmotion(itemValue)
                }
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
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveEmotions}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelEmotions}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  imageContainer: {
    marginBottom: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    margin: 20,
    paddingHorizontal: 110,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default VisHome;
