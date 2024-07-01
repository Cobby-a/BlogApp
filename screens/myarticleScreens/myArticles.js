import 'react-native-gesture-handler';

import { ScrollView, StyleSheet, Text, View,  Pressable, RefreshControl, SafeAreaView } from "react-native"
import { color, font } from '../../global/styles';
import { StatusBar } from "expo-status-bar";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { Image } from '@rneui/themed';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// import { data } from "../../rawData";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import MyArticleBlogDetail from './myarticleDetailblog';
import UpdateBlog from './updateMyArticle';

const Stack = createStackNavigator();

const Articles = ({ username, user_id}) => {
    
    const Articles2 = () => {
        const[data, setData] = useState([])
        const[loading, setLoading] = useState();
    
        const loadData = () =>{
            fetch('https://blogvoyageapi.pythonanywhere.com/api/articles/', {
                method: "GET"
            })
            .then(resp => resp.json())
            .then(data =>{
                // console.log(data)
                data = data.reverse();
                setData(data)
                setLoading(false)
            })
            .catch(error => console.log(error))
        }
    
        useEffect(() =>{
            loadData();
        }, [])
        return(
            <SafeAreaView style={styles.body}>
                <View style={styles.header}>
                    <Text style={{fontSize: 28, fontFamily: font.bold}}>My Blogs</Text>
                </View>
            <View style={styles.container}>
                <ScrollView style={{paddingTop: 8,}} showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={()=>loadData()}/>
                }
                
                >
                    <View style={{marginBottom: 100}}>
                    {data.map((data)=>{
                        // const {id, title, img, user,} = data;
                        return(
                            <Articles1 key={data.id} {...data}></Articles1>
                        )
                    })}
                    </View>
                    
                </ScrollView>
                <StatusBar style="auto" translucent={false} />
                
            </View>
          </SafeAreaView>
    
        )
    }
    
    const Articles1 = ({id, title, author_name, created_at, time_at, image_url, body, category,}) => {
        const [IsBookmarked, setIsBookmarked] = useState(false);
        const navigation = useNavigation();
        const Bookmark = () => {
            setIsBookmarked(!IsBookmarked)
        }
        let firstLetter = author_name[0]
        if(author_name === username){
            return(
                <View>
                <Pressable style={styles.container1} onPress={()=> {navigation.navigate('MyBlogDetail', {
                                id: id,
                                title: title,
                                body: body,
                                image_url: image_url,
                                username: author_name,
                                category: category,
                                user_id: user_id
                            })}}>
                    <View style={{width: 110}}>
                        <Image
                        source={{uri: image_url}}
                        containerStyle={{width: 100, height: 120, borderRadius: 10 }}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', width: "100%"}}><Text style={{fontSize: 18, fontFamily: font.semiBold, flex: 1, }} numberOfLines={2} >{title}</Text></View>
                        <View style={{flexDirection: 'row', marginTop: 24, alignItems: 'center'}}>
                            <Avatar
                                rounded
                                title= {firstLetter}
                                titleStyle={{fontFamily: font.medium, fontSize: 10, color: color.light, textTransform: 'capitalize'}}
                                size={20}
                                // activeOpacity = {0.7}
                                overlayContainerStyle={{backgroundColor: color.grey,}}
                                containerStyle={{marginRight: 8}}
                            />
                            <Text style={{fontSize: 14, color: color.primary}}>{author_name}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 4, alignItems: 'center', alignContent: "center", justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text>{created_at}</Text>
                                {/* <Text>{time_at}</Text> */}
                            </View>
                            <View style={{flexDirection: 'row', }}>
                                <FontAwesome
                                name="comment"
                                size={20}
                                color={color.darkAlt}
                                />
                                <Pressable onPress={Bookmark}>
                                    <MaterialCommunityIcons
                                    name={IsBookmarked ? "bookmark-outline" : "bookmark"}
                                    size={20}
                                    style={{marginLeft: 12}}
                                    color={color.darkAlt}
                                />
                                </Pressable>
                                
                            </View>
                        </View>
                    </View>
                </Pressable>
                <View style={{flex: 1, height: 1, backgroundColor: color.lightGrey,}} />
                
            </View>
            )
        }
    }
    return(
        <NavigationContainer independent={true} >
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='MyArticles' component={Articles2}/>
                <Stack.Screen name='MyBlogDetail' component={MyArticleBlogDetail}/>
                <Stack.Screen name='MyBlogedit' component={UpdateBlog}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default Articles;


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: color.light,
    },
    header: {
        backgroundColor: color.light,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 44,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    container: {
        flex: 1,
        backgroundColor: color.light,
        paddingHorizontal: 16,
        // marginVertical: 16,
        
    },
    container1: {
        flexDirection: "row",
        columnGap: 10,
        marginBottom: 24,
        marginTop: 20,
        // width: "100%"
    }
})