// pages/business/business.js
const app = getApp()
const sun = require('../../utils/sun.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        https: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
      banner:'',//右边大图
      text:[

      ],
      acindex:0,
    cateList:[],
        cateId: 0, //默认取第一个
        isTitle:false,
        articleList:[],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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
                type:1
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
        console.log(e.target.dataset.id)
        wx.navigateTo({
            url: '../addDetail/addDetail?id='+e.target.dataset.id,
        })
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
    }
})