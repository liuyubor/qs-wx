// pages/admin/addsite/addsite.js
const app = getApp();
Page({

    data: {
        name: '',
        desp: '',
        capacity: '',
        result: [],
        timeSolts: [],
    },
    onLoad(options) {
        wx.request({
            url: `${app.globalData.baseUrl}timeslot/getTimeSlots`,
            method: 'POST',
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    this.setData({
                        timeSolts: res.data.timeSlots
                    });
                }
            }
        });
    },

    onChange(event) {
        this.setData({
            result: event.detail,
        })
    },

    onClick() {
        wx.request({
            url: `${app.globalData.baseUrl}site/addSite`,
            method: 'POST',
            data: {
                name: this.data.name,
                description: this.data.desp,
                capacity: this.data.capacity,
                timeSlots: this.data.result
            },
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    if (res.data.rows === 1) {
                        wx.showToast({
                            title: '添加成功',
                        });
                    } else {
                        wx.showToast({
                            title: '添加失败',
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
});
