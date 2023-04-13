// pages/admin/admin.js
Page({

    data: {

    },

    /**
     * <van-cell-group title="站点管理" inset>
  <van-cell title="查看所有站点" size="large" is-link bind:click="OnAllSites"/>
  <van-cell title="添加站点" size="large" is-link bind:click="OnAddSite"/>
  <van-cell title="修改站点" size="large" is-link bind:click="OnUpdateSite"/>
  <van-cell title="删除站点" size="large" border="{{ false }}" is-link bind:click="OnDelSite"/>
</van-cell-group>
<van-cell-group title="用户管理" inset>
  <van-cell title="查看所有用户" size="large" is-link bind:click="OnAllUsers"/>
  <van-cell title="修改用户信息" size="large" is-link bind:click="OnUpdateUser"/>
  <van-cell title="删除用户" size="large" border="{{ false }}" is-link bind:click="OnDelUser"/>
</van-cell-group>
<van-cell-group title="预约管理" inset>
  <van-cell title="查看所有预约" size="large" is-link bind:click="OnAllReserves"/>
  <van-cell title="修改预约" size="large" is-link bind:click="OnUpdateReserve"/>
  <van-cell title="删除预约" size="large" border="{{ false }}" is-link bind:click="OnDelReserve"/>
</van-cell-group>
     */
    OnAllSites: function () {
        wx.navigateTo({
            url: '../admin/allsites/allsites',
        })
    },
    OnAddSite: function () {
        wx.navigateTo({
            url: '../admin/addsite/addsite',
        })
    },
    OnUpdateSite: function () {
        wx.navigateTo({
            url: '../admin/updatesite/updatesite',
        })
    },
    OnDelSite: function () {
        wx.navigateTo({
            url: '../admin/delsite/delsite',
        })
    },
    OnAllUsers: function () {
        wx.navigateTo({
            url: '../admin/allusers/allusers',
        })
    },
    OnUpdateUser: function () {
        wx.navigateTo({
            url: '../admin/updateuser/updateuser',
        })
    },
    OnDelUser: function () {
        wx.navigateTo({
            url: '../admin/deluser/deluser',
        })
    },
    OnAllReserves: function () {
        wx.navigateTo({
            url: '../admin/allreserves/allreserves',
        })
    },
    OnUpdateReserve: function () {
        wx.navigateTo({
            url: '../admin/updatereserve/updatereserve',
        })
    },
    OnDelReserve: function () {
        wx.navigateTo({
            url: '../admin/delreserve/delreserve',
        })
    }

})