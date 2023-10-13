import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;

    const signUp = async() => {
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
        <Text className='text-3xl font-bold mb-4 text-center'>
            Join Us!
        </Text>

        <TextInput
            placeholder="Full Name"
            value={username}
            onChangeText={text => setUsername(text)}
            className='bg-white w-3/4 mb-4 p-3 rounded-full'
        />
        <TextInput
            value={email}
            placeholder="Email"
            autoCapitalize='none'
            onChangeText={text => setEmail(text)}
            className='bg-white w-3/4 mb-4 p-3 rounded-full'
        />
        <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry
            autoCapitalize='none'
            onChangeText={text => setPassword(text)}
            className='bg-white w-3/4 mb-8 p-3 rounded-full'
        />

        <TouchableOpacity
            className='bg-green-500 py-3 px-6 rounded-full mb-4'
            onPress={signUp}
        >
            <Text className='text-white font-bold text-lg'>Sign Up</Text>
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