// pages/myfans/myfans.js
var App = getApp();
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
    var that = this;
    if (options.taid==undefined){
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=fansList',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uid: wx.getStorageSync('uid')
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          that.setData({
            fans: res.data.data
          })
        }
      })
    }else{
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=fansList',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uid: wx.getStorageSync('uid'),
          taid: options.taid
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          that.setData({
            fans: res.data.data
          })
        }
      })
    }
    
  },
  // 关注
  guanzhu: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var fans = this.data.fans;
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=follow',
      data: {
        uid: wx.getStorageSync('uid'),
        fuid: authorid,
        token: '',
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        fans[index].isFollow = 1
        // console.log(result.data)
        that.setData({
          fans: fans
        })
        // console.log(that.data.images)
      }
    });
  },
  // 关注
  quxiaoguanzhu: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var fans = this.data.fans;
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=follow',
      data: {
        uid: wx.getStorageSync('uid'),
        fuid: authorid,
        token: '',
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        fans[index].isFollow = 0
        // console.log(result.data)
        that.setData({
          fans: fans
        })
        // console.log(that.data.images)
      }
    });
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