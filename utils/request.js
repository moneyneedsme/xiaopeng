export default function request(config, type) {
  const App = getApp()
  if (typeof config === 'string') {
      config = {
          url: config,
      }
  }
  config.header = config.header || {}
  config.header['authorization'] = `Bearer ${App?.state.userInfo.token}`
  if (config.contentType) {
      config.header['Content-Type'] = config.contentType
  }
  if (type === 'form') {
      config.header['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  if (config.data) {
    let params = config.data
    Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined) {
            delete params[key];
        }
    })
  }
  if (config.loading) {
    wx.showLoading({
        mask: true,
        title: '正在请求...',
    })
  }
  return new Promise((success, fail) => {
    wx.request({
      // 发送请求
      success:(res) => {
        if (res.data.success) {
          success(res)
        } else {
          wx.showToast({
            title: res.data.errorMessage,
            icon: 'none'
          })
          fail(res.data.errorMessage)
        }
      },
      fail:(err) => {
        fail(err)
      },
      ...config,
    });
  });
}
