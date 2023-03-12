// pages/index/info/info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        siteId: "",
        siteName: "",
        siteDesc: "",
        stats:69,
    },
    onLoad: function (options) {
        var siteId = options.id; // 获取传递的id值
        var siteName = options.name; // 获取传递的name值
        var siteDesc = options.desc; // 获取传递的name值
        // 显示传递的参数值
        this.setData({
            siteId: siteId,
            siteName: siteName,
            siteDesc: siteDesc
        });
    }
})