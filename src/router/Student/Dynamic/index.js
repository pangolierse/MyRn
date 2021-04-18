import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DynamicScreen from '~/view/Dynamic'
import HomeScreen from '~/view/Home'
import FootScreen from '~/view/Foot'
import MessageScreen from '~/view/Message'
import PersonalScreen from '~/view/Personal'
const Stack = createStackNavigator()

export default function  () {
  return ( 
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="dynamic" component={DynamicScreen}/>
    </Stack.Navigator>
  )
}
const styled = StyleSheet.create({
  
})