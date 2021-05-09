import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native';
import { setSpText, scaleSize} from '~/util/adapt'
import { paddingSize } from '~/util'
import SuccessSvg from '~/assets/svg/Success'
import ErrorSvg from '~/assets/svg/Error'
import BackSvg from '~/assets/svg/Back'
import Color from '~/assets/style/Color'
import HeaderTitle from '~/component/HeaderTitle'
import FixTag from '~/component/FixTag'
export default function FootResult () {
  const navigator = useNavigation()
  const courseId = useRoute()?.params?.courseId
  const success = useRoute()?.params?.success
  const error = useRoute()?.params?.error
  const handleContinue = () => {
    navigator.dispatch(
      StackActions.replace('ScanView', {
        courseId: courseId,
      })
    );
  }
  return ( 
    <View style = { styled.wrapper }>
      <HeaderTitle 
        tinkColor = {'white'}
        backgroundColor = {'#108ee9'}
        title = '签到结果'
        prefix = {(
          <TouchableOpacity style = { styled.exitBtn } onPress = {() => navigator.goBack()}>
            <BackSvg size = { setSpText(12) } color = '#dbdbdb'/>
          </TouchableOpacity>
        )}
      />
      <View style = { styled.result }>
        { success && (
          <>
          <SuccessSvg size = {setSpText(80)}/>
          <Text style = { styled.success }> 签到成功 </Text>
          </>
        )}
        { error && (
          <>
          <ErrorSvg size = {setSpText(80)}/>
          <Text style = { styled.success }> 签到失败 </Text>
          <Text style = { styled.reason }> 理由：{error?.message || '未知'} </Text>
          </>
        )}
      </View>
      <View style = {styled.button}>
        <Button
          color='#5692e1'
          title="取消"
          onPress={() => navigator.goBack()}
        />
      </View>
      <View style = {styled.button}>
        <Button
          color='#5692e1'
          title="继续"
          onPress={handleContinue}
        />
      </View>
    </View>
  )
}
const styled = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  result: {
    height: setSpText(180),
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    fontSize: scaleSize(60),
    marginTop: setSpText(10),
    fontWeight: 'bold'
  },
  button: {
    ...paddingSize(0,0,30,30),
    marginTop: setSpText(10),
    borderRadius: setSpText(10),
    overflow:'hidden',
  },
  reason: {
    fontSize: scaleSize(36),
  }
})