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
const Stack = createStackNavigator()

const justReturn = ['UserDetail']
export default function () {
  const {
    userType,
    token,
  } = useAuth()
  const defaultOptions = {
    headerShown: false
  }
  const titleOptions = {
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  const loginRouter = {
    LoginRouter: LoginRouter,
  }
  const commonRouter = {
    UserDetail: UserDetail,
    CreateDynamic: CreateDynamic,
    CreateTag: CreateTag,
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
    if( justReturn.indexOf(route.name) > -1 ){
      headerTitle = {
        headerShown: true,
        title: '',
        headerStyle: {
          backgroundColor: '#108ee9',
        },
        headerTintColor: '#fff',
      }
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
            ...(token === null ? loginRouter: null),
            ...(userType === '0' ? teacherRouter : null),
            ...(userType === '1' ? studentRouter : null),
            ...(userType === '2' ? parentRouter : null),
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
        <Stack.Screen 
          name={'StudentCourse'} 
          component={StudentCourse}
          options={{ title: '课程详情', ...titleOptions }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}