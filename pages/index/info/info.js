// pages/index/info/info.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        siteId: "",
        siteName: "",
        siteDesc: "",
        siteCount: "",
        siteCap: "",
        siteDays: "",
        timeList: null,
        stats: 69,
    },
    onLoad: (options) => {
        this.setData({
            siteId: options.id,
            siteName: options.name,
            siteDesc: options.desc,
            siteCount: options.count,
            siteCap: options.capacity,
            siteDays: options.days
        });

        console.log(this.data);

        // 获取时间段信息
        wx.request({
            url: `${app.globalData.baseUrl}site/searchTimeById`,
            method: 'POST',
            data: {
                id: this.data.siteId
            },
            success: res => {
                console.log(res.data);
                this.setData({
                    timeList: res.data.list
                })
            }
        })
    },
    onTimeClick: (e) => {
        console.log(e);
    }
})