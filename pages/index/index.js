// index.js
const app = getApp()

Page({
    data: {
        active: 0,
        isAppointment: false,
        currentPage: 1,
        size: 10,
        hasMore: true,
        sites: []
    },
    // tabbar处理函数
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        wx.switchTab({
            url: app.globalData.tabbar[event.detail],
        })
    },
    loadMore() {
        wx.showLoading({
            title: '加载中...',
        });
        wx.request({
            url: `${app.globalData.baseUrl}site/searchSiteByPage`,
            method: 'POST',
            data: {
                currentPage: this.data.currentPage,
                size: 10,
            },
            success: (res) => {
                console.log(res);
                const sites = res.data.sites;
                if (sites.length < this.data.size) {
                    console.log(sites.length);
                    this.setData({
                        hasMore: false
                    });
                }
                this.setData({
                    sites: this.data.sites.concat(sites),
                    currentPage: this.data.currentPage + 1
                });
            },
            complete: () => {
                wx.hideLoading();
                console.log(this.data);
            }
        });
    },
    onLoad() {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        this.loadMore();
    },
    onReachBottom() {
        if (this.data.hasMore) {
            this.loadMore();
        }
    },

})
