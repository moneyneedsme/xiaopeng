let getStatusBarHeight
let getNavigationBarHeight
const App = getApp()
Component({
  lifetimes: {
    created() {
      this.measure()
      getStatusBarHeight.then(({ statusBarHeight }) => {
        this.setData({ statusBarHeight, })
      })
      getNavigationBarHeight.then((res) => {
        this.setData(res)
      })
    },
  },
  data: {
    color: App.globalData.$config?.color,
    fontColor: App.globalData.$config?.fontColor,
  },
  methods: {
    measure() {
      return Promise.all([
        getStatusBarHeight = getStatusBarHeight || new Promise((resolve) => {
          wx.getSystemInfo({
              success: resolve,
          })
      }),
        getNavigationBarHeight = getNavigationBarHeight || getStatusBarHeight.then(({ statusBarHeight, windowWidth }) => {
          return new Promise((resolve) => {
            let start = Date.now()
            function get() {
              let { left, top, height } = wx.getMenuButtonBoundingClientRect()  // 有时，特别企业微信中打开立即调用
              if (left || top) {
                resolve({
                  navigationBarHeight: (top - statusBarHeight) * 2 + height,
                  padding: windowWidth - left,
                })
              } else if (Date.now() - start < 10000) {  // 返回不正确
                setTimeout(get, 111)  // 过段时间再获取才行
              }
            }
            get()
           })
        }),
      ])
    },
  },
})
