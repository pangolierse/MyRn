import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TouchableWithoutFeedback} from "react-native";
import { setSpText, scaleSize} from '~/util/adapt'
import Parent from '~/assets/svg/Parent' 
import Student from '~/assets/svg/Student'
import Teacher from '~/assets/svg/Teacher'
import User from '~/assets/svg/User'
import Password from '~/assets/svg/Password'
import EyeOpen from '~/assets/svg/Eye_open'
import EyeClose from '~/assets/svg/Eye_close'
import Input from '~/component/Input'

export default function ({
  active,
  setActive,
}) {
  const onPress = (t) => {
    return () => {setActive(t)}
  }
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ eyeOpen, setEveOpen ] = useState(false)
  const handleUserName = (value) => {
    setUserName(value.replace(/[^\d]/g,''))
  }
  const handlePassword = (value) => {
    setPassword(value.replace(/[^a-z0-9.]/ig,''))
  }
  const handleOnPress = (e) => {
    setEveOpen(!eyeOpen)
  }
  return (
    <>
      <View style = {styled.titleWrapper}>
        <Text style = {styled.title}>
          登录
        </Text>
      </View>
      <View style = {styled.btnWrapper}>
        <MyButton Svg = {<Parent color = {active === 0 ? 'black' : '#554C8F'}/>} onPress = {onPress(0)} borderColor={active === 0 ? 'black':'#554C8F'}/>
        <MyButton Svg = {<Student color = {active === 1 ? 'black' : '#554C8F'}/>} onPress = {onPress(1)} borderColor={active === 1 ? 'black':'#554C8F'}/>
        <MyButton Svg = {<Teacher color = {active === 2 ? 'black' : '#554C8F'}/>} onPress = {onPress(2)} borderColor={active === 2 ? 'black':'#554C8F'}/>
      </View>
      <View>
        {/* <Text>{
          active === 0
          ? '您好，老师记得选择您的身份哦'
          : active === 1
          ? '您好，开始你的研学之旅吧'
          : '您好，尊敬的家长'
        }</Text> */}
      </View>
      <View style = {styled.inputWrapper}>
        <Input 
          style = {{
            marginTop: setSpText(10),
          }}
          value = { userName }
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
            value = { password }
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
            onPress={() => Alert.alert('Simple Button pressed')}
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