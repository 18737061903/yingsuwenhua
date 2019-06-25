// pages/Detail/Detail.js
const sun = require('../../utils/sun.js')
const name = require('../../utils/name.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        https: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
        id:'',
      detailList:[],
        user: "",
        imgs:[],//图片
        page: 2,//下拉刷新
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id:options.id,
            user: wx.getStorageSync("res")
        })  

        //请求
        this.getDetail()

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

  
    },
   getDetail(page){
       let that = this
       sun.request({
           url: "articles/detail",
           showLoading: true,
           data: {
               id: that.data.id,
               page: page ? page:1,//页数
               row:3,//行数
           },
           success(res) {
               wx.hideLoading()
            if(page){
                if (res.imgs) {
                    let imgsList = that.data.imgs;
                    let imgs = imgsList.concat(res.imgs);
                    that.setData({
                        imgs: imgs
                    })
                }else{
                    wx.showToast({
                        icon: "none",
                        title: '已经到底啦！(`O′)',
                    })
                }
            }else{
                that.setData({
                    imgs: res.imgs
                })
            }
              
               that.setData({
                   detailList: res
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
           let page = this.data.page++
            //请求
            this.getDetail(page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //预览图片
    lookImg(e){
        let that = this;
        let url = this.data.https+e.target.dataset.url;
        // console.log(url)
        let imgs = this.data.imgs;
        let imgsUrl=[]
        imgs.forEach((item,index)=>{
           imgsUrl.push(item.url)
        })
        // console.log(imgs)
        let urls = imgsUrl.map(i => 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/' + i)
        // console.log(urls)
        wx.previewImage({
            current: url , // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },
    //删除图片
    deleterImg(e){
        let that = this;
        let id = e.target.dataset.id
            if (this.data.user.isAuth == 1) {
                wx.showModal({
                    title: '温馨提示',
                    content: '确定要删除该图片吗？',
                    success: function (res) {
                        if (res.confirm) {
                            sun.request({
                                url: 'files/del',
                                data: { id: id },
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
            } else {
                return
                wx.showToast({
                    icon: "none",
                    title: '您没有权限编辑',
                })
            }
     
     
    },
    //查看更多
    moreVideo(){
        wx.navigateTo({
            url: '../video/video?id='+this.data.id,
        })
    },
    //编辑详情
    editDetail(e){
        let that = this;
        
            if (this.data.user.isAuth == 1) {
                wx.showModal({
                    title: '温馨提示',
                    content: '确定要编辑该条信息吗？',
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '../editDetail/editDetail?id=' + e.target.dataset.id + '&cateid=' + e.target.dataset.cateid,
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
    biandtell() {
        wx.makePhoneCall({
            phoneNumber: '13651868673'
        })
    },
})