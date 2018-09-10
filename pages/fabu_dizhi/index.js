var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({
  data: {
    position:'',
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name: "" //选择的位置名称
  },
  oninput: function (e) {
    console.log(e.detail.value)
  },
  onconfirm:function(e){
    console.log()
    var str = e.detail.value
    wx.navigateBack()
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一级页面
    // 直接调用上一级页面Page对象，存储数据到上一级页面中
    prevPage.setData({
      'position': str,
    });
  },
  onLoad: function (a) {
    qqmapsdk = new QQMapWX({
      key: 'JE5BZ-PDLCD-HMH4X-HYXP6-EQEN3-PJFFB'
    });
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
      
      }
    });
    this.moveToLocation();   

  },
  //移动选点
  
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        //选择地点之后返回到原来页面
        // wx.navigateTo({
        //   url: "/pages/index/index?address=" + res.name
        // });
        wx.navigateBack()
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; // 当前页面
        var prevPage = pages[pages.length - 2]; // 上一级页面
        // 直接调用上一级页面Page对象，存储数据到上一级页面中
        prevPage.setData({
          'position': res,
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: "位置"
    });
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { }
});