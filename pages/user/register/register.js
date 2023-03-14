// pages/user/register/register.js
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
    cos:null,
    data: {
        avatarUrl: defaultAvatarUrl,
        nickname: null,
        password: null,
        username: null,
        phone: null
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail
        this.setData({
            avatarUrl,
        })
    },
    onClick(e) {
        const usernameReg = /^.{1,32}$/;
        const nicknameReg = /^.{1,32}$/;
        const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,32}$/;
        const passwordValid = passwordReg.test(this.data.password);
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
        if (!passwordValid) {
            wx.showToast({
                title: '密码必须包含数字和字母，且长度在6到32之间',
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

        cos.postObject({
            Bucket: "emos-1303819828",
            Region: "ap-nanjing",
            Key: 'avatar/' + wx.getStorageSync('openid'),
            FilePath: avatarUrl,
            onProgress: function (info) {
                console.log(JSON.stringify(info));
            }
        }, (err, data) => {
            console.log(err || data);
            console.log(data.Location)
            if(data) {
                wx.request({
                    url: `${app.globalData.baseUrl}user/register`,
                    method: 'POST',
                    data: {
                        avatar: data.Location,
                        openid: wx.getStorageSync('openid'),
                        nickname: this.data.nickname,
                        password: this.data.password,
                        username: this.data.username,
                        tel: this.data.phone
                    },
                    success: (res) => {
                        console.log(res)
                        if (response.statusCode === 200 && res.data.rows === 1) {
                            console.log("注册成功")
                            Toast.success('注册成功');
                        }
                    }
        
                })
            }
            
        });

        
    },
    onLoad() {
        const cos = new app.cos({
            getAuthorization: (options, callback) => {
                // 异步获取签名
                wx.request({
                    url: `${app.globalData.baseUrl}user/upload`,
                    success: (result) => {
                        var data = result.data;
                        console.log(data);
                        callback({
                            TmpSecretId: data.credentials && data.credentials.tmpSecretId,
                            TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
                            XCosSecurityToken: data.credentials && data.credentials.sessionToken,
                            ExpiredTime: data.expiredTime,
                        });
                    }
                });
            },

        });
    }
})
