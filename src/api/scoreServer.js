import { useEffect, useState } from 'react'
import { useHttp,apiUrl } from '~/util/http'
import { useAsync } from '~/util/useAsync'
import { useAuth } from '~/context/useAuth'
export const useUserScore = (id) => {
  const client = useHttp()
  const { run, isLoading, data } = useAsync({}, 'data')
  useEffect(() => {
    run(
      client('/api/research/score/findByLogin',)
    )
  },[])
  return {
    isLoading,
    data,
  }
}
export const useEditUserScore = () => {
  const client = useHttp()
  const editScore = ({
    scoreMsg,
    teacherscores,
    coursescores,
    lifetutorscores
  }) => {
    return client('/api/research/score/edit',{
      method: 'POST',
      data: {
        score: scoreMsg,
        teacherscores: teacherscores?.map( score => {
          return {
            pkTsid: score.pk_tsid,
            tsnum: score.tsnum
          }
        }),
        coursescores: coursescores?.map ( score => {
          return {
            pkCsid: score.pk_csid,
            csnum: score.csnum,
          }
        }),
        lifetutorscores: lifetutorscores?.map( score => {
          return {
            lsnum: score.lsnum,
            pklsid: score.pk_lsid,
          }
        })
      }
    })
  }
  return {
    editScore
  }
}