import { useEffect } from 'react'
import { useHttp } from '~/util/http'
import { useAsync } from '~/util/useAsync'

export const dormitoryInfo = (studentId) => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync({},'data')
  useEffect(() => {
    updateInfo()
  }, [])
  const updateInfo = () => {
    run(
      client('/api/research/dormitory/findByStudentId',{
        data: {
          studentId,
        }
      })
    )
  }
  return {
    data,
    isLoading,
  }
}
