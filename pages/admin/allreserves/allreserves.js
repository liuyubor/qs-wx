// pages/admin/allreserves/allreserves.js
const app = getApp()
Page({

    data: {
        loadBg: "network",
        size: 10,
        hasMore: true,
        reserves: [],
        currentPage: 1,

    },
    loadMore() {
        wx.showLoading({
            title: '加载中...',
        });
        wx.request({
            url: `${app.globalData.baseUrl}reserve/allreserves`,
            method: 'POST',
            data: {
                currentPage: this.data.currentPage,
                size: 10,
            },
            success: (res) => {
                console.log(res);
                if(res.statusCode === 200) {
                    const reserves = res.data.reserves;
                    if (reserves.length < this.data.size) {
                        this.setData({
                            hasMore: false
                        });
                    }
                    this.setData({
                        reserves: this.data.reserves.concat(reserves),
                        currentPage: this.data.currentPage + 1
                    });
                }

            },
            fail: (res) => {
                wx.showToast({
                  title: '加载失败！',
                  icon: "error"
                })
                this.setData({
                    loadBg: "error"
                })
            },
            complete: () => {
                wx.hideLoading();
            }
        });
    },
    onLoad() {
        this.loadMore();
    },
    onReachBottom() {
        if (this.data.hasMore) {
            this.loadMore();
        }
    },
})