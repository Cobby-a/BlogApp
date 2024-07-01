import 'react-native-gesture-handler';

import { ScrollView, StyleSheet, Text, View,  Pressable, RefreshControl } from "react-native"
import { color, font } from "../../global/styles";
import { StatusBar } from "expo-status-bar";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { Image } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

// import { data } from "../../rawData";
import React, { useState, useEffect } from "react";


import { FAB } from '@rneui/themed';
const Latest = ({user_id}) => {
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
    const navigation = useNavigation();
    return(
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
                        <Latest1 key={data.id} {...data} user_id={user_id}></Latest1>
                    )
                })}
                </View>
                
            </ScrollView>
            <FAB
                    style={{position: 'absolute', margin:16, right: 0, bottom: "10%", zIndex: 1, }}
                    // visible={false}
                    size='large'
                    icon = {{name: 'add', color: color.light}}
                    color= {color.primary}
                    onPress={()=>navigation.navigate('NewBlog')}
                    activeOpacity={0.9}
                />
            <StatusBar style="auto" translucent={false} />
            
        </View>
    )
}

const Latest1 = ({id, title, author_name, created_at, time_at, image_url, body, user_id, category}) => {
    const [IsBookmarked, setIsBookmarked] = useState(false);
    const navigation = useNavigation();
    const Bookmark = () => {
        setIsBookmarked(!IsBookmarked)
    }
    let firstLetter = author_name[0]
    return(
        <View>
            <Pressable style={styles.container1} onPress={()=> {navigation.navigate('BlogDetail', {
                            id: id,
                            title: title,
                            body: body,
                            image_url: image_url,
                            username: author_name,
                            user_id: user_id,
                            category: category
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

export default Latest;


const styles = StyleSheet.create({
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