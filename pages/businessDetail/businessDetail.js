// pages/business/business.js
const app = getApp()
const sun = require('../../utils/sun.js')
const name = require('../../utils/name.js')
// var page=2[]
Page({
    /**
     * 页面的初始数据
     */
    data: {
        https: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
        thumbnail:'?x-oss-process=image/resize,m_fill,h_200,w_232',
      banner:'',//右边大图
      text:[

      ],
      acindex:0,
    cateList:[],
        cateListIndex:null,//二级选项active
        cateId: 0, //默认取第一个
        isTitle:false,
        articleList:[],
        user:"",
        page:2,//下拉刷新
        translateX:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            user: wx.getStorageSync("res")
        })

        //初次加载数据
        let that = this;
        that.rightData()
       
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
        //初始化请求页数
        // this.setData({
        //     page: 2,//下拉刷新
        // })

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
                console.log(res,"resD")
             that.setData({
                 text:res,
                 banner: res[that.data.acindex].banner
             })
                that.getlistIndex()
            }
        })  
   
    },
    //首页进入 关联选中列表
    getlistIndex(){
        let that = this;
        console.log(that.data.text)
        if (app.globalData.id) {
            this.setData({
                cateId: app.globalData.id
            })
            that.data.cateId = app.globalData.id
            this.data.text.forEach((item, index) => {
                if (item.id == this.data.cateId) {
                    this.setData({
                        acindex: index
                    })
                }
            })
            app.globalData.id = null
            //初次加载数据

            that.rightData()
        }
    },
    rightData(page){
        let that=this
        //右边列表
        sun.request({
            url: "articles/lst",
            showLoading: true,
            data: {
                cateId: that.data.cateId,
                type:1,
                page: page ? page:1,////页码
                row:8////行数
            },
            success(res) {
                wx.hideLoading()
              if (page){
                  if (res.articleList) {
                      let list = that.data.articleList
                      let arr = list.concat(res.articleList)
                      that.setData({
                          articleList: arr
                      })
                  } else {
                      wx.showToast({
                          icon: "none",
                          title: '已经到底啦！(`O′)',
                      })
                  }
              }else{
                  if (res.articleList) {
                    //   let list = that.data.articleList
                    //   let arr = list.concat(res.articleList)
                      that.setData({
                          articleList: res.articleList
                      })
                  } else {
                      wx.showToast({
                          icon: "none",
                          title: '已经到底啦！(`O′)',
                      })
                  }
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
        console.log('e')
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
     console.log('e')
    },
    //下拉触底
    pullTolower(){
       let page=this.data.page++
       this.rightData(page)
        console.log("s")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //一级选中分类
    selcetCate(e){
        let that=this
        let index = e.target.dataset.index;
        this.setData({
            articleList: [],//为空的情况下
            acindex:index,
            banner:this.data.text[index].banner,
            cateId: this.data.text[index].id,
            cateListIndex: null,
        })
        getApp().globalData.cateId = this.data.text[index].id
        that.rightData()
    },
    //二级分类赛选
    minCate(e){
        let that=this;
        let index = e.target.dataset.index;
        this.setData({
            articleList: [],//清空
            page:2,
            cateId: this.data.cateList[index].id,
            cateListIndex:index,
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
                return
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
        // console.log(e.target.dataset.index)
        console.log(this.data.articleList)
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
                                    let articleList = that.data.articleList
                                     articleList.splice(e.target.dataset.index,1)
                                    that.setData({
                                        articleList:articleList
                                    })
                                }
                            })
                        } else if (res.cancel) {
                            // console.log('用户点击取消')
                        }
                    }
                })
            } else {
                return
                wx.showToast({
                    icon: "none",
                    title: '您没有权限编辑',
                })
            }
       

     
    }
})