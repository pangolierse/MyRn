import { useEffect, useState } from 'react'
import { useHttp,apiUrl } from '~/util/http'
import { useAsync } from '~/util/useAsync'
export const useFootInfo = () => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync(null,'data')
  const refreshInfo = () => {
    run(
      client('/api/research/researchfoot/findResearchfootMsgByStudentId')
    )
  }
  useEffect(() => {
    refreshInfo()
  },[])
  return {
    footRecord: data,
    isLoading,
    refreshInfo,
  }
}
export const useCreateFootInfo = () => {
  const client = useHttp()
  const insertInfo = ( url, courseId ) => {
    return fetch(url)
    .then( res => res.json())
    .then( res => res?.data?.id )
    .then( async id => {
      let data = await client('/api/research/researchfoot/add', {
        method: 'POST',
        data: {
          pkStudentid: id,
          pkArrangeid: Number(courseId),
          latitude: 39.5111,
	        longitude: 40.65115,
        }
      })
      return data
    })
    .then( res => {
      if( res.status === 0 ){
        return true
      } else {
        return Promise.reject(res)
      }
    })
  }
  return {
    insertInfo,
  }
}