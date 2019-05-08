// pages/business/business.js
const app = getApp()
const sun = require('../../utils/sun.js')
const name = require('../../utils/name.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        https: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
        banner: '',//右边大图
        text: [

        ],
        acindex: 0,
        cateList: [],
        cateId: 0,//默认取第一个
        isTitle: false,
        articleList:[],
        user:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            user: wx.getStorageSync("res")
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
        let that = this;
        //请求案例列表
        sun.request({
            url: "cate/lst",
            showLoading: true,
            data: {
                pid: 0,
                type: 2
            },
            success(res) {
                that.setData({
                    text: res
                })
                if (res[that.data.acindex].banner) {
                    that.setData({
                        banner: res[that.data.acindex].banner
                    })
                }
            }
        })
        that.rightData()
    },
    rightData() {
        let that = this
        //右边列表
        sun.request({
            url: "articles/lst",
            showLoading: true,
            data: {
                cateId: that.data.cateId,
                type: 2
            },
            success(res) {
                if (res.articleList) {
                    that.setData({
                        articleList: res.articleList
                    })
                }
                if (res.cateList) {
                    that.setData({
                        cateList: res.cateList
                    })
                    if (res.cateList.length >= 2) {
                        that.setData({
                            isTitle: true
                        })
                    } else if (res.cateList.length <= 1) {
                        that.setData({
                            isTitle: false
                        })
                    }
                }

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
    //选中分类
    selcetCate(e) {
        let that = this
        let index = e.target.dataset.index;
        this.setData({
            acindex: index,
            banner: this.data.text[index].banner,
            cateId: this.data.text[index].id
        })
        that.rightData()
    },
    //二级分类赛选
    minCate(e) {
        let that = this;
        let index = e.target.dataset.index;
        this.setData({
            cateId: this.data.cateList[index].id
        })
        that.rightData()
    },
    //跳入详情页
    binDetail(e){
        wx.navigateTo({
            url: '../Detail/Detail?id='+e.target.dataset.id,
        })
    },
    //删除详情
    bindlongDtail(e) {
        let that = this;
       
            if (this.data.user.isAuth == 1) {
                wx.showModal({
                    title: '提示',
                    content: '确定要删除该条信息吗？',
                    success(res) {
                        if (res.confirm) {
                            sun.request({
                                url: "articles/del",
                                showLoading: true,
                                data: {
                                    id: e.target.dataset.id,
                                },
                                success: function (res) {
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
      

      
      },
       /// 长按删除分类
    longTap: function (e) {
        let that = this;
        let id = e.target.dataset.id
       
            if (this.data.user.isAuth == 1) {
                wx.showModal({
                    title: '温馨提示',
                    content: '确定要编辑该分类吗？',
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '../editClass/editClass?id=' + id + '&flag=' + 2,
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
      
       
    },
    //长按banner添加详情
    addDetail(){
        
            if (this.data.user.isAuth == 1) {
                wx: wx.navigateTo({
                    url: '../addCaseDetail/addCaseDetail',
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                })
            } else {
                wx.showToast({
                    icon: "none",
                    title: '您没有权限编辑',
                })
            }
       
  
    }
})