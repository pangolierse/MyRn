
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/assets/svg/Home'
import Foot from '~/assets/svg/Foot'
import Message from '~/assets/svg/Message'
import Dynamic from '~/assets/svg/Dynamic'
import Personal from '~/assets/svg/Personal'
import HomeScreen from '~/view/Home'
import DynamicScreen from '~/view/Dynamic'
import FootScreen from '~/view/Foot'
import MessageScreen from '~/view/Message'
import PersonalScreen from '~/view/Personal'
const Tab = createBottomTabNavigator();
const tabRoutes = {
  'home': {
    svg: Home,
    title: '首页',
  },
  'dynamic': {
    svg: Dynamic,
    title: '动态',
  },
  'message': {
    svg: Message,
    title: '消息',
  },
  'personal': {
    svg: Personal,
    title: '个人中心',
  },
}
export default function TeacherTab () {
  return (
      <Tab.Navigator  
        backBehavior = 'none'
        screenOptions=  {({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // You can return any component that you like here!
            let Svg = tabRoutes[route.name].svg
            return <Svg color = {color} size = {size} />
          },
          title: tabRoutes[route.name].title,
        })}
        tabBarOptions={{
          activeTintColor: '#8dc1fb',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="dynamic" component={DynamicScreen}/>
        {/* <Tab.Screen name="message" component={MessageScreen}/> */}
        <Tab.Screen name="personal" component={PersonalScreen}/>
      </Tab.Navigator>
  );
}