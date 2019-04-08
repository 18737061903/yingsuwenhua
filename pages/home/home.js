
//index.js
//获取应用实例
const app = getApp()
const sun = require('../../utils/sun.js')
Page({
    data: {
        https: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
        bannerList:[
        ],
        currentSwiper: 0,
        cateList:[],
        caseList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    swiperChange: function (e) {
        this.setData({
            currentSwiper: e.detail.current
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
         //请求轮播以及分类
        sun.request({
            url: "index/index",
            data: {
                pid:0
            },
            success(res) {
                that.setData({
                    bannerList: res.bannerList,
                    cateList: res.cateList
                })
            }
        })
        //请求案例列表
        sun.request({
            url: "index/indexCase",
            data: {
                page:1,
                row:3
            },
            success(res) {
                that.setData({
                    caseList:res
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
    /// 长按删除分类
    longTap: function (e) {
        let that=this;
        let id = e.target.dataset.id
        wx.showModal({
            title: '温馨提示',
            content: '确定要删除该分类吗？',
            success: function (res) {
                if (res.confirm) {
                    sun.request({
                        url: 'Cate/del',
                        data: { id:id },
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

    // //选择照片
    // choose: function () {
    //     let that=this;
    //     let http = 'https://www.yingsu.shop/files/uploadImg'
    //     wx.chooseImage({
    //         success: function (res) {
    //             var tempFilePaths = res.tempFilePaths
    //             wx.uploadFile({
    //                 url:http, //仅为示例，非真实的接口地址
    //                 filePath: tempFilePaths[0],
    //                 name: 'file',   
    //                 formData: {
    //                    sort:'1'
    //                 },
    //                 success: function (res) {
    //                     let img = JSON.parse(res.data).data.imgUrl
    //                     that.data.imgs.push(
    //                         { imgUrl: img, sort: that.data.sValue}
    //                         )
    //                 }
    //             })
    //         }
    //     })
    // },
    // enterCateValue(e){
    //     this.setData({
    //         sValue: e.detail.value
    //     });
    //     console.log(this.data.sValue)
    // }
    // , btntrue(){
    //     let that = this;
    //     sun.request({//请求分类
    //         url: "Articles/add",
    //         data: {
    //             min_desc: this.data.desc,
    //             money: this.data.money,
    //             title: this.data.title,
    //             cateId: this.data.cateId,
    //             imgUrl: JSON.stringify(this.data.imgs)
    //         },
    //         success(res) {
    //         console.log(res)
    //         }
    //     })
    // }
})
