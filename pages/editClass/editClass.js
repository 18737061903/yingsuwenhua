// pages/editClass/editClass.js
const sun = require('../../utils/sun.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
    id:'',
    flag:'1'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
          this.setData({
              id:options.id,
              flag:options.flag
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
    deleter(){
        let that = this;
        wx.showModal({
            title: '温馨提示',
            content: '确定要删除该分类吗？',
            success: function (res) {
                if (res.confirm) {
                    sun.request({
                        url: 'Cate/del',
                        data: { id: that.data.id },
                        loading: true,
                        success: () => {
                            wx.showToast({
                                title: '删除成功',
                            })
                        }
                    })
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })
     
    },
    //编辑该分类
  editCategory(){
      // wx.navigateTo({
      //   url: '../addBusiness/addBusiness?flag=' + this.data.flag,
      // })
  },
    //添加分类
    addbunnei(){
        wx.navigateTo({
            url: `../addBusiness/addBusiness?flag=${this.data.flag}&&id=${this.data.id}`,
        })
    }
})