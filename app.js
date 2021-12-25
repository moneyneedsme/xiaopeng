import api from './api/login';
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
    wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          wx.request({
            url: api.login,
            data: {
              code: res.code
            },
            method: 'POST',
            success: () => {
              wx.getUserInfo({
                withCredentials: true,
                success: (res) => {
                  console.log(res)
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
  }
});
