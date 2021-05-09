import React, { Component, useEffect } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import { useCreateFootInfo } from '~/api/footServer'
import { useToQRResult } from '~/router/utils'

export default function ScanView () {
  const navigator = useNavigation()
  const courseId = useRoute()?.params.courseId
  const { insertInfo } = useCreateFootInfo()
  const onSuccess = e => {
    console.log(e.data);
    insertInfo(e.data, {
      courseId
    })
    .then( result => {
      if(result){
        navigator.dispatch(
          StackActions.replace('FootResult', {
            courseId: courseId,
            success: result,
          })
        );
      }
    })
    .catch( err => {
      navigator.dispatch(
        StackActions.replace('FootResult', {
          courseId: courseId,
          error: err,
        })
      );
    })
  }
  return ( 
    <View style = {{ flex: 1,}}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
    </View>
  )
}
const styled = StyleSheet.create({
  
})