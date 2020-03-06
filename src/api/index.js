import axios from '@/axios'

const api = {
  // 注册
  memberRegister(params) {
    return axios.post('/user/register', params)
  },
  // 注册教练、修改教练信息
  coachRegister(params) {
    return axios.post('/coach/save', params)
  },
  // 登录
  memberLogin(params) {
    return axios.post('/user/login',params)
  },
  coachLogin(params) {
    return axios.post('/coach/login',params)
  },
  // 消息
  // 获取消息列表
  getMessage(params) {
    return axios.get('/message/query',params)
  },
  // 添加、修改消息资料
  saveMessage(params) {
    return axios.post('/message/save',params)
  },
  // 删除消息
  deleteMessage(params) {
    return axios.post('/message/del',params)
  },
  // 会员
  // 获取某会员信息
  getUserInfo(params) {
    return axios.get("/user/getUserInfo",params)
  },
  // 修改会员密码
  changeUserPassword(params) {
    return axios.post('/user/changePassword',params)
  },
  // 修改会员信息
  saveUserInfo(params) {
    return axios.post('/user/save',params)
  },
  // 获取课程列表,可根据教练名字或者课程名字搜索
  getAllCourseList(params) {
    return axios.get('/course/getAllCourseList',params)
  },
  // 获取自己报名的课程
  getMemberCourseList(params) {
    return axios.get('/course/getMemberCourseList',params)
  },
  // 报名接口 /apply/apply
  apply(params) {
    return axios.post('/apply/apply',params)
  },
  //
  //
  //
  // 教练
  // 获取某教练信息
  getCoachInfo(params) {
    return axios.get('/coach/get',params)
  },
  // 修改教练密码
  changeCoachPassword(params) {
    return axios.post('/coach/changePassword',params)
  },
  // 获取发布课程列表
  getCoachCourseList(params) {
    return axios.get('/course/getCoachCourseList',params)
  },
  // 增加、修改课程资料
  saveCourse(params) {
    return axios.post('/course/save',params);
  },
  // 删除课程
  deleteCourse(params) {
    return axios.post('/course/del',params)
  },
  // 获取课程评价
  getCourseEvaluate(params) {
    return axios.get('/course/getCourseEvaluate',params)
  },
  // 获取我的学员列表
  getTraineeList(params) {
    return axios.get('/coach/traineeList',params)
  }

}

export default api
