import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const { uid } = response.user;
            await setDoc(doc(FIREBASE_DB, 'users', uid), {
                username,
                email
            });

            console.log(response)
            alert('Account created successfully✅')
        } catch (e) {
            console.log(e)
            alert('Sign up failed: ' + e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='flex-1 items-center justify-center bg-blue-200'>
            <Image
                source={require('../assets/favicon.png')}
                className='mb-8'
            />
            <Text style={{ fontFamily: 'Popins-Regular', fontSize: 20 }}>
                Hey There,
            </Text>
            <Text style={{ fontFamily: 'Popins-Bold', fontSize: 24, marginBottom: 24 }}>
                Create an account
            </Text>

            <TextInput
                placeholder="Full Name"
                value={username}
                onChangeText={text => setUsername(text)}
                style={{ fontFamily: 'Popins-Regular', backgroundColor: 'white', width: '75%', marginBottom: 8, padding: 12, borderRadius: 15 }}
            />

            <TextInput
                value={email}
                placeholder="Email"
                autoCapitalize='none'
                onChangeText={text => setEmail(text)}
                style={{ fontFamily: 'Popins-Regular', backgroundColor: 'white', width: '75%', marginBottom: 8, padding: 12, borderRadius: 15 }}
            />

            <TextInput
                value={password}
                placeholder="Password"
                secureTextEntry
                autoCapitalize='none'
                onChangeText={text => setPassword(text)}
                style={{ fontFamily: 'Popins-Regular', backgroundColor: 'white', width: '75%', marginBottom: 16, padding: 12, borderRadius: 15 }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: '#9DCEFF',
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    borderRadius: 20,
                    marginBottom: 16,
                }}
                onPress={signUp}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Register</Text>
            </TouchableOpacity>



            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                className='flex-row items-center'
            >
                <Text className='text-gray-600 mr-2'>Already have an account?</Text>
                <Text className='text-blue-500 font-bold'>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterScreen