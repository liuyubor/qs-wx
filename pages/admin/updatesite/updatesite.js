// pages/admin/updatesite/updatesite.js
const app = getApp();
Page({

    data: {
        siteId: '',
        name: '',
        desp: '',
        capacity: '',
        stats: '',
        result: [],
        timeSlots: [],
    },

    onChange(event) {
        this.setData({
            result: event.detail,
        })
    },
    onClickLoad() {
        wx.request({
            url: `${app.globalData.baseUrl}site/getTimeSlotById`,
            method: 'POST',
            data: {
                id: this.data.siteId
            },
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    this.setData({
                        timeSlots: res.data.timeSlot
                    });
                }
            }
        });
    },
    onClick() {
        wx.request({
            url: `${app.globalData.baseUrl}site/updateSite`,
            method: 'POST',
            data: {
                id: this.data.siteId,
                name: this.data.name,
                description: this.data.desp,
                capacity: this.data.capacity,
                status: this.data.stats,
                timeSlots: this.data.result
            },
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    if (res.data.rows === 1) {
                        wx.showToast({
                            title: '更新成功',
                        });
                    } else {
                        wx.showToast({
                            title: '更新失败',
                        });
                    }
                } else {
                    wx.showToast({
                        title: '提交失败',
                    });
                }
            }
        });
    }
})