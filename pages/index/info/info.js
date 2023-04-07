// pages/index/info/info.js
const app = getApp();

Page({
    data: {
        active: 0,
        siteId: "",
        siteName: "",
        siteDesc: "",
        timeList: null,
        stats: 0,
        count: 0,
        capacity: 0,
        status: "",
        dequecount: 0,
    },
    onLoad: function (options) {
        // 获取场地信息
        this.setData({
            siteId: options.id,
            siteName: options.name,
            siteDesc: options.desc,
        });
        // 获取预约剩余量
        wx.request({
            url: `${app.globalData.baseUrl}site/searchSiteInfoById`,
            method: 'POST',
            data: {
                id: options.id
            },
            success: res => {
                console.log(res.data);
                this.setData({
                    count: res.data.site.count,
                    capacity: res.data.site.capacity,
                    stats: res.data.site.count / res.data.site.capacity * 100,
                    status: res.data.site.status
                });

            }
        })
        // 获取排队人数
        // {"person_num":25,"log_id":1644180873944825103}
        wx.request({
            url: `${app.globalData.baseUrl}site/searchDequeueCountById`,
            method: 'POST',
            data: {
                id: options.id
            },
            success: res => {
                console.log(res.data.result);
                this.setData({
                    dequecount: res.data.result.person_num
                });
            }
        })
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