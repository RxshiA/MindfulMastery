import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;

    const signIn = async() => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (e) {
            console.log(e)
            alert('Sign in failed: ' + e.message)
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
            Welcome Back!
        </Text>

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
                autoCapitalize='none'
                secureTextEntry
                onChangeText={text => setPassword(text)}
                className='bg-white w-3/4 mb-8 p-3 rounded-full'
            />

            <TouchableOpacity
                className='bg-green-500 py-3 px-6 rounded-full mb-4'
                onPress={signIn}
            >
                <Text className='text-white font-bold text-lg'>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                className='flex-row items-center'
            >
                <Text className='text-gray-600 mr-2'>Don't have an account?</Text>
                <Text className='text-blue-500 font-bold'>Sign up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen