import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardScreen from './screens/OnboardScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/Home/HomeScreen';
import HelpHome from './screens/SeekHelp/HelpHome';
import SleepTimer from './screens/Home/SleepTimer';
import PsychologistHelp from './screens/SeekHelp/PsychologistHelp';
import Group from './screens/SeekHelp/Group';
import Chat from './screens/SeekHelp/Chat';
import NewJournal from './screens/Journal/NewJournal';
import TranquilMiddle from './screens/Tranquil/TranquilMiddle';
import TranquilMiddle2 from './screens/Tranquil/TranquilMiddle2';
import TranquilFinish from './screens/Tranquil/TranquilFinish';
import TranquilMap from './screens/Tranquil/TranquilMap';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';

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
      <InsideStack.Screen name='TranquilMiddle' component={TranquilMiddle}/>
      <InsideStack.Screen name='TranquilMiddle2' component={TranquilMiddle2}/>
      <InsideStack.Screen name='TranquilFinish' component={TranquilFinish}/>
      <InsideStack.Screen name='TranquilMap' component={TranquilMap}/>
      <InsideStack.Screen name='HelpHome' component={HelpHome}/>
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

  const [fontsLoaded] = useFonts({
    'Sora-SemiBold': require('./assets/fonts/Sora-SemiBold.ttf'),
    'Sora-Regular': require('./assets/fonts/Sora-Regular.ttf'),
    'Popins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Popins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Popins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Popins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Epilogue-Bold': require('./assets/fonts/Epilogue-Bold.ttf'),
    'Epilogue-Regular': require('./assets/fonts/Epilogue-Regular.ttf'),
    'Epilogue-Medium': require('./assets/fonts/Epilogue-Medium.ttf'),
    'AnekOdia-Bold': require('./assets/fonts/AnekOdia-Bold.ttf'),
    'AbhayaLibre-ExtraBold': require('./assets/fonts/AbhayaLibre-ExtraBold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'EBGaramond-Regular': require('./assets/fonts/EBGaramond-Regular.ttf'),
    'EBGaramond-MediumItalic': require('./assets/fonts/EBGaramond-MediumItalic.ttf'),
    'Archivo-SemiBold': require('./assets/fonts/Archivo-SemiBold.ttf'),
    'KantumruyPro-Regular': require('./assets/fonts/KantumruyPro-Regular.ttf'),
    'Hind-Bold': require('./assets/fonts/Hind-Bold.ttf'),
    'Hind-Medium': require('./assets/fonts/Hind-Medium.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboard'
      screenOptions={{headerShown: false}}>
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
