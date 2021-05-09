
// 公共界面  路由跳转 家长注册
export const useToRegister = (navigator) => {
  navigator.navigate('Register')
}
// 学生界面  路由跳转 课程详情
export const useToCourseDetail = (navigator, id) => {
  navigator.navigate('Course',{
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
// 扫码
export const useToScanQR = (navigator, courseId) => {
  navigator.navigate('ScanView',{
    courseId,
  })
}
// 编辑个人信息
export const useToEditUserInfo = ( navigator ) => {
  navigator.navigate('EditUserInfo')
}
// 编辑个人信息
export const useToQR = ( navigator ) => {
  navigator.navigate('QRView')
}
// 学生小组界面
export const useToStudentGroup = ( navigator ) => {
  navigator.navigate('StudentGroup')
}