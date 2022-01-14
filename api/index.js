const base = 'http://127.0.1.2:8888'
export default {
  login: base + '/login', // 登录
  getConfig: base + '/getConfig', // 获取配置信息
  setInfo: base + '/setInfo', // 设置用户信息
  signIn: base + '/point/signIn', // 签到
  pointsDetails: base + '/point/details', // 积分详情
}