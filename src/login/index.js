import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ButtonGroup from './loginBtn'
const LoginView = () => {
  const [ activeUser, setActiveUser ] = useState(0)
  
  return (
    <LinearGradient 
      colors={["#2BD9D9","#A4B1F5"]} 
      style={styles.loginWrapper}
      start={{ x : 0.0, y : 1 }} 
      end={{ x : 1, y : 0 }}
    >
      <ButtonGroup 
        active = { activeUser }
        setActive = { setActiveUser }
      />
     </LinearGradient>
  )
}
export default LoginView
const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
  }
})

