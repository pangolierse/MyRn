import React, { Component, useEffect, useState } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { isVoid } from '~/util'
import Loading from '~/component/Loading'
import defaultImg from '~/assets/img/default.jpg'
import defaultImg1 from '~/assets/img/default1.jpg'
export default function IImage ({
  src,
  style = {},
  onClick,
}) {
  const [ loading, setLoading ] = useState(true)
  const handleLoad = () => {
    setLoading(false)
  }
  return ( 
    <TouchableOpacity onPress = {onClick} activeOpacity = { onClick ? 0.2 : 1}>
      <Image 
        style = {[ styled.image, style]} 
        source = { isVoid(src) ? defaultImg : {uri: src}} 
        onLoad = {handleLoad}
      />
      {(!isVoid(src) && loading) && <Image style = {[ styled.image,styled.imageMask, style ]} source = {defaultImg1}/>}
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