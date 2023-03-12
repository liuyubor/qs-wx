// pages/user/user.js
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

    data: {
        isLogin: true,
        active: 2,
        avatarUrl: defaultAvatarUrl,
        username: '注册登录'
    },
      // tabbar处理函数
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        wx.switchTab({
            url: app.globalData.tabbar[event.detail],
        })
    },
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad(options) {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    },

    onReachBottom() {

    },

})