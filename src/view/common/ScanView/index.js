import React, { Component, useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNLocation from 'react-native-location';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import { useCreateFootInfo } from '~/api/footServer'
import { useToQRResult } from '~/router/utils'
import { MapView, Marker, Polyline, Polygon } from 'react-native-amap3d';
import { isVoid } from '~/util'
import { Toast } from '@ant-design/react-native';

export default function ScanView () {
  const navigator = useNavigation()
  const courseId = useRoute()?.params.courseId
  const longitudeProp = useRoute()?.params.longitude
  const latitudeProp = useRoute()?.params.latitude
  const [ locate, setLocate ] = useState(false)
  const [ longitude, setLongitude ] = useState(null)
  const [ latitude, setLatitude ] = useState(null)
  const { insertInfo } = useCreateFootInfo()
  let timer = null
  // RNLocation.configure({
  //   distanceFilter: 5.0
  // })
  // let locationSubscription = () => {}
  // useEffect(() => {
  //   if( isVoid(longitudeProp) && isVoid(latitudeProp) ){
  //     console.log('加载中');
  //     // timer = setTimeout(() => {
  //     //   navigator.goBack()
  //     //   Toast.info('定位超时请检查定位是否开启',2)
  //     // }, 5000);
  //     RNLocation.requestPermission({
  //       ios: 'whenInUse',
  //       android: {
  //         detail: "coarse",
  //         interval: 500,
  //         rationale: {
  //           title: "We need to access your location",
  //           message: "We use your location to show where you are on the map",
  //           buttonPositive: "OK",
  //           buttonNegative: "Cancel"
  //         }
  //       }
  //     }).then(granted => {
  //       locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
  //         setLongitude(locations && locations[0].longitude)
  //         setLatitude(locations && locations[0].latitude)
  //         console.log('加载完成');
  //         clearTimeout(timer)
  //         setLocate(true)
  //       })
  //     }).catch( err => {
  //       Toast.info(err || 'haha')
  //     })
  //   } else {
  //     setLongitude(longitudeProp)
  //     setLatitude(latitudeProp)
  //     setLocate(true)
  //   }
  //   return () => {
  //     locationSubscription && locationSubscription()
  //   }
  // },[])
  const handleLocation = ( nativeEvent ) => {
    if( isVoid(longitudeProp) && isVoid(latitudeProp) && !locate ){
      if(nativeEvent?.latitude > 0 && nativeEvent?.longitude > 0 ){
        setLongitude(nativeEvent?.longitude)
        setLatitude(nativeEvent?.latitude)
        console.log('加载完成');
        clearTimeout(timer)
        setLocate(true)
      }
    } else {
      setLongitude(longitudeProp)
      setLatitude(latitudeProp)
      setLocate(true)
    }
  }
  const onSuccess = e => {
    console.log(e.data);
    if( !isVoid(latitude) && !isVoid(longitude) ){
      insertInfo(e.data, {
        courseId,
        longitude,
        latitude,
      })
      .then( result => {
        if(result){
          navigator.dispatch(
            StackActions.replace('FootResult', {
              courseId: courseId,
              success: result,
              longitude,
              latitude,
            })
          );
        }
      })
      .catch( err => {
        navigator.dispatch(
          StackActions.replace('FootResult', {
            courseId: courseId,
            error: err,
            longitude,
            latitude,
          })
        );
      })
    } else {
      navigator.goBack()
      Toast.info('定位错误请检查定位是否开启',2)
    }
  }
  return ( 
    <View style = {{ flex: 1,}}>
      {
        !locate ? (
          <View style = {{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}> 
            <MapView 
              locationEnabled
              onLocation={handleLocation}
            />
            <Text style = {{
              fontSize: scaleSize(60),
              fontWeight: 'bold',
            }}>加载定位中....</Text>
          </View>
        ) : (
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
          />
        )
      }
    </View>
  )
}
const styled = StyleSheet.create({
  
})