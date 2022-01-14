import api from './api/index';
import request from './utils/request';
App({
  async onLaunch () {
    console.log('this,', this)
    const App = this
    App.request = request
    App.state = {
      userInfo: {}
    }
    App.getConfig = () => {
      return App.request({
        url: api.getConfig,
      }).then(res => {
        App.state.config = res.data.data.config
      })
    },
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
