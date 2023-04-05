// pages/index/confirm/confirm.js
Page({

    data: {
        time: "",
        siteId: "",
        siteName: "",
        siteDesc: "",
    },

    onLoad: function (options) { 
        this.setData({
            time: options.time,
            siteId: options.siteId,
            siteName: options.siteName,
            siteDesc: options.siteDesc,
        });
    }
})