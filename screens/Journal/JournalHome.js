import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const JournalHome = () => {
  const [journals, setJournals] = useState([]);
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const journalsCollection = collection(FIREBASE_DB, 'journal');
        const querySnapshot = await getDocs(journalsCollection);
        const journalList = [];
        querySnapshot.forEach((doc) => {
          journalList.push({ id: doc.id, ...doc.data() });
        });
        setJournals(journalList);
      } catch (error) {
        console.error('Error fetching journals:', error);
      }
    };

    fetchJournals();
  }, []);

  const handleViewMore = (journal) => {
    setSelectedJournal(journal);
    setViewMoreModalVisible(true);
  };

  const handleCloseModal = () => {
    setViewMoreModalVisible(false);
  };

  const getCurrentDay = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    return daysOfWeek[dayIndex];
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Larger Background Image */}
      <View style={{ marginBottom: 16, width: '100%', height: 200, marginBottom:70 }}>
        <Image source={require('../../assets/mountains.jpeg')} style={{ width: '100%', height: '100%' }} />
        <Text style={{ fontSize: 20, fontFamily: 'Hind-Bold', marginTop: 8, textAlign:'center' }}>DAY TO DAY JOURNAL</Text>
        <TouchableOpacity
          style={{ position: 'absolute', top: 8, right: 8}}
          onPress={() => navigation.navigate('NewJournal')}
        >
          <Image source={require('../../assets/plusicon.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 20, fontFamily: 'Hind-Medium', textAlign:'left' }}> ☺️ {getCurrentDay()}</Text>
      <Text style={{ fontSize: 14, fontFamily: 'Hind-Medium', textAlign:'left', color: '#7CB1D1' }}> Feeling great today</Text>
      {/* List of Journals with some padding/margin at the top */}
      <View style={{ paddingTop: 16, width: '100%'  }}>
        {journals.map((journal) => (
          <View key={journal.id} style={{ borderBottomWidth: 1, paddingVertical: 8, width: '100%' }}>
            <Text>Date: {journal.date.toDate().toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => handleViewMore(journal)}>
              <Text>View More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Smaller View More Modal with Scroller */}
      <Modal animationType="slide" transparent={true} visible={viewMoreModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, width: '80%', maxHeight: '80%' }}>
            <ScrollView>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>View More</Text>
              <Text style={{ color: 'purple' }}>Date: {selectedJournal && selectedJournal.date.toDate().toLocaleDateString()}</Text>
              <Text>Description: {selectedJournal && selectedJournal.description}</Text>
            </ScrollView>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4, marginTop: 12 }}
              onPress={handleCloseModal}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default JournalHome;
