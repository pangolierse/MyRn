import { Picker } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { useChangePlan } from '~/api/personServer'
import { 
  useToEditUserInfo,
  useToClassListView, } from '~/router/utils'
import { useAuth } from '~/context/useAuth'
import InfomationSvg from '~/assets/svg/Infomation'
import ListSvg from '~/assets/svg/List'
export function ChoosePlan () {
  const { reload } = useAuth()
  const [ value, setValue ] = useState(0)
  const [ label, setLabel ] = useState('')
  const { planList, planInitInfo, updatePlan } = useChangePlan(reload)
  useEffect(() => {
    setLabel(planInitInfo?.rpname || 0)
    setValue(planInitInfo?.pkRpid || '')
  },[planInitInfo])
  return (
    <Picker
      data={planList || []}
      cols={1}
      value={value}
      onChange={([v]) => {
        updatePlan(v)
      }}
    >
      <CustomType value = {label}>当前研学计划</CustomType>
    </Picker>
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
          // borderRadius: setSpText(25),
          backgroundColor: 'transparent',
          // borderWidth: setSpText(0.1),
          // borderColor: '#333'
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

export function TeacherDormitorySetting (navigator) {
  return [
    {
      label: '-----   编辑个人资料',
      svg: <InfomationSvg size = {setSpText(16)}/>,
      onPress: () => useToEditUserInfo(navigator)
    },
  ]
}
export function TeacherSchoolSetting (navigator) {
  return [
    {
      label: '-----   编辑个人资料',
      svg: <InfomationSvg size = {setSpText(16)}/>,
      onPress: () => useToEditUserInfo(navigator)
    },
  ]
}
export function TeacherCourseSetting (navigator) {
  return [
    {
      label: '-----   编辑个人资料',
      svg: <InfomationSvg size = {setSpText(16)}/>,
      onPress: () => useToEditUserInfo(navigator)
    },{
      label: '-----   查看开课班级',
      svg: <ListSvg size = {setSpText(16)}/>,
      onPress: () => useToClassListView(navigator)
    },
  ]
}