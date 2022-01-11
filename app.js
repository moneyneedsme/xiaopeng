import api from './api/index';
import request from './utils/request';
App({
  async onLaunch () {
    const App = this
    App.request = request
    App.state = {
      userInfo: {}
    }
    wx.login({
      success (res) {
        if (res.code) {
          request({
            url: api.login,
            data: {
              code: res.code
            },
            method: 'POST',
          }).then(res => {
            App.state.userInfo = res?.data?.data || {}
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
});
