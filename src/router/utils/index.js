

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
// 跳转 发表动态界面
export const useToCreateDynamic = (navigator) => {
  navigator.navigate('CreateDynamic')
}
// 跳转 发表标签界面
export const useToCreateTag = (navigator, tags) => {
  navigator.navigate('CreateTag',{
    tags,
  })
}