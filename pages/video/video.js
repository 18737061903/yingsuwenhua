// pages/video/video.js
const sun = require('../../utils/sun.js')
const name = require('../../utils/name.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        https: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
        videoList:[],
        user: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            user: wx.getStorageSync("res")
        })
        //请求
        let that = this
        sun.request({
            url: "articles/detailVideoList",
            data: {
                id: options.id
            },
            success(res) {
                that.setData({
                    videoList: res
                })
                console.log(that.data.videoList)
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //删除
    deleterVideo(e){
        let that = this;
        let id = e.target.dataset.id;
            
                if (this.data.user.isAuth == 1) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '确定要删除该条信息吗？',
                        success: function (res) {
                            if (res.confirm) {
                                sun.request({
                                    url: 'files/del',
                                    data: { id: id },
                                    loading: true,
                                    success: () => {
                                        wx.showToast({
                                            title: '删除成功',
                                        })
                                        that.onShow()
                                    }
                                })
                            } else if (res.cancel) {
                                // console.log('用户点击取消')
                            }
                        }
                    })
                } else {
                    wx.showToast({
                        icon: "none",
                        title: '您没有权限编辑',
                    })
                }
            
      
    }
})