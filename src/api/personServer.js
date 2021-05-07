import { useHttp } from '~/util/http'

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
