import 'react-native-gesture-handler';

// import { color, font } from "../global/styles"
import { color, font } from '../../global/styles';

import { Text, View, StyleSheet, SafeAreaView, ScrollView,RefreshControl, Alert} from "react-native"

import { Image } from '@rneui/themed';
import { TextInput, } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Button} from "@rneui/themed";

const BlogDetail = ({route }) => {
    const[data, setData] = useState([])
    const[loading, setLoading] = useState();

    const loadData = () =>{
        fetch('https://blogvoyageapi.pythonanywhere.com/api/articles/comments', {
            method: "GET"
        })
        .then(resp => resp.json())
        .then(data =>{
            data = data.reverse();
            setData(data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }

    useEffect(() =>{
        loadData();
    }, [])

    const createComment = () => {
        fetch('https://blogvoyageapi.pythonanywhere.com/api/articles/comments', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({article: id, author: user_id, comment: comment})
        }
    )
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        loadData();
    })
    .catch(error => {
        console.log("error")
        // Alert.alert(error)
        Alert.alert('Error', error)

    })
    }

    const {title, body, image_url, username, id, user_id, category} = route.params;
    const [comment, setComment] = useState("");
      return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Text style={{fontSize: 20, fontFamily: font.bold}}>{title}</Text>
            </View>
            <ScrollView style={{paddingHorizontal: 16, paddingBottom: 16, }} automaticallyAdjustKeyboardInsets={true} refreshControl={
                <RefreshControl refreshing={loading} onRefresh={()=>loadData()}/>
            } showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 100}}>
                    <Image source={{uri: image_url}} style={{width: "100%", height: 200, maxWidth: 400}}/>
                    <View style={{width:"100%", marginTop: 12}}>
                        <Text style={{fontSize: 16, fontFamily: font.regular}}>
                            {body}
                        </Text>
                    </View>
                    <View style={{marginTop: 28,}}>
                        <Text style={{fontSize: 16, fontFamily: font.italicRegular}}>Category:</Text>
                        <Text style={{fontSize: 18, fontFamily: font.medium}}>{category}</Text>
                    </View>
                    <View style={{marginTop: 20, marginBottom: 48}}>
                        <Text style={{fontSize: 16, fontFamily: font.italicRegular}}>By:</Text>
                        <Text style={{fontSize: 18, fontFamily: font.medium}}>{username}</Text>
                    </View>
                    <View>
                    <View>
                        <Text style={{color: color.primary, fontFamily: font.italicRegular, fontSize: 16}}>Leave comment</Text>
                            <TextInput
                            label="Write your comment here"
                            value={comment}
                            mode="outlined"
                            onChangeText={text => setComment(text)}
                            style={{marginTop: 2}}
                            multiline
                            numberOfLines={3}
                            />
                        <Button onPress={()=>createComment()} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Submit' activeOpacity={0.9}/>
                    </View>
                    <View style={{marginTop: 32}}>
                        <Text style={{ fontFamily: font.bold, fontSize: 18, marginBottom: 12}}>Comments:</Text>
                        {data.map((data)=>{
                            const {id, comment, article_name, time_at, created_at, author_name,} = data;
                            if(article_name === title){
                                return(
                                    <View key={id}>
                                        <Text style={{fontFamily: font.regular, fontSize: 16, marginBottom: 10}}>{comment}</Text>
                                        <Text style={{fontFamily: font.medium, fontSize: 14,  color: color.primary}}>By: {author_name}</Text>
                                        <Text style={{fontFamily: font.italicRegular, fontSize: 14, color: "#666666", }}>at: {created_at}, {time_at}</Text>
                                        <View style={{flex: 1, height: 1, backgroundColor: color.lightGrey, marginTop: 16, marginBottom: 16}} />
                                    </View>
                                )
                            }
                            else{
                                return null;
                            }
                        })}
                    </View>
                    </View>
                </View>
            </ScrollView>
      </SafeAreaView>
      )
}

export default BlogDetail;

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
    button:{
        marginTop: 12,
        marginBottom: 4,
        width: 100,
        
    },
    buttonS:{
        backgroundColor: color.primary,
        borderRadius: 40,
        padding: 6,
        paddingVertical: 4,
    },
})