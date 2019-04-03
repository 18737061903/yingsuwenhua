const app = getApp();
const http = "https://www.yingsu.shop/";
//接口请求
const request = (item) => {
    if (item.showLoading) {
        wx.showLoading({
            title: '正在加载中',
            mask: true
        })
    }
    let user = wx.getStorageSync("res");
    let header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (user) {
        header.token = user.token;
    }
    wx.request({
        url: http + item.url,
        data: item.data,
        header: header,
        method: 'POST',
        success: function (data) {
            wx.hideLoading();
            if (data.data.code == 0) {
                item.success(data.data.data);
            } else {
                if (!item.hideShow && data.data.msg.length > 0) {
                    showMsg(data.data.msg);
                }
                item.fail(data.data.code, data.data.msg);
            }
        },
        fail: function () {
            wx.hideLoading()
            wx.showToast({
                title: '网络连接错误，请检查网络状态',
                icon: 'none'
            });
        }
    })
}

// 提示框
const showMsg = (title) => {
    wx.showToast({
        title: title,
        icon: 'none',
        duration: 1500
    });
}
// loading
const showLoading = (title) => {
    wx.showLoading({
        title: title
    })
}
// hideLoading
const hideLoading = () => {
    wx.hideLoading();
}

//时间戳转换时间
function formatTimeTwo(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
module.exports = {
    request: request,
    showMsg: showMsg,
    showLoading: showLoading,
    hideLoading: hideLoading,
    formatTimeTwo,

}