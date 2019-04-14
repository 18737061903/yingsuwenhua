// pages/addBusiness/addBusiness.js
const app = getApp()
const sun = require('../../utils/sun.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        multiArray:[],
        pid:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        sun.request({
            url: "cate/lst",
            data: {
                type: 2
            },
            success(res) {
                that.setData({
                    multiArray: res
                })
            }
        })
    },
    //选泽父级分类
    bindPickerChange(e) {
        let that = this;
        this.setData({
            multiname: this.data.multiArray[e.detail.value].name,
            pid: this.data.multiArray[e.detail.value].id
        })
        wx.navigateTo({
            url: '../addDetail/addDetail?id='+that.data.pid,
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

    }
})