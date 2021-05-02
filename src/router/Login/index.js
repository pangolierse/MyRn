import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/view/Home'
import Login from '~/login'
import Register from '~/login/Register'
const Stack = createStackNavigator()

export default function  () {
  return ( 
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
const styled = StyleSheet.create({
  
})