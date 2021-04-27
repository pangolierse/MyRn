import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TouchableWithoutFeedback, Alert} from "react-native";
import { setSpText, scaleSize} from '~/util/adapt'
import Parent from '~/assets/svg/Parent' 
import Student from '~/assets/svg/Student'
import Teacher from '~/assets/svg/Teacher'
import User from '~/assets/svg/User'
import Password from '~/assets/svg/Password'
import EyeOpen from '~/assets/svg/Eye_open'
import EyeClose from '~/assets/svg/Eye_close'
import Input from '~/component/Input'
import { useNavigation } from "@react-navigation/core";
import { useAuth } from '~/context/useAuth'
export default function LoginBtn () {
  const { login } = useAuth()
  const history = useNavigation()
  const [ activeType, setActiveType ] = useState(0)
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
  const handleLogin = () => {
    login(params)
    // history.navigate('StudentRouter')
  }
  return (
    <>
      <View style = {styled.titleWrapper}>
        <Text style = {styled.title}>
          登录
        </Text>
      </View>
      <View style = {styled.btnWrapper}>
        <MyButton Svg = {<Parent color = {activeType === 0 ? 'black' : '#554C8F'}/>} onPress = {onPress(0)} borderColor={activeType === 0 ? 'black':'#554C8F'}/>
        <MyButton Svg = {<Student color = {activeType === 1 ? 'black' : '#554C8F'}/>} onPress = {onPress(1)} borderColor={activeType === 1 ? 'black':'#554C8F'}/>
        <MyButton Svg = {<Teacher color = {activeType === 2 ? 'black' : '#554C8F'}/>} onPress = {onPress(2)} borderColor={activeType === 2 ? 'black':'#554C8F'}/>
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
        <View style={{marginTop: setSpText(15)}}>
          <Button
            color='#5692e1'
            title="登录"
            onPress={handleLogin}
          />
        </View>
      </View>
    </>
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
    flexDirection: 'row',
    marginTop: setSpText(40),
    justifyContent: 'center',
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
    marginTop: setSpText(30),
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
    top: setSpText(10),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})