// pages/contact/contact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.loadFontFace({
        //     family: 'FangSong',
        //     source: 'url("https://sungd.github.io/Pacifico.ttf")',
        //     success: console.log
        // })
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
    biandtell(){
        wx.makePhoneCall({
            phoneNumber: '021-66775677'         })
    },
    address(){
        wx.chooseLocation({
            success(){},
            })
    },
    //获取地址
    getaddress(){
      // latitude: 31.2494, longitude: 121.397
      wx.openLocation({
        latitude: 31.286896725575872, longitude: 121.36075117532782
      })
    }
})