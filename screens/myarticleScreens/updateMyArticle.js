import 'react-native-gesture-handler';

// import { color, font } from "../global/styles"
import { color, font } from '../../global/styles';

import { SafeAreaView, ScrollView } from 'react-native';
import { Text, View, StyleSheet, Image, Alert} from "react-native"

import { Ionicons } from "@expo/vector-icons";

import { TextInput, } from 'react-native-paper';
import { useState } from 'react';
import { Button} from "@rneui/themed";

import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
  

const UpdateBlog = ({route}) => {
    const navigation = useNavigation();

    const {id, title, body, image_url, author, category, user_id} = route.params;

    const datum = [
        { label: category, value: category },
      ];
    
    const [image, setImage] = useState(null);
    const [value, setValue] = useState(null)
    const [isFocus, setIsFocus] = useState(false);

    const [title1, setTitle] = useState(title)
    const [body1, setBody] = useState(body)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const updataBlog = () =>{
        fetch(`https://blogvoyageapi.pythonanywhere.com/api/articles/${id}/`, {
            method: "PUT",
            headers:{
                'Content-Type' : 'application/json'
                },
            body:JSON.stringify({title: title1, body: body1, author: user_id, category: category })
        })
        .then(resp => resp.json())
        .then(data =>{
            console.log(data)
            navigation.navigate("MyArticles")
            // data = data.reverse();
            // setData(data)
            // setLoading(false)
        })
        .catch(error =>{
            Alert.alert("Error", error)
        })
      }

      return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Text style={{fontSize: 28, fontFamily: font.bold}}>Update Your Blog</Text>
            </View>
            <ScrollView style={{paddingHorizontal: 16, paddingBottom: 16, }} showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 100}}>
                    <TextInput
                        label="Title"
                        value={title1}
                        mode="outlined"
                        onChangeText={text => setTitle(text)}
                        // style={{paddin}}
                    />
                    <TextInput
                        label="Body"
                        value={body1}
                        mode="outlined"
                        onChangeText={text => setBody(text)}
                        style={{marginTop: 50}}
                        multiline
                        numberOfLines={10}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: color.primary }]}
                        placeholderStyle={{fontSize: 16}}
                        selectedTextStyle={{fontSize: 16}}
                        inputSearchStyle={{height: 40, fontSize: 16, fontFamily: font.medium}}
                        // iconStyle={styles.iconStyle}
                        data={datum}
                        // search
                        maxHeight={300}
                        labelField={"label"}
                        valueField={"value"}
                        placeholder={category}
                        // searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                        }}
                    />
                    <View style={styles.container}>
                        <Button onPress={pickImage} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Select an image for your blog' activeOpacity={0.9}/>
                        
                        {image && <Image source={{ uri: image }} style={{width: 200, height: 200}} />}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12, alignItems:'center'}}>
                    <Text style={{fontFamily: font.italicRegular, fontSize: 16,color: color.primary}}>author: </Text>
                    <Text style={{fontFamily: font.medium, fontSize: 20, }}>{author}</Text>
                    </View>
                    <Button onPress={()=>updataBlog()} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Update your article' activeOpacity={0.9}/>
                </View>
            </ScrollView>
      </SafeAreaView>
      )
}

export default UpdateBlog;

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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 50,
      },
      button:{
        marginTop: 50,
        marginBottom: 4,
        width: "100%",
        
    },
    buttonS:{
        backgroundColor: color.primary,
        borderRadius: 40,
        padding: 6,
        paddingVertical: 10,
    },
})