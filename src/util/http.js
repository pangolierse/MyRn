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
    headers,
    skipData,
    ...customConfig
  }
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? token : "",
      "Content-Type": data ? "application/json" : "",
      ...headers,
    },
    ...customConfig
  }
  if( config.method.toUpperCase() === 'GET') {
    requestUrl += data ? `?${qs.stringify(data, { arrayFormat: 'repeat' })}` : ''
  } else if( !skipData ){
    config.body = JSON.stringify(data)
  } else {
    config.body = data
  }
  console.log(config);
  console.log(requestUrl);
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
        console.log(data);
        
        return Promise.reject(data?.message)
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

export function uploadImage (images,token) {
  const promiseArr = []
  for( let i = 0; i < images.length; i++){
    let bean = new FormData()
    bean.append('file ', {
      uri: images[i].uri,
      type: 'multipart/form-data',
      name: images[i].fileName,
    })
    promiseArr.push(
      fetch(apiUrla + '/api/localStorage/pictures',{
        method: 'POST',
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundaryuFZ1FayMmuDgKcFz",
        },
        body:bean
      })
    )
  }
  return Promise.all(promiseArr)
    .then( res => {
      return Promise.all(res.map(item => item.json()))
    })
    .catch( err => {
      console.log(err);
    })
}
