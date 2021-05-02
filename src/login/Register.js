import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TouchableWithoutFeedback, Alert} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { setSpText, scaleSize} from '~/util/adapt'
import User from '~/assets/svg/User'
import Password from '~/assets/svg/Password'
import EyeOpen from '~/assets/svg/Eye_open'
import EyeClose from '~/assets/svg/Eye_close'
import Input from '~/component/Input'
import { useNavigation } from "@react-navigation/core";
import { useAuth } from '~/context/useAuth'
const teacherType = [[
  {
    label: '课程教师',
    value: 2,
  },{
    label: '宿舍教师',
    value: 3,
  },{
    label: '营地管理员',
    value: 4,
  }
]]
const teacherTypeMap = {
  '2': '课程教师',
  '3': '宿舍教师',
  '4': '营地管理员',
}
export default function LoginBtn () {
  const { login } = useAuth()
  const history = useNavigation()
  const [ activeType, setActiveType ] = useState(0)
  const [ ateacherType, setTeacherType ] = useState([0])
  const [ eyeOpen, setEveOpen ] = useState(false)
  const [ params, setParams ] = useState({
    userType: 1,
    username: '',
    password: '',
  })
  // tab 切换
  const onPress = (t) => {
    return () => {
      setParams({
        ...params,
        userType: t,
      })
      setActiveType(t)
    }
  }
  // 处理input输入切换
  const handleUserName = (value) => {
    setParams({
      ...params,
      username: value.replace(/[^\d]/g,''),
    })
  }
  const handlePassword = (value) => {
    setParams({
      ...params,
      password: value.replace(/[^\d]/g,''),
    })
  }
  // 表单提交
  const handleOnPress = (e) => {
    setEveOpen(!eyeOpen)
  }
  const handleRegister = () => {
    Alert.alert('注册')
    // login(params)
  }
  return (
    
    <LinearGradient 
      colors={["#2BD9D9","#A4B1F5"]} 
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingBottom: setSpText(80),
      }}
      start={{ x : 0.0, y : 1 }} 
      end={{ x : 1, y : 0 }}
    >
        <View style = {styled.titleWrapper}>
          <Text style = {styled.title}>
            注册
          </Text>
          <Text style = {{
            fontSize: scaleSize(32),
            fontWeight: 'bold',
            marginTop: setSpText(6)
          }}>
            您好，家长请输入账号和密码
          </Text>
        </View>
        <View style = {styled.inputWrapper}>
          <Input 
            style = {{
              marginTop: setSpText(10),
            }}
            value = { params.username }
            onChangeText = { handleUserName }
            placeholder = {'请输入账号'}
            Preffix = {<User style = {{width:20}}/>}
          />
          <View>
            <Input 
              style = {{
                marginTop: setSpText(10),
              }}
              color = 'black'
              value = { params.password }
              onChangeText = { handlePassword }
              placeholder = {'请输入密码'}
              secureTextEntry = {!eyeOpen}
              Preffix = {<Password style = {{width:20}}/>}
            />
            <TouchableWithoutFeedback onPress = {handleOnPress} >
              <View
                style = {styled.passwordIcon}
              >
                {eyeOpen ? <EyeOpen/> : <EyeClose/>}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{marginTop: setSpText(10)}}>
            <Button
              color='#5692e1'
              title="注册"
              onPress={handleRegister}
            />
          </View>
        </View>
    </LinearGradient>
  )
}
function CustomType ({
  onPress,
  children,
  value,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: setSpText(25),
          paddingLeft: 15,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: setSpText(25),
          backgroundColor: 'transparent',
          borderWidth: setSpText(0.1),
          borderColor: '#333'
        }}
      >
      <Text style={{ flex: 1 }}>{children}</Text>
      <Text style={{ textAlign: 'right', color: '#646464', marginRight: 15 }}>
        {value}
      </Text>
    </View>
  </TouchableOpacity>
  )
}
function MyButton({
  Svg,
  onPress,
  borderColor,
}) {
  const borderColors = {
    borderRightColor: borderColor,
    borderLeftColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
  }
  return (
    <TouchableOpacity
      style = {[ 
        styled.button,
        borderColors
      ]}
      onPress = { onPress }
    >
      {Svg}
    </TouchableOpacity>
  )
}

const styled = StyleSheet.create({
  titleWrapper: {
    marginTop: setSpText(40),
    alignItems: 'center',
  },
  title: {
    color: '#1b1d1d',
    fontSize: setSpText(30),
    fontWeight: 'bold',
  },
  button: {
    width: setSpText(30),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#554C8F',
    borderLeftColor: '#554C8F',
    borderTopColor: '#554C8F',
    borderBottomColor: '#554C8F',
    borderRightWidth: setSpText(0.5),
    borderLeftWidth: setSpText(0.5),
    borderTopWidth: setSpText(0.5),
    borderBottomWidth: setSpText(0.5),
    borderRadius: setSpText(30),
  },
  btnWrapper: {
    height: setSpText(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: setSpText(40),
    paddingRight: setSpText(40),
    marginTop: setSpText(20),
    marginBottom: setSpText(20),
  },
  inputWrapper: {
    paddingLeft: setSpText(20),
    paddingRight: setSpText(20),
  },
  passwordIcon: {
    height: setSpText(20),
    width: setSpText(20),
    position: 'absolute',
    right: setSpText(0),
    top: setSpText(15),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})