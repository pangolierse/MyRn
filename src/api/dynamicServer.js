import { useEffect } from 'react'
import { useHttp } from '~/util/http'
import { useAsync } from '~/util/useAsync'

export const dynamicInfo = (page, limit) => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync(null,'data')
  useEffect(() => {
    updateInfo()
  }, [])
  const updateInfo = (hPage, hLimit) => {
    run(
      client('/api/research/researchaction/findAllByLogin',{
        data: {
          page: hPage || page,
          size: hLimit || limit,
        }
      })
    )
  }
  return {
    content: data?.content,
    empty: data?.empty,
    isLoading,
    updateInfo,
  }
}
