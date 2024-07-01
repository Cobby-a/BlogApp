import 'react-native-gesture-handler';

// import { color, font } from "../global/styles"
import { color, font } from '../../global/styles';

import { SafeAreaView, ScrollView } from 'react-native';
import { Text, View, StyleSheet, Image} from "react-native"

import { Ionicons } from "@expo/vector-icons";

import { TextInput, } from 'react-native-paper';
import { useState } from 'react';
import { Button} from "@rneui/themed";

import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const datum = [
    { label: 'Art', value: 'Art' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Technology', value: 'Technology' },
    { label: 'World', value: 'World' },
  ];

  

const NewBlog = ({username, user_id}) => {
    const navigation = useNavigation();
    
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [category, setCategory] = useState(null)
    const [isFocus, setIsFocus] = useState(false);

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    // const [category, setCategory] = useState("")

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageName(result.assets[0].fileName)
            console.log(image)
            console.log(imageName);
        }
      };

      const createBlog = () => {
        fetch(`https://blogvoyageapi.pythonanywhere.com/api/articles/`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({author: user_id, title: title, body: body, category: category})
        }
    )
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        navigation.navigate("Home")
    })
    .catch(error => console.log(error))
    }
      return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Text style={{fontSize: 28, fontFamily: font.bold}}>Add Your Blog</Text>
            </View>
            <ScrollView style={{paddingHorizontal: 16, paddingBottom: 16, }} showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 100}}>
                    <TextInput
                        label="Title"
                        value={title}
                        mode="outlined"
                        onChangeText={text => setTitle(text)}
                        // style={{paddin}}
                    />
                    <TextInput
                        label="Body"
                        value={body}
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
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={category}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCategory(item.value);
                        }}
                    />
                    <View style={styles.container}>
                        <Button onPress={pickImage} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Select an image for your blog' activeOpacity={0.9}/>
                        
                        {image && <Image source={{ uri: image }} style={{width: 200, height: 200}} />}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 12, alignItems:'center'}}>
                    <Text style={{fontFamily: font.italicRegular, fontSize: 16,color: color.primary}}>author: </Text>
                    <Text style={{fontFamily: font.medium, fontSize: 20, }}>{username}</Text>
                    </View>
                    <Button onPress={()=>createBlog()} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Create Blog' activeOpacity={0.9}/>
                </View>
            </ScrollView>
      </SafeAreaView>
      )
}

export default NewBlog;

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