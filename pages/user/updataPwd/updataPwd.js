// pages/user/updataPwd/updataPwd.js
const app = getApp()

Page({

    data: {
        password:null,
    },
    onClick(){
        const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,32}$/;
        const passwordValid = passwordReg.test(this.data.password);
        if (!passwordValid) {
            wx.showToast({
                title: '密码必须包含数字和字母，且长度在6到32之间',
                icon: 'none'
            });
            return false;
        }
        wx.request({
          url: `${app.globalData.baseUrl}user/updataPassword`,
          method: 'POST',
          data:{
              password: this.data.password
          },
          success:(res) =>{
              if(res.statusCode === 200) {
                wx.showToast({
                    title: '修改成功',
                  })
                  wx.navigateBack()
              }else{
                wx.showToast({
                    title: '修改失败',
                    icon: 'error'
                  })
              }

          }
        })


    }
})