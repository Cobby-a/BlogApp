import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native"
import { color, font } from "../global/styles";
import { Avatar, Button } from '@rneui/themed'
import { useNavigation } from "@react-navigation/native";
import { Context } from "../global/globalContext";
import React, {  useContext } from "react";


const Profile = ({username, email}) => {
    const logOut = () =>{
        setIsLoggedIn(false);
    }
    const globalContext = useContext(Context)
    const { setIsLoggedIn } = globalContext;
    return (
        <SafeAreaView style={styles.body}>
                <View style={styles.header}>
                    <Text style={{fontSize: 28, fontFamily: font.bold}}>My Profile</Text>
                </View>
            <View style={styles.container}>
                <ScrollView style={{paddingTop: 8,}} showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 100}}>
                        <View style={{alignItems: "center", justifyContent: 'center'}}>
                        <Avatar
                            rounded
                            title= {username[0]}
                            titleStyle={{fontFamily: font.semiBold, fontSize: 60, color: color.light, textTransform: 'uppercase'}}
                            size={140}
                            // activeOpacity = {0.7}
                            overlayContainerStyle={{backgroundColor: color.primary,}}
                            containerStyle={{marginVertical: 8}}
                        />
                        </View>
                        <View style={{marginTop: 50}}>
                            <Text style={{fontFamily: font.medium, fontSize: 16}}>Name:</Text>
                            <Text style={{fontFamily: font.bold, fontSize: 20}}>{username}</Text>
                        </View>
                        <View style={{marginTop: 20}}>
                            <Text style={{fontFamily: font.medium, fontSize: 16}}>Email:</Text>
                            <Text style={{fontFamily: font.bold, fontSize: 20}}>{email}</Text>
                        </View>
                        <Button onPress={()=>logOut()} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Log Out' activeOpacity={0.9}/>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Profile;

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
    button:{
        marginTop: 60,
        marginBottom: 4,
        width: 120,
        
    },
    buttonS:{
        backgroundColor: color.primary,
        borderRadius: 8,
        padding: 6,
        paddingVertical: 10,
    },
})