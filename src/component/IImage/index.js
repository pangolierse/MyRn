import React, { Component, useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { isVoid } from '~/util'
import manImage from '~/assets/img/man.png'
import womanImage from '~/assets/img/woman.png'
import defaultImg from '~/assets/img/default.jpg'
import loadingJpg from '~/assets/img/loading.jpg'
export default function IImage ({
  src,
  style = {},
  gender = '男',
  onClick,
}) {
  const defaultImage = gender == '男' ? manImage : womanImage
  const [ loading, setLoading ] = useState(true)
  const handleLoad = () => {
    setLoading(false)
  }
  return ( 
    <TouchableOpacity onPress = {onClick} activeOpacity = { onClick ? 0.2 : 1}>
      <Image 
        style = {[ styled.image, style]} 
        source = { isVoid(src) ? defaultImage : {uri: src}} 
        onLoad = {handleLoad}
      />
      {(!isVoid(src) && loading) && <Image style = {[ styled.image,styled.imageMask, style ]} source = {loadingJpg}/>}
    </TouchableOpacity>
  )
}
const styled = StyleSheet.create({
  image: {
    width: setSpText(56),
    height: setSpText(56),
  },
  imageMask: {
    position: 'absolute',
    zIndex: 1,
  }
})