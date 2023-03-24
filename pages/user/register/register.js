// pages/user/register/register.js
const app = getApp()
var COS = require('cos-wx-sdk-v5');
var cos = new COS({
    getAuthorization: (options, callback) => {
        // 获取签名
        wx.request({
            url: `${app.globalData.baseUrl}user/upload`,
            success: (result) => {
                console.log(result)
                var data = result.data.data;
                var credentials = data && data.credentials;
                if (!data || !credentials) return console.error('credentials invalid');
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    XCosSecurityToken: credentials.sessionToken,
                    ExpiredTime: data.expiredTime,
                });
            }
        });
        console.log(callback);
    },

})
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
    data: {
        avatarUrl: defaultAvatarUrl,
        nickname: "",
        username: "",
        phone: "",
        cos: null
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail
        this.setData({
            avatarUrl,
        })
        cos.postObject({
            Bucket: "emos-1303819828",
            Region: "ap-nanjing",
            Key: 'avatar/' + wx.getStorageSync('openid') + '.jepg',
            FilePath: this.data.avatarUrl,
        }, function (err, res) {
            if (err) {
                console.log('上传出错', err);
            } else {
                console.log('上传成功', res);
                wx.setStorageSync('avatarUrl', res.headers.location)
            }
        })
    },
    onClick(e) {
        console.log("into click");
        const usernameReg = /^.{1,32}$/;
        const nicknameReg = /^.{1,32}$/;
        const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        const phoneValid = phoneReg.test(this.data.phone);
        this.setData({
            nickname: "ENOON"
        })
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
            url: `${app.globalData.baseUrl}user/register`,
            method: 'POST',
            data: {
                photo: wx.getStorageSync('avatarUrl'),
                openId: wx.getStorageSync('openid'),
                nickname: this.data.nickname,
                username: this.data.username,
                tel: this.data.phone
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data.rows === 1) {
                    wx.showToast({
                        title: '注册成功',
                    });
                    wx.setStorageSync('username', this.data.username);
                    wx.setStorageSync('nickname', this.data.nickname);
                    wx.setStorageSync('avatarUrl', this.data.photo);
                    wx.setStorageSync('tel', this.data.phone);
                    wx.setStorageSync('isLogin', true);
                    wx.navigateBack()
                } else {
                    wx.showToast({
                        title: '注册失败',
                        icon: 'error'
                    })
                }
            }
        });


    }
})
