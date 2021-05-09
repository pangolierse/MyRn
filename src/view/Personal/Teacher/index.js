import { Picker } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { useChangePlan } from '~/api/personServer'
import { 
  useToEditUserInfo, } from '~/router/utils'
import { useAuth } from '~/context/useAuth'
import BottomButton from '../Comp/BottomButton'
import BottomButtonItem from '../Comp/BottomButton/Button'
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

export function TeacherBottom () {
  const navigator = useNavigation()
  const buttonList = [
    {
      label: '编辑个人信息',
      onPress: () => {
        useToEditUserInfo(navigator)
      }
    }
  ]
  return ( 
    
    <BottomButton>
      { buttonList.map( button => {
        return <BottomButtonItem key = { button.label + 'button'} label = { button.label } onPress = { button.onPress }/>
      })}
    </BottomButton>
  )
}
const styled = StyleSheet.create({
  
})