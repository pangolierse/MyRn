import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
const user = {
  id: 123,
  username: '123456',
  password: '123456',
}
const TOKEN_KEY = '@storage_token_key'
const USERTYPE_KEY = '@storage_usertype_key'
export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY)
}
const setToken = async (value) => {
  await AsyncStorage.setItem(TOKEN_KEY, value)
}
export const getUserType = async () => {
  return await AsyncStorage.getItem(USERTYPE_KEY)
}
const setUserType = async (value) => {
  await AsyncStorage.setItem(USERTYPE_KEY, value)
}
export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY)
  await AsyncStorage.removeItem(USERTYPE_KEY)
}
const handleUserInfo = (token, userType) => {
  setToken(token)
  setUserType(userType)
  return {
    test:1,
  }
}
/**
 * form : {
 *   username, password, userType,
 * }
 */
export const login = (form) => {
  return new Promise( resolve => {
    if( form.username === user.username){
      Alert.alert('登录成功')
      resolve(handleUserInfo('token', String(form.userType)))
    }else{
      Alert.alert('登录失败')
    }
  })
  // fetch('xxx',{
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     ...form,
  //   })
  // }).then( res => {
  //   return handleUserInfo({
  //     userType: 1,
  //     token: 'token',
  //   })
  // })
}