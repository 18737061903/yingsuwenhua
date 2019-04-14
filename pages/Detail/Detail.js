// pages/Detail/Detail.js
const sun = require('../../utils/sun.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        https: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
      id:'',
      detailList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id:options.id
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
        //请求
        let that=this
        sun.request({
            url: "articles/detail",
            data: {
                id:that.data.id
            },
            success(res) {
                
                that.setData({
                    detailList:res
                })
            }
        })
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
    //删除图片
    deleterImg(e){
        let that = this;
        let id = e.target.dataset.id
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
    },
    //查看更多
    moreVideo(){
        wx.navigateTo({
            url: '../video/video?id='+this.data.id,
        })
    },
    //编辑详情
    editDetail(e){
        let that = this;
        wx.showModal({
            title: '温馨提示',
            content: '确定要编辑该条信息吗？',
            success: function (res) {
                if (res.confirm) {
                   wx.navigateTo({
                       url: '../editDetail/editDetail?id=' + e.target.dataset.id + '&cateid=' + e.target.dataset.cateid,
                   })
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })
    }
})