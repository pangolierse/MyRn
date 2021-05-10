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
// 教师查询开课班级信息
export const useClassListInfo = (studentId, userType) => {
  const client = useHttp()
  const { run, data: classList, isLoading } = useAsync([],'data')
  const refreshInfo = () => {
    run(
      client('/api/research/openingclass/findAllOpeningclassListMsgByLogin')
    )
  }
  const initGrade = (courseId) => {
    return client('/api/research/grade/findByOcidAndStudentid',{
      data: {
        ocid: courseId,
        studentid: studentId,
      }
    })
  }
  const teacherInitInfo = (studentId) => {
    run(
      client('/api/research/openingclass/findAllOpeningclassListMsgByStudentId',{
        data: {
          studentId: studentId,
        }
      })
    )
  }
  useEffect(() => {
    if(userType === '1'){
      teacherInitInfo(studentId)
    } else {
      refreshInfo()
    }
  },[])
  return {
    classList,
    initGrade,
    teacherInitInfo,
    isLoading,
  }
}

// 足迹查看成绩
export const useFootCourseScore = () => {
  const client = useHttp()
  const initGrade = (courseId, studentId) => {
    return client('/api/research/grade/findByOcidAndStudentid',{
      data: {
        ocid: courseId,
        studentid: studentId,
      }
    })
  }
  return {
    initGrade,
  }
}
// 教师查询开课班级成员信息
export const useClassMemberInfo = (courseId) => {
  const client = useHttp()
  const { run, data: members, isLoading } = useAsync([],'data')
  const refreshInfo = () => {
    run(
      client('/api/research/openingclass/findStudentsByOcid',{
        data: {
          ocId: courseId
        }
      })
    )
  }
  useEffect(() => {
    refreshInfo()
  },[])
  return {
    members,
    refreshInfo,
    isLoading,
  }
}
// 教师设置开课班级成员成绩
export const useClassMemberScore = (courseId,) => {
  const client = useHttp()
  const insertScore = (studentId, grade) => {
    return client('/api/research/grade/add',{
      method: 'POST',
      data: {
        pkStudentid: studentId,
        gradenum: grade,
        pkOcid: courseId,
        gradestatus: 1,
      }
    })
  }
  const changeScore = (studentId, gradeId, grade) => {
    return client('/api/research/grade/edit',{
      method: 'POST',
      data: {
        pkStudentid: studentId,
        gradenum: grade,
        pkOcid: courseId,
        gradestatus: 1,
        pkGradeid: gradeId,
      }
    })
  }
  return {
    insertScore,
    changeScore,
  }
}