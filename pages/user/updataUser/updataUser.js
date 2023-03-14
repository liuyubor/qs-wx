// pages/user/updataUser/updataUser.js
const app = getApp()

Page({

    data: {
        nickname: null,
        username: null,
        phone: null,
    },
    onClick(e) {
        const usernameReg = /^.{1,32}$/;
        const nicknameReg = /^.{1,32}$/;
        const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        const phoneValid = phoneReg.test(this.data.phone);
        const nicknameValid = nicknameReg.test(this.data.nickname);
        const usernameValid = usernameReg.test(this.data.username);
        if (!usernameValid) {
            wx.showToast({
                title: '请输入长度在1~32个字符的用户名',
                icon: 'none'
            });
            return false;
        }
        if (!nicknameValid) {
            wx.showToast({
                title: '请输入长度在1~32个字符的昵称',
                icon: 'none'
            });
            return false;
        }
        if (!phoneValid) {
            wx.showToast({
                title: '请输入正确的11位手机号码',
                icon: 'none'
            });
            return false;
        }
        wx.request({
            url: `${app.globalData.baseUrl}user/updataPassword`,
            method: 'POST',
            data: {
                nickname: this.data.nickname,
                username: this.data.username,
                tel: this.data.phone
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    wx.showToast({
                        title: '修改成功',
                    })
                    wx.navigateBack()
                } else {
                    wx.showToast({
                        title: '修改失败',
                        icon: 'error'
                    })
                }
            }
        })
    }

})