import React, { useState } from "react";
import { View, Alert, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '~/context/useAuth'
import StudentTab from './Student'
import TeacherTab from './Teacher'
import ParentTab from './Parent'
import LoginRouter from './Login'
// 课程界面
import StudentCourse from '~/view/Home/Student/Course'
// 公共界面
import UserDetail from '~/view/common/UserDetail'
import CreateDynamic from '~/view/common/CreateDynamic'
import CreateTag from '~/view/common/CreateTag'
import WaitLogin from '~/view/common/WaitLogin'
import StudentDormitory from '~/view/common/StudentDormitory'
import CreateMessage from '~/view/common/CreateMessage'
const Stack = createStackNavigator()

const justReturn = {
  'UserDetail': {
    headerShown: true,
    title: '',
    headerStyle: {
      backgroundColor: '#108ee9',
    },
    headerTintColor: '#fff',
  },
  'StudentCourse': { 
    title: '课程详情',
    headerShown: true,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#108ee9',
    },
    headerTintColor: '#fff',
  }
}
export default function () {
  const {
    isLoading,
    userType,
    token,
  } = useAuth()
  const defaultOptions = {
    headerShown: false
  }
  const loginRouter = {
    LoginRouter: LoginRouter,
  }
  const loadingRouter = {
    WaitLogin: WaitLogin,
  }
  const commonRouter = {
    UserDetail: UserDetail,
    CreateDynamic: CreateDynamic,
    CreateTag: CreateTag,
    StudentDormitory: StudentDormitory,
    CreateMessage: CreateMessage,
  }
  const studentRouter = {
    StudentTab: StudentTab,
    StudentCourse: StudentCourse, 
  }
  const teacherRouter = {
    TeacherTab: TeacherTab,
  }
  const parentRouter = {
    ParentTab: ParentTab,
  }
  const filterOptions = ({ route, }) => {
    let headerTitle = {}
    if( justReturn.hasOwnProperty(route.name) ){
      headerTitle = justReturn[route.name]
    }
    return {
      ...defaultOptions,
      ...headerTitle,
    }
  }
  return ( 
    <>
    {/* <View>
      <Text>userType: {userType}</Text>
      <Text>{token}</Text>
    </View> */}
    <NavigationContainer>
      <Stack.Navigator>
        {
          Object.entries({
            ...(isLoading === true ? loadingRouter : null),
            ...(token === null ? loginRouter : null),
            ...(userType === '0' ? studentRouter : null),
            ...(userType === '1' ? studentRouter : null),
            ...(userType === '2' ? teacherRouter : null),
            ...commonRouter,
          }).map( ([ name, component ]) => {
            return (
              <Stack.Screen 
                key={name} 
                name={name} 
                component={component} 
                options={filterOptions}
              />
            )
          })
        }
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}