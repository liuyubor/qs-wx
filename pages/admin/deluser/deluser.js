// pages/admin/deluser/deluser.js
const app = getApp();
Page({

    data: {
        userId: '',
    },

    onclick() {
        wx.request({
            url: `${app.globalData.baseUrl}user/deleteUser`,
            method: 'POST',
            data: {
                userId: this.data.userId
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