import { useEffect, useState } from 'react'
import { useHttp,apiUrl } from '~/util/http'
import { useAsync } from '~/util/useAsync'
export const useFootInfo = (id) => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync(null,'data')
  const refreshInfo = () => {
    run(
      client('/api/research/researchfoot/findResearchfootMsgByStudentId',{
        data: {
          studentid: id
        }
      })
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