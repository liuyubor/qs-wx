// pages/admin/delsite/delsite.js
const app = getApp();
Page({

    data: {
        siteId: '',
    },

    onclick() {
        wx.request({
            url: `${app.globalData.baseUrl}site/deleteSite`,
            method: 'POST',
            data: {
                siteId: this.data.siteId
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