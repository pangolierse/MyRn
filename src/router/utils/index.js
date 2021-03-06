
// 公共界面  路由跳转 家长注册
export const useToRegister = (navigator) => {
  navigator.navigate('Register')
}
// 学生界面  路由跳转 课程详情
export const useToCourseDetail = (navigator, id) => {
  navigator.navigate('StudentCourse',{
    courseId: id,
  })
}
// 公共界面  跳转 教师阅览界面
export const useToUserDetail = (navigator, id) => {
  navigator.navigate('UserDetail',{
    userId: id,
  })
}
// 公共界面  跳转 发表动态界面
export const useToCreateDynamic = (navigator) => {
  navigator.navigate('CreateDynamic')
}
// 公共界面  跳转 发表标签界面
export const useToCreateTag = (navigator, tags) => {
  navigator.navigate('CreateTag',{
    tags,
  })
}
// 公共界面  跳转 发送信息界面
export const useToCreateMessage = (navigator) => {
  navigator.navigate('CreateMessage')
}
// 跳转 宿舍界面
export const useToStudentDormitory = (navigator) => {
  navigator.navigate('StudentDormitory')
}