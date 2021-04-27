

// 学生界面  路由跳转 课程详情
export const useToCourseDetail = (navigator, id) => {
  navigator.navigate('StudentCourse',{
    courseId: id,
  })
}
// 跳转 教师阅览界面
export const useToUserDetail = (navigator, id) => {
  navigator.navigate('UserDetail',{
    userId: id,
  })
}