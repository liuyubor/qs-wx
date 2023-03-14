// app.js

App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    // 将code发送给服务器，由服务器换取用户信息等
                    wx.request({
                        url: `${this.globalData.baseUrl}user/code2uuid`,
                        method: 'POST',
                        data: { code: res.code },
                        success: response => {
                            wx.setStorageSync("openid", response.data.openid);
                            // 获取用户信息并进行相关处理
                            wx.request({
                                url: `${this.globalData.baseUrl}user/wechatLogin`,
                                data: {
                                    code: response.data.openid
                                },
                                method: 'POST',
                                success: resp => {
                                    //userID、token、permissions、result
                                    if (resp.data.result === 'true') {
                                        wx.setStorageSync('token', resp.data.token);
                                        console.log("登录成功" + resp.data.token)
                                    } else {
                                        wx.switchTab({
                                            url: '/pages/user/user',
                                        })
                                        wx.showToast({
                                            title: '请登录',
                                            icon: 'none'
                                        })
                                    }
                                }
                            })
                        },
                        fail: function (error) {
                            wx.showToast({
                                title: '登录异常',
                                icon: 'error'
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: '登录异常',
                        icon: 'error'
                    })
                }
            }
        })
    },
    globalData: {
        baseUrl: "http://localhost:8080/qs/",
        userInfo: null,
        active: 0,
        tabbar: [
            "/pages/index/index",
            "/pages/notification/notification",
            "/pages/user/user",
        ]
    }
})
