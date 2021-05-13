
// 公共界面  路由跳转 家长注册
export const useToRegister = (navigator) => {
  navigator.navigate('Register')
}
// 学生界面  路由跳转 课程详情
export const useToCourseDetail = (navigator, id, ocid) => {
  navigator.navigate('Course',{
    courseId: id,
    ocid: ocid,
  })
}
// 学生界面  路由跳转 课程成员详情
export const useToCourseMemberDetail = (navigator, id) => {
  navigator.navigate('CourseMember',{
    ocid: id,
  })
}
// 公共界面  跳转 用户界面
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
export const useToStudentDormitory = (navigator, dormitoryId) => {
  navigator.navigate('StudentDormitory', {
    dormitoryId,
  })
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
// 显示个人二维码
export const useToQR = ( navigator ) => {
  navigator.navigate('QRView')
}
// 学生研学成绩
export const useToStudentScore = ( navigator ) => {
  navigator.navigate('StudentScore')
}
// 学生小组界面
export const useToStudentGroup = ( navigator, id ) => {
  navigator.navigate('StudentGroup', {
    groupId: id,
  })
}
// 教师查看开课班级
export const useToClassListView = ( navigator ) => {
  navigator.navigate('ClassListView')
}
// 教师开课班级成员
export const useToClassScore = ( navigator, id ) => {
  navigator.navigate('ClassScore',{
    courseId: id,
  })
}
// 学生开课班级成绩
export const useToClassListScore = ( navigator ) => {
  navigator.navigate('ClassListScore')
}
// 领队教师开课班级成绩
export const useToTeacherClassListScore = ( navigator, studentId ) => {
  navigator.navigate('ClassListScore', {
    studentId: studentId,
  })
}

