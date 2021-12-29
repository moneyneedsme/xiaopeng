const App = getApp()
import api from '../../../api/login';
Component({
  data: {
    color: App.globalData.$config?.color,
    colorRgba: App.globalData.$config?.colorRgba,
    colorGradual1: App.globalData.$config?.colorGradual1,
    colorGradual2: App.globalData.$config?.colorGradual2,
    userInfo: null
  },
  lifetimes: {
    attached() {
      if (this.data.userInfo) {
        return
      }
      this.setData({
        userInfo: App.state.userInfo || {}
      })
    }
  },
  methods: {
    getUserProfile(e) {
      console.log(App)
      wx.getUserProfile({
        desc: '获取基本信息,仅做展示',
        success: (res) => {
          const { nickName, gender, avatarUrl } = res.userInfo
          App.request({
            url: api.setInfo,
            data: {
              nickName,
              gender,
              avatarUrl
            },
            method: 'POST',
          })
          this.setData({ userInfo: res.userInfo })
        },
        fail: (err) => {
          console.log(err)
        }
      })
    },
  }
})