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
    color: App.globalData.$config?.color,
  },
  onSwitch({ currentTarget: { dataset: { index } } }) {
    this.setData({
      tabIndex: index
    })
  }
})