import { useEffect, useState } from 'react'
import { useHttp,apiUrl } from '~/util/http'
import { useAsync } from '~/util/useAsync'
export const useUserDetail = (id) => {
  const client = useHttp()
  const { run, isLoading, data: userInfo } = useAsync(null, 'data')
  useEffect(() => {
    run(
      client('/api/research/person/findPersonMsgById',{
        data:{
          id
        }
      })
    )
  },[])
  return {
    isLoading,
    userInfo,
  }
}
export const useUserQR = (id) => {
  const api = apiUrl + '/file/二维码/'
  const client = useHttp()
  const [ QrSrc, setQrSrc ] = useState('')
  useEffect(() => {
    console.log(id);
    client(`/api/research/tool/qrcode/createQrcode?userid=${id}`,{
      method: 'POST',
    }).then(res => {
      let source = res.data.split('/')
      setQrSrc(api + source[source.length - 1])
    })
  },[])
  return {
    QrSrc,
  }
}
export const updateUserInfo = (params) => {
  const client = useHttp()
  const updateInfo = async () => {
    let data = await client('/api/research/person/updateMsg',{
      method: 'POST',
      data:{
        ...params,
      }
    })
    if( data.status == 0 ){
      return true
    } else {
      Promise.reject(data)
    }
  }
  return {
    updateInfo,
  }
}
export const uploadUserAvatar = () => {
  
  const client = useHttp()
  const uploadAvatar = async (image) => {
    let bean = new FormData()
    bean.append('avatar', {
      uri: image.uri,
      type: 'multipart/form-data',
      name: 'image.png',
    })
    let data = await client('/api/users/updateAvatar',{
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundaryuFZ1FayMmuDgKcFz",
      },
      skipData: true,
      data:bean
    })
    return data
  }
  return {
    uploadAvatar,
  }
}
