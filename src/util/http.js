import qs from 'qs'
import { useCallback } from 'react'
import { useAuth } from '~/context/useAuth'
import { Toast } from '@ant-design/react-native';
import * as Auth from '~/context/auth-provider'
const apiUrla = 'http://3q8891y512.zicp.vip'
export const apiUrl = apiUrla
export const http = (
  requestUrl, // 请求Url
  {
    data,
    token,
    ...customConfig
  }
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? token : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig
  }
  if( config.method.toUpperCase() === 'GET') {
    requestUrl += `?${qs.stringify(data, { arrayFormat: "indices" })}` 
  } else {
    config.body = JSON.stringify(data)
  }
  console.log(config.body);
  return fetch(`${apiUrla}${requestUrl}`,config)
    .then( async res => {
      if( res.status === 401){
        Toast.info('身份已过期，请重新登录')
        await Auth.logout()
        return Promise.reject({ message: "请重新登录" });
      }
      let data = await res.json() 
      if( res.ok ){
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export const useHttp = () => {
  const { token } = useAuth()
  return useCallback(( requestUrl, config = {}) => 
    http(requestUrl, { token, ...config }), 
    [token]
  )
}