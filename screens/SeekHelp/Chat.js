import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useRoute } from '@react-navigation/native';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const route = useRoute();

  const groupId = route.params?.groupId;

  const messagesRef = collection(FIREBASE_DB, 'groups', groupId, 'messages');

  useEffect(() => {
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [groupId]);

  const isUserMessage = (message) => {
    // Assume you have some way to identify user messages, e.g., by a user ID
    // Here, I'm checking if the message contains the word "User"
    return message.text.includes('User');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        isUserMessage(item) ? styles.userMessageContainer : styles.otherMessageContainer,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const handleSend = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    await addDoc(messagesRef, {
      text: newMessage,
      timestamp: new Date().toISOString(),
      // You might want to add sender information or any other relevant data here
    });

    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  userMessageContainer: {
    backgroundColor: '#3498db', // Blue color for user messages
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    backgroundColor: '#7f8c8d', // Another color for received messages
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff', // Text color for user messages
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Chat;
