import { useEffect } from 'react'
import { useHttp, uploadImage, apiUrl } from '~/util/http'
import { useAsync } from '~/util/useAsync'

export const useDynamicInfo = () => {
  const client = useHttp()
  const { run, data, isLoading } = useAsync(null,'data')
  useEffect(() => {
    updateInfo(0, 10)
  }, [])
  const updateInfo = (Page, Limit) => {
    run(
      client('/api/research/researchaction/findAllByLoginRp',{
        data: {
          page: Page ,
          size: Limit ,
          sort: ["createTime,desc"]
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
export const usePublishDynamic = () => {
  const client = useHttp()
  const publishDynamic = async (params, images, token) => {
    return uploadImage(images,token).then( paths => {
      paths = paths?.map( path => {
        console.log(path);
        
        return { photoPath: apiUrl + "/file/图片/" + path.realName}
      })
      return paths
    }).then( async paths => {
      let data = await client('/api/research/researchaction/add',{
        method: 'POST',
        data:{
          ...params,
          researchactionPhotos: paths
        }
      })
      return data
    })
  }
  return {
    publishDynamic,
  }
}