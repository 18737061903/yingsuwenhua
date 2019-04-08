// pages/addDetail/addDetail.js
const sun = require('../../utils/sun.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        aa:'',
        https:'https://www.yingsu.shop/',
        title:"",//标题
        desc:"",//描述
        minDesc:"",//小描述
        money:'',//金额
        isIndex:[
            { name: '是', value: 1, checked: 'true'},
            { name: '否', value: 0},
        ],//是否显示为首页案例
        isType: [
            { name: '业务', value: 1, checked: 'true' },
            { name: '案例', value: 2 },
        ],
        type:"1",
        isInde:'1',
        cateId:"",//分类id
        imgs:[],
        img:[],
        videos:[],
        video:[],
        imgSort:'10',
        videoSort:'10',
    },
    radioChange(e) {
        this.setData({
            isInde: e.detail.value
        })
    },
    radioChangetype(e) {
        this.setData({
            type: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
          cateId:options.id
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
    // //选择照片
    chooseImg: function () {
        let that = this;
        let http = 'https://www.yingsu.shop/files/upload'
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: http, //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        sort: '1'
                    },
                    success: function (res) {
                        that.data.img.push(
                            { url: JSON.parse(res.data).data.imgUrl, sort: that.data.imgSort }
                        )
                        that.setData({
                            imgs: that.data.img
                        })
                    }
                })
            }
        })
    },
    // //选择视频
    chooseVideo: function () {
        let that = this;
        let http = 'https://www.yingsu.shop/files/upload'
        wx.chooseVideo({
            success: function (res) {
                console.log(res)
                var tempFilePaths = res.tempFilePath
                that.setData({
                    aa: res.thumbTempFilePath
                })
                wx.uploadFile({
                    url: http, //仅为示例，非真实的接口地址
                    filePath: tempFilePaths,
                    name: 'file',
                    formData: {
                        sort: '1'
                    },
                    success: function (res) {
                        that.data.video.push(
                            { url: JSON.parse(res.data).data.imgUrl, sort: that.data.videoSort}
                            )
                        that.setData({
                            videos: that.data.video
                        })
                    }
                })
            }
        })
    },
    //图片排序
    imgSort(e){
        this.setData({
           imgSort:e.detail.value
        })
    },
    //视频排序
    imgSort(e) {
        this.setData({
            videoSort: e.detail.value
        })
    },

    title(e) {
        this.setData({
            title: e.detail.value
        })
    },
   desc(e) {
        this.setData({
            desc: e.detail.value
        })
    },
    minDesc(e) {
        this.setData({
            minDesc: e.detail.value
        })
    },
    money(e) {
        this.setData({
            money: e.detail.value
        })
    },
    //确认提交
    butn(){
        sun.request({
            url: "articles/add",
            data: {
                cateId: this.data.cateId,
                title:this.data.title,
                desc:this.data.desc,
                minDesc:this.data.minDesc,
                money:this.data.money,
                isIndex:this.data.isInde,
                type:this.data.type,
                imgs:JSON.stringify(this.data.imgs),
                videos:JSON.stringify(this.data.videos)
            },
            success(res) {
                wx.showToast({
                    title: '提交成功',
                })
            }
        })
    }
})