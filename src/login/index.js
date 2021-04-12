import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Settled from '../assets/image/Settled'
const LoginView = () => {
  return (
    <LinearGradient colors={["#57AFFF","#2A63BF","#042289"]} style={{flex:1}}>
      <View style = {styles.viewWrapper}>
        <Text style = {styles.span}>
        OKok
        </Text>
        <Settled/>
      </View>
     </LinearGradient>
  )
}
export default LoginView
const styles = StyleSheet.create({
  BtnWrapper: {
    width: '100%',
    height: 50,
  },

  userTypeBtn: {
    color: 'white',
  },
  viewWrapper: {
    flex: 1,
    height: 100,
    // backgroundColor: '#5692e1',
  },
  span: {
    color: 'white',
  }
})

