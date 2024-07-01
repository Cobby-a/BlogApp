import 'react-native-gesture-handler';

import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_400Regular_Italic } from '@expo-google-fonts/poppins';
import { font } from './global/styles';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './screens/authenticationScreens/SignUp';
import LogInScreen from './screens/authenticationScreens/LogIn';

import Main from './screens/main';

const Stack = createStackNavigator();

import { Context, Provider } from './global/globalContext';

export default function App(props) {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_400Regular_Italic,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  
  return (
    <Provider>
      <NavigationContainer>
          <Navigator/>
      </NavigationContainer>
    </Provider>
  );
}

const Navigator = (props) =>{
  const globalContext = useContext(Context)
  const {isLoggedIn, userObj} = globalContext;

  // let name = userObj[username]
  const Mainn = () => {
    return(
      <Main userObj={userObj} isLoggedIn={isLoggedIn}/>
    )
  }
  return(
    <Stack.Navigator>
    {(!isLoggedIn || !userObj)?
      <>
      <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
      </>
      :
      <Stack.Screen name="MainHome" component={Mainn} options={{headerShown:false}}/>
      }
      </Stack.Navigator>
  )
}