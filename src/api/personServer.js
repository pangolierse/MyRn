import { useHttp } from '~/util/http'

export const updateUserInfo = (params) => {
  const client = useHttp()
  const updateInfo = () => {
    client('/api/research/person/updateMsg',{
      method: 'POST',
      data:{
        ...params,
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  return {
    updateInfo,
  }
}
