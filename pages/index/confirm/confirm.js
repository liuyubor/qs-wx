// pages/index/confirm/confirm.js
import Dialog from '@vant/weapp/dialog/dialog';
const app = getApp();

Page({

    data: {
        siteTime: "",
        siteId: "",
        siteName: "",
        siteDesc: "",
        username: "",
        userId: "",
        phone: "",
    },

    onLoad: function (options) {

        this.setData({
            siteTime: options.time,
            siteId: options.siteId,
            siteName: options.siteName,
            siteDesc: options.siteDesc,
            username: wx.getStorageSync('username'),
            phone: wx.getStorageSync('tel'),
            userId: wx.getStorageSync('openId')
        });

        console.log(this.data);
    },

    onClick: function () {
        // 显示Dialog
        Dialog.confirm({
            context: this,
            title: '请确认',
            message: '姓名：' + this.data.username + '\n' + '电话：' + this.data.phone + '\n' + '时间：' + this.data.siteTime + '\n' + '场地：' + this.data.siteName,
        })
            .then(() => {
                wx.request({
                    url: `${app.globalData.baseUrl}site/reserve`,
                    method: 'POST',
                    data: {
                        siteId: this.data.siteId,
                        username: this.data.username,
                        userId: this.data.userId,
                        tel: this.data.phone,
                        time: this.data.siteTime
                    },
                    success: (res) => {
                        console.log(res);
                        if (res.statusCode === 200 && res.data.rows === 1) {
                            wx.showToast({
                                title: '预约成功',
                            });
                            wx.navigateBack();
                        } else {
                            wx.showToast({
                                title: '预约失败',
                                icon: 'error'
                            })
                        }
                    }
                })

            })
            .catch(() => {
                // on cancel
            });




    }
})