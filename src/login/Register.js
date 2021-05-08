import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TouchableWithoutFeedback, Alert} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Toast } from '@ant-design/react-native'
import { useNavigation } from "@react-navigation/core";
import { StackActions } from '@react-navigation/native';
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize, isVoid, isEmptyObject } from '~/util'
import { apiUrl } from '~/util/http'
import User from '~/assets/svg/User'
import Password from '~/assets/svg/Password'
import EyeOpen from '~/assets/svg/Eye_open'
import EyeClose from '~/assets/svg/Eye_close'
import Input from '~/component/Input'
import SimpleForm from '~/component/SimpleForm'
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
  const [ params, setParams ] = useState({
    associatedUsername: 'baiqi',
    username: 'jiazhang',
    password: '123',
    nickName: '陈先生',
    age: '32',
    email: '3020@qq.com',
    phone: '14456113254',
    gender: '男',
  })
  const [ step, setStep ] = useState(0)
  const ComponentMap = {
    "0": AccountAndPwd,
    "1": UserInfoEdit,
  }
  let RenderView = ComponentMap[step]
  return (
    <LinearGradient 
      colors={["#2BD9D9","#A4B1F5"]} 
      style={{
        flex: 1,
      }}
      start={{ x : 0.0, y : 1 }} 
      end={{ x : 1, y : 0 }}
    >
      <View style = {[styled.titleWrapper,{
        marginTop: step == 1 ? setSpText(20) : setSpText(40),
        marginBottom: step == 1 ? setSpText(0) : setSpText(40),
      }]}>
        <Text style = {styled.title}>
          注册
        </Text>
      </View>
      <RenderView 
        step = { step }
        setStep = { setStep }
        params = { params }
        setParams = { setParams }
      />
    </LinearGradient>
  )
}
function AccountAndPwd ({
  step,
  setStep,
  params,
  setParams,
}) {
  const history = useNavigation()
  const [ eyeOpen, setEveOpen ] = useState(false)
  // 处理input输入切换
  const handleUserName = (value) => {
    setParams({
      ...params,
      username: value.replace(/[\s]/g,''),
    })
  }
  const handlePassword = (value) => {
    setParams({
      ...params,
      password: value.replace(/[\s]/g,''),
    })
  }
  // 表单提交
  const handleOnPress = (e) => {
    setEveOpen(!eyeOpen)
  }
  const handleNext = () => {
    if( isVoid(params.username) ){
      Toast.info('账号不能为空',0.5)
    } else if( isVoid(params.password) ) {
      Toast.info('密码不能为空',0.5)
    } else {
      setStep(step + 1)
    }
  }
  const styled = StyleSheet.create({
    titleWrapper: {
      marginTop: setSpText(40),
      marginBottom: setSpText(40),
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
  })
  return (
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
          title="取消"
          onPress={() => history.goBack()}
        />
      </View>
      <View style={{marginTop: setSpText(10)}}>
        <Button
          color='#5692e1'
          title="下一步"
          onPress={handleNext}
        />
      </View>
    </View>
  )
}
function UserInfoEdit ({
  step,
  setStep,
  params,
  setParams,
}) {
  const navigator = useNavigation()
  const popAction = StackActions.pop(1);
  const formItems = [
    {
      label: '学生账号',
      dataIndex: 'associatedUsername',
      placeholder: '请输入学生账号',
      required: true,
      message: '账号不能为空',
    },{
      label: '昵称',
      dataIndex: 'nickName',
      placeholder: '请输入昵称',
      required: true,
      message: '昵称不能为空',
    },{
      label: '年龄',
      dataIndex: 'age',
      placeholder: '请输入年龄',
      required: true,
      message: '年龄不能为空',
      validator: (v) => {
        return Number(v.replace(/[^\d]/ig,'')) || ''
      }
    },{
      label: '邮箱',
      dataIndex: 'email',
      placeholder: '请输入邮箱',
      required: true,
      message: '邮箱不能为空',
    },{
      label: '性别',
      dataIndex: 'gender',
      placeholder: '请输入性别',
      type: 'radio',
      value: ['男','女'],
    },{
      label: '联系方式',
      dataIndex: 'phone',
      placeholder: '请输入性别',
      required: true,
      message: '联系方式不能为空',
      validator: (v) => {
        return Number(v.replace(/[^\d]/ig,'')) || ''
      }
    },
  ]
  const styled = StyleSheet.create({
    wrapper: {
      ...paddingSize(0,0,20,20)
    }
  })
  const handlePrev = () => {
    setStep(step - 1)
  }
  const handleRegister = () => {
    console.log(params);
    
    if(isEmptyObject(params)){
      Toast.info('有必填项未填',1)
    } else {
      fetch(apiUrl + `/api/research/person/regist?associatedUsername=${params.associatedUsername}`,{
        headers:{
          'Content-Type':'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          nickName: params.nickName,
          username: params.username,
          password: params.password,
          age: params.age,
          email: params.email,
          enabled: true,
          gender: params.gender,
          phone: params.phone,
          rrole: 5,
        })
      }).then(res => res.json())
      .then( res => {
        if( res.status === 0){
          navigator.dispatch(popAction);
        } else {
          Toast.info(res?.message || '',1)
        }
      })
    }
  }
  return (
    <View style = {styled.wrapper}>
      <SimpleForm 
        radioColor = 'white'
        formItems = { formItems }
        params = { params }
        setParams = { setParams }
      />
      <View style={{marginTop: setSpText(10)}}>
        <Button
          color='#5692e1'
          title="上一步"
          onPress={handlePrev}
        />
      </View>
      <View style={{marginTop: setSpText(10)}}>
        <Button
          color='#5692e1'
          title="注册"
          onPress={handleRegister}
        />
      </View>
    </View>
  )
}

const styled = StyleSheet.create({
  titleWrapper: {
    marginTop: setSpText(40),
    marginBottom: setSpText(40),
    alignItems: 'center',
  },
  title: {
    color: '#1b1d1d',
    fontSize: setSpText(30),
    fontWeight: 'bold',
  },
})