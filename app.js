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
          console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
            // 将code发送给服务器，由服务器换取用户信息等
            wx.request({
              url: `${this.globalData.baseUrl}user/code2uuid`,
              method: 'POST',
              data: {code: res.code},
              success: (response) => {
                console.log(response);
                if(response.statusCode === 200) {
                  // 获取用户信息并进行相关处理
                  console.log(response.data.openid);
                  console.log(response.data.session_key);
                  wx.request({
                    // 如果用户有userID则登录
                    url: `${this.globalData.baseUrl}user/wechatLogin`,
                    data: {
                      code: response.data.openid
                    },
                    method: 'POST',
                    success: (response) => {
                      //userID、token、permissions、result
                      if(response.data.result === 'true') {
                        console.log("token",response.data.token)
                        wx.setStorageSync('token', response.data.token);
                      }
                    }
                  })
                }
              },
              fail: function(error) {
                console.log(error);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
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
