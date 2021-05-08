import React, { useState } from "react";
import { View, Alert, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '~/context/useAuth'
import StudentTab from './Student'
import TeacherTab from './Teacher'
import ParentTab from './Parent'
import LoginRouter from './Login'
// 公共界面
// 用户详情
import UserDetail from '~/view/common/UserDetail'
// 用户编辑个人资料
import EditUserInfo from '~/view/common/EditUserInfo'
// 创建动态
import CreateDynamic from '~/view/common/CreateDynamic'
// 创建标签界面
import CreateTag from '~/view/common/CreateTag'
// 暂时loading
import WaitLogin from '~/view/common/WaitLogin'
// 学生宿舍界面
import StudentDormitory from '~/view/common/StudentDormitory'
// 创建消息界面
import CreateMessage from '~/view/common/CreateMessage'
// 课程界面
import Course from '~/view/common/Course'
// 扫码界面
import ScanView from '~/view/common/ScanView'
// 二维码界面
import QRView from '~/view/common/QRView'
const Stack = createStackNavigator()

const justReturn = {
  // 'UserDetail': {
  //   headerShown: true,
  //   title: '',
  //   headerStyle: {
  //     backgroundColor: '#108ee9',
  //   },
  //   headerTintColor: '#fff',
  // },
  // 'Course': { 
  //   title: '课程详情',
  //   headerShown: true,
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  //   headerStyle: {
  //     backgroundColor: '#108ee9',
  //   },
  //   headerTintColor: '#fff',
  // }
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
    Course: Course,
    ScanView: ScanView,
    EditUserInfo: EditUserInfo,
    QRView: QRView,
  }
  const studentRouter = {
    StudentTab: StudentTab,
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
            ...((userType === '5' && token !== null) ? studentRouter : null),
            ...((userType === '4' && token !== null) ? studentRouter : null),
            ...((userType <= '3' && token !== null) ? teacherRouter : null),
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