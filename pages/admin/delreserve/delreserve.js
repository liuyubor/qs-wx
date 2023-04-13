// pages/admin/delreserve/delreserve.js
const app = getApp();
Page({

    data: {
        reserveId: '',
    },

    onclick() {
        wx.request({
            url: `${app.globalData.baseUrl}reserve/deleteReserve`,
            method: 'POST',
            data: {
                reserveId: this.data.reserveId
            },
            success: (res) => {
                console.log(res);
                if (res.statusCode === 200) {
                    if (res.data.rows === 1) {
                        wx.showToast({
                            title: '删除成功',
                        });
                    } else {
                        wx.showToast({
                            title: '删除失败',
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