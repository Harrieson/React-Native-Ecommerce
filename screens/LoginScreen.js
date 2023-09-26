import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const LoginScreen = () => {
    const  [email, setEmail] = useState();
    const  [password, setPassword] = useState();
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1 , backgroundColor: "white", alignItems: "center"}}>
      <View>
      <Image style={{width: 150, height: 100}} 
            source={{
                uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
      }}
      />
      </View>
      <KeyboardAvoidingView>
        <View style={{alignItems: "center"}}>
            <Text style={{fontSize:17, fontWeight:"bold", marginTop:12, color:"#041E42"}}>
                Login to your Account
            </Text>
        </View>
        <View style={{marginTop:70}}>
            <View style={{flexDirection:"row", alignItems:"center", gap:5,
                            backgroundColor:"#D0D0D0", paddingVertical:5,
                            borderRadius:10, marginTop:30}}>
                <MaterialIcons name="email" size={24} color="black" style={{marginLeft:8}} />
                <TextInput value={email} onChange={(text) => setEmail(text)} 
                            placeholder='enter your email' style={{color:"gray", marginVertical:10, width:300}} />
            </View>
        </View>

        <View style={{marginTop:30}}>
            <View style={{flexDirection:"row", alignItems:"center", gap:5,
                            backgroundColor:"#D0D0D0", paddingVertical:5,
                            borderRadius:10, marginTop:30}}>
                <AntDesign name="lock1" size={24} color="black" style={{marginLeft:8}}/>
                <TextInput secureTextEntry={true} value={password} onChange={(text) =>setPassword(text)} 
                            placeholder='enter your password' style={{color:"gray", marginVertical:10, width:300}} />
            </View>
        </View>
        <View style={{marginTop:12, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <Text>Keep me Logged in</Text>
            <Text style={{color:"#007FFF", fontWeight:"500"}}>Forgot Password?</Text>
        </View>

        <View style={{marginTop:80}} />


        <Pressable 
        style={{width:200, backgroundColor:"#FEBE10", 
                borderRadius: 6, marginLeft: "auto", 
                marginRight:"auto", padding:15}} >
                
                    <Text style={{textAlign:"center", color:"white", fontSize:16, fontWeight:"bold"}}>Login</Text>
                    
                </Pressable>
                <View style={{marginTop:30, flexDirection: "row", justifyContent:"center"}}>
                    <Text>Don't have an account?</Text>
                    <Pressable style={{marginLeft:5}} onPress={() => navigation.navigate("Register")}>
                        <Text style={{color:"#007FFF"}}>Register</Text>
                    </Pressable>
                </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})