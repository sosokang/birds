// pages/watch/watch.js
var time = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/travel/index.php?cmd=travelList',
      data: {
        uid: wx.getStorageSync('uid'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data.data)
        // console.log();
        var list = result.data.data
        for(var i=0;i<result.data.data.length;i++){
          list[i].head = 'http://bbs.photofans.cn/uc_server/avatar.php?uid=' + list[i].head
          list[i].dateStart=time.js_date_time(result.data.data[i].dateStart, 'Y/M/D')
          list[i].dateEnd = time.js_date_time(result.data.data[i].dateEnd, 'Y/M/D')
        }
        that.setData({
          travelList: list
        })
        // console.log(that.data.images)
      }
    }); 
  },
  watchs:function() {
    wx.navigateTo({
      url: '../watchs/watchs',
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
  
  }
})