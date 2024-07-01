import 'react-native-gesture-handler';

import React from 'react'
import { Platform, SafeAreaView, View, ScrollView } from 'react-native';
import { color, font } from '../global/styles';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import Home from "./home";
import Profile from "./profile";
import Articles from "./myarticleScreens/myArticles";
import Bookmarks from "./myBookmarks";


const Tab = createBottomTabNavigator();



const Main = ({route, userObj, isLoggedIn}) => {
  // const {username} = route.params;
    console.log(userObj.username)
    console.log(userObj.id)
    let username = userObj.username
    let email = userObj.email
    let user_id = userObj.id
    const Home1 = () => {
      return(
        <Home username={username} user_id={user_id}/>
      )
    }
    const Articles1 = () => {
      return(
        <Articles username={username} user_id={user_id}/>
      )
    }
    const Profile1 = () => {
      return(
        <Profile username={username} email={email} isLoggedIn={isLoggedIn}/>
      )
    }
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#FFF"}}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: color.primary,
            headerShown:false,
            tabBarStyle: {
              position: 'absolute',
              // height: Platform.OS === "android" ? 64 : 88,
              height: 64,
              paddingTop: 6,
              // paddingBottom: Platform.OS === "android" ? 8 : 32 ,
              paddingBottom: 4,
              // marginBottom: -10,
              borderWidth: 0,
              borderBottomWidth: 0,
              borderTopColor: color.veryLightGrey,
              borderTopWidth: 1,
            },
            tabBarLabelStyle: {
              fontFamily: font.medium,
              fontSize: 12,
            },
            tabBarHideOnKeyboard:true
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home1}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="home-variant" color={focused? color.primary: "#999999"} size={26} />
              ),
              tabBarActiveTintColor: color.primary,
              // tabBarActiveBackgroundColor: color.primary,
            }}
          />
          <Tab.Screen
            name="My Blogs"
            component={Articles1}
            options={{
              tabBarLabel: 'My Blogs',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="newspaper-variant" color={focused? color.primary: "#999999"} size={24} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="My Bookmarks"
            component={Bookmarks}
            options={{
              tabBarLabel: 'Bookmarks',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="bookmark" color={focused? color.primary: "#999999"} size={24}/>
              ),
            }}
          /> */}
          <Tab.Screen
            name="Profile"
            component={Profile1}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="account" color={focused? color.primary: "#999999"} size = {24} />
              ),
            }}
            />
        </Tab.Navigator>
        </SafeAreaView>
      )
}


export default Main;