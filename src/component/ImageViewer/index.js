import React, { Component, useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TouchableOpacity, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import defaultImg from '~/assets/img/default.jpg'
export default function ImagesViewer ({
  visible,
  setVisible,
  imgs = [],
}) {
  let imgFilter = imgs.map( img => {
    if( img === '' || !img){
      return {
        props: { source: defaultImg },
      }
    }else{
      return {
        url: img
      }
    }
  })
  return ( 
    <Modal visible = { visible }>
      <ImageViewer imageUrls = {imgFilter || []} onClick = {() => setVisible(false)}/>
    </Modal>
  )
}
const styled = StyleSheet.create({
  
})