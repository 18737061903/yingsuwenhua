// pages/addDetail/addDetail.js
const sun = require('../../utils/sun.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        https: 'https://www.yingsu.shop/',
        title: "",//标题
        desc: "",//描述
        minDesc: "",//小描述
        money: '',//金额
        isIndex: [
            { name: '是', value: 1},
            { name: '否', value: 0 },
        ],//是否显示为首页案例
        isType: [
            { name: '业务', value: 1},
            { name: '案例', value: 2 },
        ],
        type: "",
        isInde: '',
        id: "",//分类id
        imgs: [],
        img: [],
        videos: [],
        video: [],
        imgSort: '10',
        videoSort: '10',
        cateId:''
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
        console.log(options)
        this.setData({
            id: options.id,
            cateId:options.cateid
        })  //请求详情
        let that = this
        sun.request({
            url: "articles/detail",
            data: {
                id: that.data.id
            },
            success(res) {
                let data=res
               that.setData({
                   title:data.title,
                   desc:data.desc,
                   minDesc: data.min_desc,
                   money:data.money,
                   type:data.type,
                   isInde:data.is_index
               })
               let indexMsg=that.data.isIndex
                indexMsg.forEach((item,index)=>{
                   if(item.value==that.data.isInde){
                       indexMsg[index].checked=true
                   }
               })
               let typeMsg=that.data.isType;
               typeMsg.forEach((item,index)=>{
                   if (item.value == that.data.type) {
                       typeMsg[index].checked = true
                   }
               })
               that.setData({
                   isIndex: indexMsg,
                   isType:typeMsg,
               })
            }
        })
        // sun.request({
        //     url: "articles/edit",
        //     data: {
        //         minDesc:""
        //     },
        //     success(res) {
              
        //     }
        // })

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
                            { url: JSON.parse(res.data).data.imgUrl, sort: that.data.videoSort }
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
    imgSort(e) {
        this.setData({
            imgSort: e.detail.value
        })
    },
    //视频排序
    videoSort(e) {
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
    butn() {
        sun.request({
            url: "articles/edit",
            data: {
                id: this.data.id,
                cateId: this.data.cateId,
                title: this.data.title,
                desc: this.data.desc,
                minDesc: this.data.minDesc,
                money: this.data.money,
                isIndex: this.data.isInde,
                type: this.data.type,
            },
            success(res) {
                wx.showToast({
                    title: '编辑文字信息提交成功',
                })
            }
        })
        this.addvideoANDEimg()
    },
    // 添加图片视频
    addvideoANDEimg(){
        sun.request({
            url: "Articles/addFile",
            data: {
                id: this.data.id,
                cateId: this.data.cateId,
                imgs: JSON.stringify(this.data.imgs),
                videos: JSON.stringify(this.data.videos)
            },
            success(res) {
                wx.showToast({
                    title: '图片视频提交成功',
                })
            }
        })
    }
    

})