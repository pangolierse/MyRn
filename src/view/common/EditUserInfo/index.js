import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Toast } from '@ant-design/react-native';
import { setSpText, scaleSize} from '~/util/adapt'
import { useAuth } from '~/context/useAuth'
import { updateUserInfo } from '~/api/personServer'
import BackSvg from '~/assets/svg/Back'
import HeaderTitle from '~/component/HeaderTitle'
import SimpleForm from '~/component/SimpleForm'
const strPlaceholder1 = '未知'
const strPlaceholder2 = '--'
export default function EditUserInfo () {
  const { user: userInfo, refreshInfo } = useAuth()
  const navigator = useNavigation()
  const [ params, setParams ] = useState({
    nickName: userInfo.nickName || '',
    age: userInfo.age || '',
    email: userInfo.email || '',
    phone: userInfo.phone || '',
    gender: userInfo.gender || '男',
  })
  const { updateInfo } = updateUserInfo(params)
  
  const formItems = [
    {
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
  const handleSubmit = () => {
    updateInfo().then( res => {
      if(res){
        navigator.goBack()
        refreshInfo()
        Toast.info('修改成功')
      }
    }).catch( err => {
      Toast.info(err, 1)
    })
  }
  return ( 
    <>
      <View style = { styled.container }>
        <HeaderTitle 
          tinkColor = {'white'}
          backgroundColor = {'#108ee9'}
          title = '编辑个人资料' 
          prefix = {(
            <TouchableOpacity style = {{ marginLeft: setSpText(8) }} onPress = { () => navigator.goBack() }>
              <BackSvg size = {setSpText(10)} color = 'white'/>
            </TouchableOpacity>
          )}
          suffix = {(
            <TouchableOpacity onPress = { handleSubmit }>
              <Text style = { styled.submit }>保存</Text>
            </TouchableOpacity>
          )}
        />
        <View style = { styled.UserDetailInfo }>
          <SimpleForm 
            formItems = { formItems }
            params = { params }
            setParams = { setParams }
          />
        </View>
      </View>
    </>
  )
}
const styled = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#108ee9',
  }, 
  exitBtn: {
    marginRight: setSpText(6),
  },
  submit: {
    fontSize: scaleSize(35),
    color: 'white',
  },
  UserDetailInfo: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: setSpText(6),
    paddingLeft: setSpText(6),
    paddingRight: setSpText(6),
  },
  userInfoItem: {
    width: '100%',
    borderBottomWidth: setSpText(0.1),
    borderBottomColor: '#afafaf',
    paddingBottom: setSpText(4),
  }
})