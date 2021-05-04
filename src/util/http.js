import qs from 'qs'
import { useCallback } from 'react'
import { useAuth } from '~/context/useAuth'
const apiUrl = ''
export const http = (
  requestUrl, // 请求Url
  {
    data,
    token,
    ...customConfig,
  }
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? token : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  }
  if( config.method.toUpperCase() === 'GET') {
    requestUrl += `?${qs.stringify(data, { arrayFormat: "indices" })}`
  } else {
    config.body = JSON.stringify(data)
  }
  return fetch(`${apiUrl}/${requestUrl}`, config) 
}

export const useHttp = () => {
  const { token } = useAuth()
  return useCallback(( requestUrl, config) => 
    http(requestUrl, config), 
    [token]
  )
}