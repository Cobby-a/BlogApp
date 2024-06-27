import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button, Input} from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { color, font } from "../../global/styles"


const LogInScreen = ({navigation}) =>{
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [passwordVisible1, setPasswordVisible1] = useState(true)
    return(
        <View  style={styles.container}>
            <ScrollView>
            <View style={styles.container1}>
            <View><Text style={{fontFamily: font.extraBold, fontSize: 32, color: color.blueblack, }}>BlogVoyage</Text></View>
            <Text style={{textAlign:"center", color: color.primary, fontSize: 18, fontFamily: font.semiBold, marginTop: 48}}>Sign in to your account</Text>
            <View style={styles.inputContainers}>
                <Input
                    placeholder="Enter your email address" 
                    leftIcon={<FontAwesome
                        name='envelope'
                        size={16}
                        color= '#999999'
                />}
                    // autoFocus 
                    type="email"
                    // value={email}
                    // onChangeText={(email)=>setEmail(email)}
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputstyle}
                    />
                
                <Input
                    placeholder="Enter your password" 
                    leftIcon={<FontAwesome
                        name='lock'
                        size={24}
                        color= '#999999'
                />}
                    rightIcon={<Ionicons
                        name={passwordVisible ? "eye" : "eye-off"}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        size={24}
                        color= '#444444'
                />}
                    secureTextEntry = {passwordVisible}
                    type="password"
                    // value={password}
                    // onChangeText={(password)=>setPassword(password)}
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputstyle}
                    />
            </View>
            <Button onPress={()=>navigation.navigate('LogIn')} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Log in' activeOpacity={0.9}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: color.lightGrey}} />
                <View><Text style={{width: 50, textAlign: 'center', fontSize: 16, fontFamily: font.regular, color: color.deepGrey}}>or</Text></View>
                <View style={{flex: 1, height: 1, backgroundColor: color.lightGrey}} />
            </View>
            <Button
              title="Continue with Google"
              icon={{name: 'google', type: 'font-awesome',size: 20,}}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontFamily: font.medium, fontSize: 16, color: color.dark }}
              buttonStyle={{borderColor: color.lightGrey, borderWidth:1, paddingVertical: 14, backgroundColor: color.light, borderRadius: 30, }}
              containerStyle={{width: "100%",marginVertical: 16,}}
              activeOpacity={0.8}
            />
            <Text style={{fontFamily: font.regular, fontSize: 15, color: '#1E1D1D'}}>Don't have an account? <Text style={{color:color.primary, fontFamily: font.semiBold}} onPress={()=>navigation.navigate('LogIn')}>Sign up here</Text></Text>
            </View>
            </ScrollView>
            <StatusBar style="auto" translucent={false} />
        </View>
        
        
    )
}


export default LogInScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.light,
        
    },
    container1:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingHorizontal: 16,
        marginTop: 100,
        marginBottom: 100,
        
    },
    inputContainers:{
        marginTop: 16,
        marginBottom: 10,
    },
    button:{
        marginTop: 4,
        marginBottom: 16,
        width: "100%",
        
    },
    buttonS:{
        backgroundColor: color.primary,
        borderRadius: 40,
        padding: 6,
        paddingVertical: 14,
    },
    input:{
        fontSize: 16,
        fontFamily: font.regular,
    },
    inputstyle:{
        marginVertical: 4,
        marginHorizontal: 8,
    },
    inputContainer:{
        borderWidth: 1,
        borderColor: color.lightGrey,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 10,
        backgroundColor: color.light,
        width: "106%",
    },
    
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 40,

    },

    footerText:{
        fontSize: 13,
        fontFamily: font.regular,
        color: '#1E1D1D'
    }
})