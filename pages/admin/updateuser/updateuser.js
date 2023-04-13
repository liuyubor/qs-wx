// pages/admin/updateuser/updateuser.js
const app = getApp();
Page({

    data: {
        userId: '',
        username: '',
        nickname: '',
        tel: '',
        role: '',
    },

    onClick() {
        wx.request({
            url: `${app.globalData.baseUrl}user/updateUser`,
            method: 'POST',
            data: {
                id: this.data.userId,
                username: this.data.username,
                nickname: this.data.nickname,
                tel: this.data.tel,
                role: this.data.role
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