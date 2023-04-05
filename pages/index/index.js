// index.js
const app = getApp()

Page({
    data: {
        loadBg: "network",
        active: 0,
        isAppointment: false,
        currentPage: 1,
        size: 10,
        hasMore: true,
        sites: [],
        latitude: null,
        longitude: null,

    },
    onTap(e) {
        var id = e.currentTarget.dataset.id; // 获取当前项的id
        var name = e.currentTarget.dataset.name; // 获取当前项的name
        var desc = e.currentTarget.dataset.desc; // 获取当前项的desc
        wx.navigateTo({
            url: '/pages/index/info/info?id=' + id + '&name=' + name + '&desc=' + desc,
        })
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
                if(res.statusCode === 200) {
                    const sites = res.data.sites;
                    if (sites.length < this.data.size) {
                        this.setData({
                            hasMore: false
                        });
                    }
                    this.setData({
                        sites: this.data.sites.concat(sites),
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
        wx.getLocation({
            type: 'wgs84',
            success (res) {
              setData({
                latitude: res.latitude,
                longitude: res.longitude
              }) 
            }
           })
        this.loadMore();
    },
    onReachBottom() {
        if (this.data.hasMore) {
            this.loadMore();
        }
    },

})
