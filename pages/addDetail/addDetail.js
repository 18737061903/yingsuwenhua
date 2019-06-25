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
    //多张图片上传
    uploadimg(data) {
        var that = this;
        var i = data.i ? data.i : 0;//当前上传的哪张图片
        var success = data.success ? data.success : 0;//上传成功的个数
        var fail = data.fail ? data.fail : 0;//上传失败的个数
        wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'file',//这里根据自己的实际情况改
            formData: {},//这里是上传图片时一起上传的数据
            success: (resp) => {
                if (JSON.parse(resp.data).msg == "成功"){
                    success++;//图片上传成功，图片上传成功的变量+1
                }
                that.data.img.push(
                            { url: JSON.parse(resp.data).data.imgUrl, sort: that.data.imgSort }
                        )
                        that.setData({
                            imgs: that.data.img
                        })
                console.log(that.data.img)
                // console.log(resp,"成功")
                // console.log(i);
                //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
            },
            fail: (res) => {
                // console.log(res,"失败")
                fail++;//图片上传失败，图片上传失败的变量+1
                // console.log('fail:' + i + "fail:" + fail);
            },
            complete: () => {
                i++;//这个图片执行完上传后，开始上传下一张
                if (i == data.path.length) {   //当图片传完时，停止调用          
                    console.log('执行完毕');
                    wx.showToast({
                        icon:'none',
                        title: '成功：' + success + " 失败：" + fail,
                    })
                    // console.log('成功：' + success + " 失败：" + fail);
                } else {//若图片还没有传完，则继续调用函数
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.uploadimg(data);
                }

            }
        });
    },
    // //选择照片
    chooseImg: function () {
        let that = this;
        let http = 'https://www.yingsu.shop/files/upload'
        wx.chooseImage({
            count:9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                that.uploadimg({
                    url:http,
                    path: tempFilePaths
                })
            }
        })
    },
    // //选择视频
    chooseVideo: function () {
        let that = this;
        let http = 'https://www.yingsu.shop/files/upload'
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            compressed:true,
            success: function (res) {
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
                console.log("提交成功ok")
                wx.navigateBack({
                    delta: 2,
                })
            }
        })
    }
})