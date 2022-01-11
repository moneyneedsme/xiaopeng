import api from '../../api/index'
const App = getApp();
const _HOME = 'home'
const _MY = 'my'
const tabs = [
  {
    title: '首页',
    text: '首页',
    icon: '../../images/home.png',
    selectedIcon: '../../images/home1.png',
    key: _HOME
  },
  {
    title: '我的',
    text: '我的',
    icon: '../../images/my.png',
    selectedIcon: '../../images/my1.png',
    key: _MY
  }
]
Page({
  data: {
    _HOME,
    _MY,
    tabIndex: 0, // tab索引
    tabs,
    color: '',
  },
  async onLoad() {
    await this.getConfig()
    this.setData({
      color: App.state.config?.color,
    })
    this.setData({
      [`tabs[${this.data.tabIndex}].initialized`]: true
    })
  },
  getConfig() {
    return App.request({
      url: api.getConfig,
    }).then(res => {
      App.state.config = res.data.data.config
    })
  },
  onSwitch({ currentTarget: { dataset: { index } } }) {
    this.setData({
      tabIndex: index,
      [`tabs[${index}].initialized`]: true
    })
  }
})