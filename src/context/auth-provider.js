import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '@ant-design/react-native';
import { DevSettings } from 'react-native'
import { apiUrl } from '~/util/http'
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
  DevSettings.reload()
}
export const getUserInfo = (token) => {
  return fetch(apiUrl + '/api/research/person/findLoginPersonMsg',{
    headers: {
      Authorization: token ? token : ''
    }
  }).then(res => res.json())
  .then(res => {
    return res.data
  })
}
const handleUserInfo = (userInfo, userType ) => {
  setToken(userInfo.token)
  setUserType(userType)
  return [userInfo.token, userType]
}
export const login = ({ 
  username,
  password,
  userType,
  uuid,
  code,
}) => {
  // console.log({ 
  //   username: username,
  //   password: password,
  //   personRole: userType,
  //   uuid: uuid,
  //   code: code,
  // });
  
  return fetch(apiUrl + '/api/research/authPerson/app/login',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      personRole: userType,
      uuid: uuid,
      code: code,
    })
  }).then( async res => {
    let data = await res.json()
    if( data.status === 400 ){
      Toast.info(data.message,1)
    } else {
      console.log(data);
      return handleUserInfo(data, String(userType))
    }
    return null
  }).catch( err => {
    console.log(err);
  })
}