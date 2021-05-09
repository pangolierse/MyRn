import { useEffect } from 'react'
import { useHttp } from '~/util/http'
import { useAsync } from '~/util/useAsync'

export const dormitoryInfo = (dormitoryId) => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync({},'data')
  useEffect(() => {
    updateInfo()
  }, [])
  const updateInfo = () => {
    run(
      client(dormitoryId 
        ? `/api/research/dormitory/findById?dormitoryid=${dormitoryId}`
        : '/api/research/dormitory/findByStudentId')
    )
  }
  return {
    data,
    isLoading,
  }
}

export const useTeacherDormitoryInfo = () => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync([],'data')
  useEffect(() => {
    updateInfo()
  }, [])
  const updateInfo = () => {
    run(
      client('/api/research/dormitory/findAllDormitoryListMsgByLifetutorId')
    )
  }
  return {
    dormitorys: data,
    isLoading,
  }
}