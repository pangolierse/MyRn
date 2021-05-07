import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import { ActionSheet, Button } from '@ant-design/react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import AddSvg from '~/assets/svg/Add'
import { scaleSize, setSpText } from '~/util/adapt';
// 56
export default function ImagePicker ({
  width = 56,
  images,
  setImages,
}) {
  // 操作选择器
  const BUTTONS = [
    '选择图片',
    '拍摄照片',
    '取消',
  ];
  // 选择图片库中得图片
  const choosePic = () => {
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('用户取消了选择！');
      }
      else if (response.error) {
        Alert.alert("ImagePicker发生错误：" + response.error);
      } else {
        let source = { uri: response.uri };
        setImages([...images, source])
      }
    });
  }
  // 拍摄照片
  const ShootPic = () => {
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('用户取消了选择！');
      }
      else if (response.error) {
        Alert.alert("ImagePicker发生错误：" + response.error);
      } else {
        let source = { uri: response.uri };
        setImages([...images, source])
      }
    });
  }
  const handleBtn = [
    choosePic,
    ShootPic,
  ]
  // 活动器的逻辑
  const showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        handleBtn[buttonIndex] && handleBtn[buttonIndex]()
      }
    );
  };
  // 图片选择器参数设置
  const options = {
   cameraType: 'front',
   storageOptions: {
     skipBackup: true,
     path: 'images'
   }
 };
  return (
    <View style={styles.container}>
      { images.map( img => {
        return (
          <Image key={img.uri + 'image'} source={img} style={[ styles.image, {
            width: setSpText(width),
            height: setSpText(width)
          }]} />
          )
        })}
      <TouchableOpacity style = {[ styles.createImage,{
        width: setSpText(width),
        height: setSpText(width)
      }]} onPress={showActionSheet}>
        <AddSvg color = '#ddd' size = {setSpText(20)}/>
      </TouchableOpacity>
    </View>
  )
}
//样式定义
const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: setSpText(6),
  },
  image: {
    margin: setSpText(2),
    borderRadius: setSpText(8),
  },
  createImage:{
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#ddd',
    borderWidth: setSpText(0.1),
    borderRadius: setSpText(8),
    margin: setSpText(2),
    padding:setSpText(8),
 },
});