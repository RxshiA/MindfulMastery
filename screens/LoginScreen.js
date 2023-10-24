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
        <Text style={{ fontFamily: 'Popins-Regular', fontSize: 20 }}>
                Hey There,
            </Text>
            <Text style={{ fontFamily: 'Popins-Bold', fontSize: 24, marginBottom: 24 }}>
                Welcome Back
            </Text>

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
                autoCapitalize='none'
                secureTextEntry
                onChangeText={text => setPassword(text)}
                style={{ fontFamily: 'Popins-Regular', backgroundColor: 'white', width: '75%', marginBottom: 8, padding: 12, borderRadius: 15 }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: '#9DCEFF',
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    borderRadius: 20,
                    marginBottom: 16,
                    marginTop: 16,
                }}                
                onPress={signIn}
            >
                <Text Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Log In</Text>
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