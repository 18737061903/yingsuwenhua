const sun = require('../../utils/sun.js')
// pages/welcome/welcome.js
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
        let page = this;
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success(res) {
                            page.parseUserInfo(res);
                        }
                    })
                }
            }
        })
    },
    //openid 换取用户信息
    login: function (openId) {
        wx.setStorageSync("openId", openId);
        sun.request({
            url: 'Login/loginUser',
            hideShow: true,
            data: {
                openId: openId
            },
            success: res => {
                wx.setStorageSync("res", res);
                console.log("登陆成功")
                wx.redirectTo({
                    url: "../home/home"
                })
            },
            fail: (code, msg) => {
                wx.redirectTo({
                    url: '../binding/binding',
                })
            }
        })
    },
    //1 先获取code 换取openid
    parseUserInfo(item) {
        console.log(item)
        sun.showLoading('正在加载中~');
        let page = this;
        wx.login({
            success: res => {
                console.log(res.code,"res.code");
                sun.request({
                    url: '/Login/loginCode',
                    data: {
                        code: res.code,
                        rawData: item.rawData,
                        signature: item.signature,
                        iv: item.iv,
                        encryptedData: item.encryptedData
                    },
                    success: (data) => {
                        console.log(data.openId,"openid");
                        page.login(data.openId);
                    },
                    fail: (code,msg) => {
                        console.log(code)
                     }
                });
            }
        })
    },
    //授权按钮
    getUserInfo: function (data) {
        //用户允许登陆
        if (data.detail.rawData) {
            this.parseUserInfo(data.detail);
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    // if (res.confirm) {
                    //   // console.log('用户点击了“返回授权”')
                    // }
                }
            })
        }
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