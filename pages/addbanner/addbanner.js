// pages/addHome/addHome.js
const sun = require('../../utils/sun.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isEditImg:'null',
        https:'https://www.yingsu.shop/',
        imgs: [],
        img:[]
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

    bindPickerChange(e){
        this.setData({
            multiname: this.data.multiArray[e.detail.value].name,
            pid: this.data.multiArray[e.detail.value].id
        })
    },
    // //选择照片
    choose: function () {
        let that=this;
        let http = 'https://www.yingsu.shop/files/upload'
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url:http, //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',   
                    formData: {
                       sort:'1'
                    },
                    success: function (res) {
                        that.data.img.push({ url:JSON.parse(res.data).data.imgUrl})
                        // that.data.imgs.push(
                        //     { imgUrl: img, sort: that.data.sValue}
                        //     )
                        that.setData({
                            imgs:that.data.img
                        })
                    }
                })
            }
        })
    },
    //点击确定提交
    btntrue(e){
        console.log(this.data.imgs)
        let that = this;
        sun.request({
            url: "Index/addBanner",
            data: {
                banners:JSON.stringify(that.data.imgs)
            },
            success(res) {
                that.setData({
                    imgs:[]
                })
              wx.showToast({
                  title: '成功',
              })
            }
        })
    },
    //点击删除
    clickBnaer(e){
        let index = e.target.dataset.index;
        let dImgs=this.data.imgs;
        dImgs.splice(index,1)
        this.setData({
            imgs:dImgs
        })
    },
    //删除
    imgsDelete(e){
        let that=this;
        let index = e.target.dataset.index;
        let dImgs = this.data.imgs;
        let id=this.data.imgs[index].id
        sun.request({//删除首页banner
            url: "Index/delBanner ",
            data: {
             id:id
            },
            success(res) {
                dImgs.splice(index, 1)
                that.setData({
                    imgs: dImgs
                })
            wx.showToast({
                icon:"none",
                title: '删除成功',
            })

            }
        })
    },
    //delete
    delete(){
        this.setData({
            isEditImg:true,
            imgs:[],
            img: []
        })
        let that = this;
        sun.request({//首页banner
            url: "index/index",
            data: {

            },
            success(res) {
                if (res.bannerList) {
                    that.setData({
                        https: "https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/",
                        imgs: res.bannerList
                    })
                }

            }
        })
    },
    //add
    add(){
        this.setData({
            isEditImg: false,
            https: 'https://www.yingsu.shop/',
            imgs:[],
            img:[]
        })
    }
})