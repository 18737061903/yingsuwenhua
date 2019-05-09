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
        thumbnail:'?x-oss-process=image/resize,m_fill,h_100,w_132',
      banner:'',//右边大图
      text:[

      ],
      acindex:0,
    cateList:[],
        cateId: 0, //默认取第一个
        isTitle:false,
        articleList:[],
        user:"",
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
        if (app.globalData.id){
            this.setData({
                cateId: app.globalData.id
            })
            app.globalData.id=null
            this.data.text.forEach((item,index)=>{
                if(item.id==this.data.cateId){
                    this.setData({
                        acindex:index  
                    })
                }
            })
        }
        let that=this;
        //请求案例列表
        sun.request({
            url: "cate/lst",
            showLoading:true,
            data: {
                pid:0,
                type: 1
            },
            success(res) {
                getApp().globalData.cateId =res[0].id
             that.setData({
                 text:res,
                 banner: res[that.data.acindex].banner
             })
            }
        })
        that.rightData()
    },
    rightData(){
        let that=this
        //右边列表
        sun.request({
            url: "articles/lst",
            showLoading: true,
            data: {
                cateId: that.data.cateId,
                type:1,
                // page:1,////页码
                // row:6////行数
            },
            success(res) {
             
                if (res.articleList){
                    that.setData({
                        articleList: res.articleList
                    })
                }
                if (res.cateList){
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
    selcetCate(e){
        let that=this
        let index = e.target.dataset.index;
        this.setData({
            // articleList: [],//为空的情况下
            acindex:index,
            banner:this.data.text[index].banner,
            cateId: this.data.text[index].id
        })
        getApp().globalData.cateId = this.data.text[index].id
        that.rightData()
    },
    //二级分类赛选
    minCate(e){
        let that=this;
        let index = e.target.dataset.index;
        this.setData({
            cateId: this.data.cateList[index].id
        })
        that.rightData()
    },
    //长按添加
    longTap(e){
       
            if (this.data.user.isAuth == 1) {
                wx.showModal({
                    title: '提示',
                    content: '确定要编辑该条信息吗？',
                    success(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '../chooseDeleter/chooseDeleter?id=' + e.target.dataset.id,
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
    //跳转详情
    binNivo(e){
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
       

     
    }
})