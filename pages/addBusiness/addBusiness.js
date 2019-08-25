// pages/addBusiness/addBusiness.js
const app = getApp()
const sun = require('../../utils/sun.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
     flag:false,
    //https: 'https://www.yingsu.shop/',
      httpsIcon: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
      httpsBanner: 'https://yingsuwenhua.oss-cn-shanghai.aliyuncs.com/',
     img:'',
     multiArray:[],
     multiname:'空',
     caseArray:[
         {type:1,name:'业务'},
         { type: 2, name: "案例" },
     ],
    caseName:'默认不显示',
    pid:0,
    type:1,
    caseInput:'',//分类名称
    sort:'50',//排序
    caseImg:'',
    caseBanner:'',//banner,
    isflag:false,

     cateList:"",//1级分类
     options:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        options: options
      })
        let that = this;
        //获取1级分类
      this.getCase(options.id)
            sun.request({
                url: "cate/lst",
                data: {
                    type: options.flag
                },
                success(res) {
                    let arry=res
                    arry.forEach((item,index)=>{
                        item.name = item.lv + '级分类' + item.name
                    })
                    that.setData({
                        multiArray: arry
                    })
                }
            })
    },
//获取1级分类
getCase(id){
      let that=this;
      sun.request({
        url: "cate/getInfo",
        data: {
         id: id
        },
        success(res) {
                that.setData({
                  caseInput: res.name ? res.name:'',
                  caseImg:res.icon ? res.icon:'',
                  caseBanner: res.banner ? res.banner:'',
                  sort: res.sort ? res.sort:""
              })
        }
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

    },//选泽父级分类
    bindPickerChange(e){
        let that=this;
        this.setData({
            multiname: this.data.multiArray[e.detail.value].name,
            pid: this.data.multiArray[e.detail.value].id,
        })
        that.setData({
            caseImg:  '',
            caseBanner: '',
        })
        if (this.data.pid != 0) {
            this.setData({
                flag: true
            })
        }
    },
    //选择是否显示成案例
    caseChange(e){
        this.setData({
            caseName: this.data.caseArray[e.detail.value].name,
            type: this.data.caseArray[e.detail.value].type
        })
       
    },
    //请输入分类名称
    caseInput(e){
        this.setData({
            caseInput: e.detail.value
        })
    },
    //排序
    caseSort(e) {
        this.setData({
            sort: e.detail.value
        })
    },
    //上传图片
    clickimg(){
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
                    },
                    success: function (res) {
                        // that.data.imgs.push(
                        //     { imgUrl: img, sort: that.data.sValue}
                        //     )
                        that.setData({
                          httpsIcon: 'https://www.yingsu.shop/',
                          caseImg: JSON.parse(res.data).data.imgUrl,
                           
                        })
                    }
                })
            }
        })
    },
    //上传banner图片
    caseBanner() {
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
                    },
                    success: function (res) {
                        that.setData({
                            httpsBanner: 'https://www.yingsu.shop/',
                            caseBanner: JSON.parse(res.data).data.imgUrl
                        })
                    }
                })
            }
        })
    },
    //确定提交
    butnTruepid(){
        let that = this;
        if (!that.data.caseInput) {
            wx.showToast({
                icon: "none",
                title: '分类名称不能为空',
            })
            return
        }
        sun.request({
            url: "Cate/add",
            data: {
                pid: that.data.pid,
                type: that.data.type,
                name: that.data.caseInput,
                sort: that.data.sort,
                icon: that.data.caseImg,
                banner: that.data.caseBanner,
              
            },
            success(res) {
                wx.showToast({
                    icon: "none",
                    title: '成功',
                })
                wx.switchTab({
                    url: '../home/home',
                })
            }
        })
    },
    //确定提交
    butnTrue(){
        let that = this;
        if (!that.data.caseInput){
            wx.showToast({
                icon:"none",
                title: '分类名称不能为空',
            })
            return
        }
        if (!that.data.caseImg){
            wx.showToast({
                icon: "none",
                title: '分类图标不能为空',
            })
            return
        }
        if (!that.data.caseBanner) {
            wx.showToast({
                icon: "none",
                title: '分类banner不能为空',
            })
            return
        }
        sun.request({
            url: "Cate/add",
            data: {
                pid:that.data.pid,//没有父级为0  有父级就是id
                type:that.data.type,
                name: that.data.caseInput,
                icon: that.data.caseImg,
                banner: that.data.caseBanner,
                sort: that.data.sort
            },
            success(res) {
              wx.showToast({
                icon: "none",
                title: '成功',
              })
              wx.switchTab({
                url: '../home/home',
              })

            }
        })
    },
    //保持编辑
    keepEditor(){
      console.log(this.data.options.id)
  
      let that=this
        sun.request({
          url: "Cate/edit",
          data: {
            pid: that.data.pid,
            id: that.data.options.id,
            // type: that.data.type,
            name: that.data.caseInput,
            icon: that.data.caseImg,
            banner: that.data.caseBanner,
            sort: that.data.sort
          },
          success(res) {
            wx.showToast({
              icon: "none",
              title: '成功',
            })
            wx.switchTab({
              url: '../home/home',
            })
          
          }
        })
    }
})