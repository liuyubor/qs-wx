// pages/admin/updatereserve/updatereserve.js
const app = getApp();
Page({

    data: {
        radio: '',
        timeSlots: [],
        reserveId: '',
        siteId: '',
        status: '',
    },

    onLoad(options) {
        wx.request({
            url: `${app.globalData.baseUrl}timeslot/getTimeSlots`,
            method: 'GET',
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    this.setData({
                        timeSlots: res.data.timeSlots
                    });
                }
            }
        });
    },
    onChange(event) {
        this.setData({
            radio: event.detail,
        });
    },
    onClick() {
        wx.request({
            url: `${app.globalData.baseUrl}reserve/updateReserve`,
            method: 'POST',
            data: {
                id: this.data.radio,
                siteId: this.data.siteId,
                status: this.data.status,
                timeId: this.data.radio
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