// pages/user/user.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    orderInfo: {},
    userListInfo: [{
      icon: '../../resources/images/course.png',
      url: '../order/order',
      text: '我的订单',
      isunread: true,
      unreadNum: 2
    },
    {
      icon: '../../resources/images/course.png',
      url: '../order/order',
      text: '我的课程',
      isunread: true,
      unreadNum: 1
    }, {
      icon: '../../resources/images/course.png',
      url: '../order/order',
      text: '收货地址管理'
    }, {
      icon: '../../resources/images/course.png',
      text: '联系客服'
    }, {
      icon: '../../resources/images/course.png',
      url: '../order/order',
      text: '常见问题'
    }],
    loadingText: '加载中...',
    loadingHidden: false,
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        loadingHidden: true
      })
    });

    // this.loadOrderStatus();
  },
  onShow: function () {
    // this.loadOrderStatus();
  },
  loadOrderStatus: function () {
    //获取用户订单数据
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/getorder',
      method: 'post',
      data: {
        userId: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var status = res.data.status;
        if (status == 1) {
          var orderInfo = res.data.orderInfo;
          that.setData({
            orderInfo: orderInfo
          });
        } else {
          wx.showToast({
            title: '非法操作.',
            duration: 2000
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: 'Smart App',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})