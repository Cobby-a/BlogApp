import 'react-native-gesture-handler';


import Latest from "./homeScreens/latest"
import Art from "./homeScreens/art"
import World from "./homeScreens/world"
import Technology from "./homeScreens/technology"
import Sport from "./homeScreens/sports"

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { color, font } from "../global/styles"
import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet} from "react-native"

import { Ionicons } from "@expo/vector-icons"

import NewBlog from './homeScreens/newBlog';

import BlogDetail from './homeScreens/detailsBlog';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Home = ({username, user_id}) => {
    
      const NewBlog1 = () => {
        return(
          <NewBlog username={username} user_id={user_id}/>
        )
      }
      const Art1 = () => {
        return(
          <Art user_id={user_id}/>
        )
      }
      const Sports1 = () => {
        return(
          <Sport user_id={user_id}/>
        )
      }
      const World1 = () => {
        return(
          <World user_id={user_id}/>
        )
      }
      const Technology1 = () => {
        return(
          <Technology user_id={user_id}/>
        )
      }
      const Latest1 = () => {
        return(
          <Latest user_id={user_id}/>
        )
      }
      const BlogDetail1 = () =>{
        return(
        <BlogDetail username={username}/>
        )
      }

      const All = () => {
      return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{fontSize: 28, fontFamily: font.bold}}>Home</Text>
                <View>
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color={color.dark}
                    />
                </View>
            </View>
          <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: color.dark,
            tabBarLabelStyle: { fontSize: 15, fontFamily: font.medium,  textTransform: "capitalize", marginBottom: -1},
            // lazy: false,
            tabBarScrollEnabled: true,
            tabBarItemStyle: {width: "auto",  paddingHorizontal: 16},
            tabBarIndicatorStyle: {
                // borderWidth: 1,
                backgroundColor: color.deepGrey,
                width: 0.7,
                height: 1.5
                // marginHorizontal: 12,
            }           
          }}
        >
          <Tab.Screen name='Latest' component={Latest1} 
          
          />
          <Tab.Screen name='Art' component={Art1} />
          <Tab.Screen name='World' component={World1} />
          <Tab.Screen name='Technology' component={Technology1} />
          <Tab.Screen name='Sports' component={Sports1} />
          
        </Tab.Navigator>
    
      </SafeAreaView>
      )
    }
    
    return (
      <NavigationContainer independent={true} >
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Home' component={All} />
          <Stack.Screen name='NewBlog' component={NewBlog1} />
          <Stack.Screen name='BlogDetail' component={BlogDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Home;

const styles = StyleSheet.create({
    header: {
        backgroundColor: color.light,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 44,
        paddingHorizontal: 16,
        paddingBottom: 16,
    }
})