import api from './api/login';
import request from './utils/request';
App({
  onLaunch () {
    this.globalData = {
      $config: {
        color: '#fff700',
        colorRgba: 'rgba(255, 247, 0, 0.5)',
        colorGradual1: '#78fbcb',
        colorGradual2: '#fff700',
        fontColor: '#ffffff'
      }
    };
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
            console.log(App.state.userInfo)
      console.log('22222222')

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
  }
});
