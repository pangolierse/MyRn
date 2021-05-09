import { useEffect, useState } from 'react'
import { useHttp,apiUrl } from '~/util/http'
import { useAsync } from '~/util/useAsync'
// 学生课节列表信息
export const useStudentCourse = () => {
  const client = useHttp()
  const { run, data: courseList, isLoading } = useAsync(null,'data')
  const refreshInfo = (week, day) => {
    run(
      client('/api/research/arrange/findAllArrangeListMsgByWeekDayLogin',{
        data:{
          dayid: day,
          weekid: week,
        }
      })
    )
  }
  useEffect(() => {
    refreshInfo(1,1)
  },[])
  return {
    courseList,
    isLoading,
    refreshInfo,
  }
}
// 学生课程信息查询
export const useCourseDetail = (id) => {
  const client = useHttp()
  const { run, data: courseInfo } = useAsync(null,'data')
  const { run: otherRun, data: carInfo, isLoading} = useAsync(null,'data')
  const refreshInfo = () => {
    run(
      client('/api/research/arrange/findArrangeMsgByArrangeId',{
        data:{
          arrangeId: id,
        }
      })
    )
    otherRun(
      client('/api/research/car/findTravelMsgByArrangeIdAndStudentId',{
        data:{
          arrangeId: id,
        }
      })
    )
  }
  useEffect(() => {
    refreshInfo()
  },[])
  return {
    courseInfo,
    carInfo,
    isLoading,
  }
}

