// pages/index/success/success.js

const app = getApp();
Page({
    data: {
        siteTime: "",
        siteName: "",
        username: "",
        phone: "",
        status: ""
    },
    /**
     *  phone: "15581027312"
        siteId: "2"
        siteName: "紫金学院图书馆C"
        time: "17:00-18:00"
        userId: "o0urj5B04KM8Yw2Gme94keaAA5iU"
        username: "刘玉博"
     */
    onLoad: function (options) {
        // 从服务器查询预约数据
        wx.request({
            url: `${app.globalData.baseUrl}reserve/selectReserveByUserId`,
            method: 'POST',
            data: {
                userId: wx.getStorageSync('openId')
            },
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    this.setData({
                        siteTime: res.data.map.time,
                        siteName: res.data.map.site,
                        username: res.data.map.user,
                        phone: wx.getStorageSync('tel'),
                        status: res.data.map.status
                    });
                }
            }
        })
    },
    // 返回首页
    onClick: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    }

})