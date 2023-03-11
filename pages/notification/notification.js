// pages/notification/notification.js
const app = getApp()

Page({

    data: {
        active: 1,
    },
      // tabbar处理函数
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        wx.switchTab({
            url: app.globalData.tabbar[event.detail],
        })
    },
    onLoad(options) {

    },
    onReachBottom() {

    },
})