import { useEffect, useState } from 'react'
import { useHttp,apiUrl } from '~/util/http'
import { useAsync } from '~/util/useAsync'
import { useAuth } from '~/context/useAuth'
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
export const useUserQR = () => {
  const api = apiUrl + '/file/二维码/'
  const client = useHttp()
  const [ QrSrc, setQrSrc ] = useState('')
  useEffect(() => {
    client(`/api/research/person/findLoginPersonQrcode`)
    .then(res => {
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
export const useChangePlan = (reload) => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync(null,'data.content')
  const { run: init, data: planInitInfo } = useAsync(null,'data')
  const [ planList, setPlanList ] = useState([])
  useEffect(() => {
    getPlanList()
    initPlanInfo()
  },[])
  useEffect(() => {
    setPlanList(data?.map( plan => {
      return {
        label: plan.rpname,
        value: plan.pkRpid,
      }
    }))
  },[data])
  const initPlanInfo = () => {
    init(
      client('/api/research/researchplan/findLoginResearchplan')
    )
  }
  const getPlanList = () => {
    run(
      client('/api/research/researchplan/findAll')
    )
  }
  const updatePlan = (id) => {
    client(`/api/research/person/updateRpid?rpid=${id}`,{
      method: 'POST',
    }).then( res => {
      if( res.status === 0){
        reload && reload()
        initPlanInfo() 
      }
    })
  }
  return {
    planList,
    isLoading,
    planInitInfo,
    updatePlan,
  }
}
export const useGroup = () => {
  const client = useHttp() 
  const { run, data, isLoading } = useAsync({}, 'data')
  useEffect(() => {
    initInfo()
  }, [])
  const initInfo = () => {
    run(
      client('/api/research/group/findByStudentId')
    )
  }
  return {
    data,
    isLoading,
  }
}
export const useChangeAssociate = () => {
  const client = useHttp()
  const changeAssociate = async (username) => {
    let data = await client(`/api/research/person/updateAssociatedUserid?associatedUsername=${username}`,{
      method: 'POST',
    })
    if( data.status == 0 ){
      return true
    } else {
      Promise.reject(data)
    }
  }
  return {
    changeAssociate,
  }
}

export const useFindStudent = () => {
  const client = useHttp()
  const { data, run, isLoading } = useAsync([], 'data')
  const findStudent = (key) => {
    run(
      client(`/api/research/person/findAllStudentMsgByKey?key=${key}`)
    )
  }
  return {
    findStudent,
    data,
    isLoading,
  }
}