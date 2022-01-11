const App = getApp()
import api from '../../../api/index';
Component({
  data: {
    color: null,
    colorRgba: null,
    colorGradual1: null,
    colorGradual2: null,
    userInfo: null
  },
  lifetimes: {
    attached() {
      this.setData({
        color: App.state.config?.color,
        colorRgba: App.state.config?.colorRgba,
        colorGradual1: App.state.config?.colorGradual1,
        colorGradual2: App.state.config?.colorGradual2,
        userInfo: App.state.userInfo || {}
      })
    }
  },
  methods: {
    // 签到
    onSignIn() {
      App.request({
        url: api.signIn,
        method: 'POST',
      }).then((res) => {
        this.setData({
          'userInfo.signed': true,
          'userInfo.point': res.data.data
        })
        App.state.userInfo.signed = true
      })
    },
    getUserProfile() {
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