import React, { Component } from 'react'
import { setSpText, scaleSize} from '~/util/adapt'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { paddingSize, marginSize, isVoid } from '~/util'
export default function SimpleForm ({
  params,
  setParams,
  formItems,
}) {
  const TypeMap = {
    'text': TextInputLabel,
    'radio': RadioWrapper
  }
  return ( 
    formItems.map( (formItem, index) => {
      let ReactElement = TypeMap[formItem.type || 'text'] 
      return (
        <ReactElement
          {...formItem}
          params = { params }
          setParams = { setParams }
          key = {index + 'element'}
        />
      )
    })
  )
}
function RadioWrapper ({
  label = '单选框',
  dataIndex,
  params,
  setParams,
  value,
}) {
  
  const styles = StyleSheet.create({
    radioWrapper: {
      marginTop: setSpText(4),
      width: '100%',
      ...paddingSize(0,0,4,4),
      borderBottomWidth: setSpText(0.1),
      borderBottomColor: 'rgba(0,0,0,0.3)'
    },
    title: {
      fontSize: scaleSize(35),
      fontWeight: 'bold',
    },
    radio: {
      flexDirection: 'row',
      ...paddingSize(0,0,0,10),
      ...marginSize(4,4,0,0)
    },
    radioItem: {
      flex: 1,
      ...marginSize(0,0,4,4),
      ...paddingSize(4,4,4,4),
      borderWidth: setSpText(0.1),
      borderRadius: setSpText(4),
    },
    text: {
      textAlign:'center',
    }
  })
  const handlePress = (v) => {
    setParams({
      ...params,
      [dataIndex]: v,
    })
  }
  return (
    <View style = { styles.radioWrapper}>
      <Text style = { styles.title }>{label}</Text>
      <View style = { styles.radio }>
        { value.map( (i,index) => {
          return( 
            <TouchableOpacity 
              key = {index}
              style = {[ 
                styles.radioItem,
                {
                  backgroundColor: params[dataIndex] == i ? '#52ceeb' : 'transparent',
                  borderColor: params[dataIndex] == i ? 'transparent' : 'rgba(0,0,0,0.3)',
                } 
              ]} onPress = {() => handlePress(i)}
            >
              <Text style = { styles.text }>{i}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}
function TextInputLabel ({
  label,
  message = '输入错误',
  required = false,
  params,
  setParams,
  dataIndex,
  validator,
  ...props
}) {
  const styles = StyleSheet.create({
    labelItem: {
      marginTop: setSpText(4),
      width: '100%',
      ...paddingSize(0,0,4,4),
      borderBottomWidth: setSpText(0.1),
      borderBottomColor: 'rgba(0,0,0,0.3)'
    },
    title: {
      fontSize: scaleSize(35),
      fontWeight: 'bold',
    },
    titleWrapper: {
      flexDirection: 'row',
      alignItems:'center',
      width: '100%',
    },
    error: {
      marginLeft: setSpText(10),
      color: 'red',
    }
  })
  const changeText = (v) => { 
    setParams({
      ...params,
      [dataIndex]: validator ? validator(v) : v
    })
  }
  return (
    <View style = { styles.labelItem } >
      <View style = { styles.titleWrapper }>
        <Text style = { styles.title }>{label}</Text>
        { required && isVoid(params[dataIndex]) && (
          <Text style = { styles.error }>{message}</Text>
        )}
      </View>
      <TextInput 
        style = { styles.textInput } 
        value = {String(params[dataIndex])}
        onChangeText = {changeText}
        placeholder = '请输入'
        {...props}
      />
    </View>
  )
}