const App = getApp()
import api from '../../api/index'
Page({
  data: {
    viewRevive: 0,
    tabs: [
      {
        label: '全部积分',
        value: 0,
        list: [],
        loading: false,
        pageNo: 1,
        pageSize: 10,
        hasMore: false,
      },
      {
        label: '积分收入',
        value: 1,
        list: [],
        loading: false,
        pageNo: 1,
        pageSize: 10,
        hasMore: false,
      },
      {
        label: '积分支出',
        value: 2,
        list: [],
        loading: false,
        pageNo: 1,
        pageSize: 10,
        hasMore: false,
      }
    ],
  },
  onLoad () {
    const bgColor = App.state.config?.color
    this.setData({
      colorStyle: `--main-color:${bgColor}` 
    })
    wx.setNavigationBarColor({
      backgroundColor: bgColor,
      frontColor: '#ffffff'
    })
    this.getData()
  },
  onPullDownRefresh(e) {
    wx.stopPullDownRefresh()
  },
  onReachBottom(e) {
    const { viewRevive, tabs } = this.data
    if (tabs[viewRevive].hasMore) {
      this.setData({
        ['tabs['+ viewRevive +'].pageNo']: tabs[viewRevive].pageNo + 1,
      })
      this.getData()
    }

  },
  getData() {
    const { viewRevive, tabs } = this.data
    const params = {
      pageNo: tabs[viewRevive].pageNo,
      pageSize: tabs[viewRevive].pageSize,
      type: tabs[viewRevive].value
    }
    if (tabs[viewRevive].loading) {
      return
    }
    this.setData({
      ['tabs['+ viewRevive +'].loading']: true
    })
    App.request({
      url: api.pointsDetails,
      data: params
    }).then((res) => {
      const list = [...tabs[viewRevive].list, ...(res.data.data.list || [])]
      this.setData({
        ['tabs['+ viewRevive +'].list']: list,
        ['tabs['+ viewRevive +'].hasMore']: list.length < res.data.data?.total,
      })
    }).finally(() => {
      this.setData({
        ['tabs['+ viewRevive +'].loading']: false
      })
    })
  },
  switchTab(e) {
    const viewRevive = e.currentTarget.dataset.value;
    const { tabs } = this.data
    if (viewRevive === this.data.viewRevive) {
      return;
    }
    this.setData({
      viewRevive,
    });
    if (!tabs[viewRevive].list.length) {
      this.getData()
    }
  },
})