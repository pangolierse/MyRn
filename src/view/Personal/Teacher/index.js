import { Picker } from '@ant-design/react-native';
import React, { useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useChangePlan } from '~/api/personServer'
export function ChoosePlan () {
  const [ value, setValue ] = useState(0)
  const [ label, setLabel ] = useState('')
  const { planList, planInitInfo, updatePlan } = useChangePlan()
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
const styled = StyleSheet.create({
  
})