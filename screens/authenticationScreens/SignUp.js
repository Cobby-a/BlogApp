import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button, Input} from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useState, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { color, font } from "../../global/styles"
import { Snackbar } from "react-native-paper";
import { Context } from "../../global/globalContext";


const SignUpScreen = ({navigation}) =>{
    const globalContext = useContext(Context)
    const { setIsLoggedIn, appSettings, domain, userObj, setUserObj, setToken } = globalContext;

    const [passwordVisible, setPasswordVisible] = useState(true)
    const [passwordVisible1, setPasswordVisible1] = useState(true)

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [isValid, setIsValid] = useState(true)

    function handleLogin() {
        let regex = /^[a-zA-Z\s]+$/;

        if(username.length == 0){
            setIsValid({bool : true, boolSnack: true, message: "Username field cannot be empty"})
            return;
        }
        if(username.charAt(0) == " "){
            setIsValid({bool : true, boolSnack: true, message: "Your first character cannot be empty, please clear the white space at begining of name"})
            return;
        }
        if(username.length < 3){
            setIsValid({bool : true, boolSnack: true, message: "Username must have at least 3 characters"})
            return;
        }
        if(regex.test(username) == false){
            setIsValid({bool : true, boolSnack: true, message: "Invalid input type for name. Only accepts string characters"})
            return;
        }
        if(email.length == 0){
            setIsValid({bool : true, boolSnack: true, message: "Cannot have an empty field for email"})
            return;
        }
        if(password.length == 0){
            setIsValid({bool : true, boolSnack: true, message: "Cannot have an empty field for password"})
            return;
        }
        if(password.length < 8){
            setIsValid({bool : true, boolSnack: true, message: "password must be at least 8 characters"})
            return;
        }
        if(password === password1){
        let body = JSON.stringify({
            'username': username,
            'email':email.toLowerCase(),
            'password': password
        })

        fetch(`${domain}/api/user/create-user/`, {
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json'
            },
        body:body
          })
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
            setIsValid({bool : true, boolSnack: true, message: "User already exists"});
              throw res.json()
            }
          })
          .then(json => {
            setUserObj(json),
            // setIsLoggedIn(true),
            setToken(json.token)
          })
          .catch(error => {
            console.log(error)
          })
          
        }
        else{
            setIsValid({bool : true, boolSnack: true, message: "passwords do not match"})
            return;
        }
        navigation.navigate('LogIn')
        }
    return(
        <View  style={styles.container}>
            <ScrollView>
            <View style={styles.container1}>
            <View><Text style={{fontFamily: font.extraBold, fontSize: 32, color: color.blueblack, }}>BlogVoyage</Text></View>
            <Text style={{textAlign:"center", color: color.primary, fontSize: 18, fontFamily: font.semiBold, marginTop: 48}}>New here? Join us now</Text>
            <View style={styles.inputContainers}>
                <Input
                    placeholder="Enter your name" 
                    leftIcon={<FontAwesome
                        name='user'
                        size={24}
                        color= '#999999'
                />}
                    type="text"
                    value={username}
                    onChangeText={(username)=>setUsername(username)}
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputstyle}
                    />

                <Input
                    placeholder="Enter your email" 
                    leftIcon={<FontAwesome
                        name='envelope'
                        size={16}
                        color= '#999999'
                />}
                    // autoFocus 
                    type="email"
                    value={email}
                    onChangeText={(email)=>setEmail(email)}
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputstyle}
                    />
                
                <Input
                    placeholder="Create a password" 
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
                    value={password}
                    onChangeText={(password)=>setPassword(password)}
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputstyle}
                    />
                <Input
                    placeholder="Confirm your password" 
                    leftIcon={<FontAwesome
                        name='lock'
                        size={24}
                        color= '#999999'
                />}
                    rightIcon={<Ionicons
                        name={passwordVisible1 ? "eye" : "eye-off"}
                        onPress={() => setPasswordVisible1(!passwordVisible1)}
                        size={24}
                        color= '#444444'
                />}
                    secureTextEntry = {passwordVisible1}
                    type="password1"
                    value={password1}
                    onChangeText={(password1)=>setPassword1(password1)}
                    style={styles.input}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputstyle}
                    />
            </View>
            <Button onPress={()=>handleLogin()} containerStyle={styles.button} titleStyle={{fontSize: 16,fontFamily: font.medium,}} buttonStyle={styles.buttonS} title='Sign up' activeOpacity={0.9}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: color.lightGrey}} />
                <View><Text style={{width: 50, textAlign: 'center', fontSize: 16, fontFamily: font.regular, color: color.deepGrey}}>or</Text></View>
                <View style={{flex: 1, height: 1, backgroundColor: color.lightGrey}} />
            </View>
            <Button
              title="SignUp with Google"
              icon={{name: 'google', type: 'font-awesome',size: 20,}}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontFamily: font.medium, fontSize: 16, color: color.dark }}
              buttonStyle={{borderColor: color.lightGrey, borderWidth:1, paddingVertical: 14, backgroundColor: color.light, borderRadius: 30, }}
              containerStyle={{width: "100%",marginVertical: 16,}}
              activeOpacity={0.8}
            />
            <Text style={{fontFamily: font.regular, fontSize: 15, color: '#1E1D1D'}}>Already have an account? <Text style={{color:color.primary, fontFamily: font.semiBold}} onPress={()=>navigation.navigate('LogIn')}>Log in here</Text></Text>
            </View>
            </ScrollView>
            <Snackbar 
                visible={isValid.boolSnack}
                duration={4000}
                onDismiss={()=>{setIsValid({boolSnack: false})}}
                style={{backgroundColor:"red",}}
                
            >
                {isValid.message}
            </Snackbar>
            <StatusBar style="auto" translucent={false} />
        </View>
        
        
    )
}


export default SignUpScreen;

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
        marginTop: 90,
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