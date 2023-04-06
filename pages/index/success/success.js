// pages/index/success/success.js

const app = getApp();
Page({

    
    data: {
        siteTime: "",
        siteName: "",
        username: "",
        phone: "",
    },
    onload: function (options) {
        console.log(options);
        this.setData({
            siteTime: options.time,
            siteName: options.siteName,
            username: options.username,
            phone: options.phone,
        });
    }

})