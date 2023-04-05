// pages/index/info/info.js
const app = getApp();

Page({
    data: {
        active: 0,
        siteId: "",
        siteName: "",
        siteDesc: "",
        timeList: null,
        stats: 69,
    },
    onLoad: function(options) {
        this.setData({
            siteId: options.id,
            siteName: options.name,
            siteDesc: options.desc,
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
    onTimeClick: function(e) {
        var time = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/pages/index/confirm/confirm?time=' + time + '&siteId=' + this.data.siteId + '&siteName=' + this.data.siteName + '&siteDesc=' + this.data.siteDesc,
        })
    }
})