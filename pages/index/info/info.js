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
    onLoad: function (options) {
        var siteId = options.id; // 获取传递的id值
        var siteName = options.name; // 获取传递的name值
        var siteDesc = options.desc; // 获取传递的name值
        var siteCount = options.count;
        var siteCap = options.capacity;
        var siteDays = options.days;
        // 显示传递的参数值
        this.setData({
            siteId: siteId,
            siteName: siteName,
            siteDesc: siteDesc,
            siteCount: siteCount,
            siteCap: siteCap,
            siteDays: siteDays
        });

        // 获取时间段信息
        wx.request({
            url: `${app.globalData.baseUrl}site/searchTimeById`,
            method: 'POST',
            data: {
                id: siteId
            },
            success: res => {
                console.log(res.data);
                this.setData({
                    timeList: res.data.list
                })
            }
        })
    }
})