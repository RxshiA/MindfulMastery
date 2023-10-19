import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardScreen from './screens/OnboardScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/Home/HomeScreen';
import SleepTimer from './screens/Home/SleepTimer';
import PsychologistHelp from './screens/SeekHelp/PsychologistHelp';
import Group from './screens/SeekHelp/Group';
import Chat from './screens/SeekHelp/Chat';
import NewJournal from './screens/Journal/NewJournal';
import TranquilFinish from './screens/Tranquil/TranquilFinish';
import TranquilMap from './screens/Tranquil/TranquilMap';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout(){
  return (
    <InsideStack.Navigator
      screenOptions={{headerShown: false}}>
      <InsideStack.Screen name='Home' component={HomeScreen}/>
      <InsideStack.Screen name='SleepTimer' component={SleepTimer}/>
      <InsideStack.Screen name='PsychologistHelp' component={PsychologistHelp}/>
      <InsideStack.Screen name='Group' component={Group}/>
      <InsideStack.Screen name='Chat' component={Chat}/>
      <InsideStack.Screen name='NewJournal' component={NewJournal}/>
      <InsideStack.Screen name='TranquilFinish' component={TranquilFinish}/>
      <InsideStack.Screen name='TranquilMap' component={TranquilMap}/>
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('Current user: ', user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboard'>
        {user ? (
          <Stack.Screen name='InsideLayout' component={InsideLayout} options={{headerShown: false}}/>
        ) : (
          <>
          <Stack.Screen name='Onboard' component={OnboardScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Register' component={RegisterScreen}/>
          </>
        )
        }
        
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
