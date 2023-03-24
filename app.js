// app.js

App({
    onLaunch() {

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
                            console.log(response.data)
                            // 将openid存储在本地
                            wx.setStorageSync("openId", response.data.openId);
                            console.log("openId:=>" + response.data.openid)
                            // 获取用户信息并进行登录相关处理
                            wx.request({
                                url: `${this.globalData.baseUrl}user/login`,
                                // method: 'POST',
                                data: {
                                    openId: response.data.openid
                                },
                                success: res => {
                                    if (res.statusCode === 200) {
                                        console.log(res.data);
                                        wx.setStorageSync('username', res.data.username);
                                        wx.setStorageSync('nickname', res.data.nickname);
                                        wx.setStorageSync('avatarUrl', res.data.photo);
                                        wx.setStorageSync('tel', res.data.tel);
                                        wx.setStorageSync('isLogin', true);
                                        this.globalData.isLogin = true;
                                        this.globalData.userInfo = res.data;
                                    } else {
                                        wx.navigateTo({
                                            url: '/pages/user/register/register',
                                        })
                                        wx.showToast({
                                            title: '请先注册',
                                        })
                                    }
                                }
                            })
                        },
                        fail: function (error) {
                            wx.showToast({
                                title: '获取uuid失败',
                                icon: 'error'
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: '微信登录异常',
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
