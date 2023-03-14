// pages/user/user.js
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

    data: {
        isLogin: true,
        active: 2,
        avatarUrl: defaultAvatarUrl,
        username: '点击注册'
    },
    // tabbar处理函数
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        wx.switchTab({
            url: app.globalData.tabbar[event.detail],
        })
    },
    bindViewTap() {
        console.log("into bindViewTap");
        wx.navigateTo({
            url: '/pages/user/register/register',
        })
    },
    onLoad(options) {
        // 获取用户信息
        wx.request({
            url: `${app.globalData.baseUrl}user/loadUserInfo`,
            data: {
                token: wx.getStorageSync('token')
            },
            success(res) {
                console.log(res.data);
                wx.setStorage({
                    username: res.data.username,
                    tel: res.data.tel
                });
                this.setData({
                    avatarUrl: res.data.photo,
                    username: res.data.nickname
                })
            }
        })
    },

    onReachBottom() {

    },

})