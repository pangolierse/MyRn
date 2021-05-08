import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TouchableWithoutFeedback, Image} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Picker, Provider, Toast } from '@ant-design/react-native';
import { setSpText, scaleSize} from '~/util/adapt'
import { useToRegister } from '~/router/utils'
import { useHttp } from '~/util/http'
import defaultImage from '~/assets/img/default.jpg'
import Parent from '~/assets/svg/Parent' 
import RobotCheck from '~/assets/svg/RobotCheck' 
import Student from '~/assets/svg/Student'
import Teacher from '~/assets/svg/Teacher'
import User from '~/assets/svg/User'
import Password from '~/assets/svg/Password'
import EyeOpen from '~/assets/svg/Eye_open'
import EyeClose from '~/assets/svg/Eye_close'
import Input from '~/component/Input'
import { useAuth } from '~/context/useAuth'
const teacherType = [[
  {
    label: '营地管理员',
    value: 0,
  },{
    label: '领队教师',
    value: 1,
  },{
    label: '课程教师',
    value: 2,
  },{
    label: '宿舍教师',
    value: 3,
  },
]]
const teacherTypeMap = {
  '0': '营地管理员',
  '1': '领队教师',
  '2': '课程教师',
  '3': '宿舍教师',
}
export default function LoginBtn () {
  const { login } = useAuth()
  const navigator = useNavigation()
  const [ activeType, setActiveType ] = useState(2)
  const [ code, setCode ] = useState('')
  const [ eyeOpen, setEveOpen ] = useState(false)
  const [ params, setParams ] = useState({
    userType: 2,
    username: 'wls',
    password: '123',
    uuid: '',
    code: '',
  })
  const client = useHttp()
  useEffect(() => {
    RobotCheckCode()
  },[])
  const RobotCheckCode = () => {
    client('/api/research/authPerson/code')
    .then( async (data) => {
      setCode(data?.img || '')
      setParams({
        ...params,
        uuid: data?.uuid || '',
      })
    })
    .catch( err => {
      Toast.info(err)      
    })
  }
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
      username: value,
    })
  }
  const handlePassword = (value) => {
    setParams({
      ...params,
      password: value,
    })
  }
  const handleCode = (value) => {
    setParams({
      ...params,
      code: value,
    })
  }
  // 表单提交
  const handleOnPress = (e) => {
    setEveOpen(!eyeOpen)
  }
  const handleLogin = () => {
    RobotCheckCode()
    login(params)
  }
  return (
    <>
      <Provider>
        <View style = {styled.titleWrapper}>
          <Text style = {styled.title}>
            登录
          </Text>
          <Text style = {{
            fontSize: scaleSize(32),
            fontWeight: 'bold',
            marginTop: setSpText(6)
          }}>
            您好，{ 
              activeType === 5
              ? '家长'
              : activeType === 4
              ? '学生'
              : '教师'
            }
          </Text>
        </View>
        <View style = {styled.btnWrapper}>
          <MyButton Svg = {<Parent color = {activeType === 5 ? 'black' : '#554C8F'}/>} onPress = {onPress(5)} borderColor={activeType === 5 ? 'black':'#554C8F'}/>
          <MyButton Svg = {<Student color = {activeType === 4 ? 'black' : '#554C8F'}/>} onPress = {onPress(4)} borderColor={activeType === 4 ? 'black':'#554C8F'}/>
          <MyButton Svg = {<Teacher color = {activeType <= 3 ? 'black' : '#554C8F'}/>} onPress = {onPress(3)} borderColor={activeType <= 3 ? 'black':'#554C8F'}/>
        </View>
        <View style = {styled.inputWrapper}>
          { activeType <= 3 && (
            <View style = {{
              height: setSpText(30),
            }}>
              <Picker
                data={teacherType}
                cols={1}
                value={activeType}
                onChange={([v]) => {
                  setParams({
                    ...params,
                    userType: v,
                  })
                  setActiveType(v)
                }}
                onOk={([v]) => {
                  setParams({
                    ...params,
                    userType: v,
                  })
                  setActiveType(v)
                }}
              >
                <CustomType value = {teacherTypeMap[activeType]}>教师身份</CustomType>
              </Picker>
            </View>
          )}
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
          <View style = {{
            marginTop: setSpText(10),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Input 
              style = {{
                flex: 1,
              }}
              value = { params.code }
              onChangeText = { handleCode }
              placeholder = {'请输入验证码'}
              Preffix = {<RobotCheck style = {{width:20}}/>}
            />
            <TouchableOpacity onPress = {() => RobotCheckCode()}>
              <Image style = { styled.code } source={code ? {uri: code} : defaultImage } resizeMode = 'contain'/>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: setSpText(15)}}>
            <Button
              color='#5692e1'
              title="登录"
              onPress={handleLogin}
            />
          </View>
          { activeType === 5 && (
            <View style={{marginTop: setSpText(10)}}>
              <Button
                color='#5692e1'
                title="注册"
                onPress={() => {
                  useToRegister(navigator)
                }}
              />
            </View>
          )}
        </View>
      </Provider>
    </>
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
    marginTop: setSpText(20),
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
  },
  code: {
    height: setSpText(30),
    width: setSpText(50),
    backgroundColor: 'white',
  }
})