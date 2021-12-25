const App = getApp()
Component({
  data: {
    color: App.globalData.$config?.color,
    colorRgba: App.globalData.$config?.colorRgba,
    colorGradual1: App.globalData.$config?.colorGradual1,
    colorGradual2: App.globalData.$config?.colorGradual2,
    user: {
      avatarUrl: '',
      name: ''
    }
  },
  methods: {
    getUserProfile(e) {
      console.log(e)
      wx.getUserProfile({
        desc: 'aaaaaa',
        success: (res) => {
          console.log(res)
          this.setData({
            'user.avatarUrl': res.userInfo.avatarUrl,
            'user.name': res.userInfo.nickName
          })
        }
      })
    },
  }
})