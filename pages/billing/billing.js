// pages/billing/billing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab 切换
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    },
    gu: 1,
    isYear:0,
    type:100
  },
  //tab切换
  tab: function (e) {
    var dataId = e.currentTarget.id;
    var type = e.currentTarget.dataset.type;
    // console.log(type)
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj,
      type:type,
      gu: dataId
    });
    this.getrankinfo(this.data.isYear, type);
  },
  other: function (e) {
    var authorid = e.currentTarget.dataset.authorid
    wx.navigateTo({
      url: '../other/other?authorid=' + authorid,
    })
  },
  switch1Change: function (e) {
    // console.log(e.detail.value)
      this.setData({
        isYear:1
      });
      this.getrankinfo(1, this.data.type);
  },
  switch1Change1: function (e) {
    // console.log(e.detail.value)
      this.setData({
        isYear:0
      });
      this.getrankinfo(0, this.data.type);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  getrankinfo:function(y,f){
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/ranking/index.php?cmd=ranking',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync('uid'),
        isYear: y,
        type: f
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data.data.user[0]);
        that.setData({
          title_first: res.data.data.title_first,
          title_second: res.data.data.title_second,
          user: res.data.data.user
        })
      }
    })
  },
  guanzhu: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var user = this.data.user;
    var that = this;
    if (wx.getStorageSync('islogin') == 0) {
      wx.showModal({
        title: '请先登录',
        icon: 'loading',
        duration: 2000,
        success: function () {
          wx.navigateTo({
            url: '../logs/logs',
          })
        }
      })
    } else {
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
          user[index].isFollow = 1
          // console.log(result.data)
          that.setData({
            user: user
          })
          // console.log(that.data.images)
        }
      });
    }
  },
  // 关注
  quxiaoguanzhu: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var user = this.data.user;
    var that = this;
    if (wx.getStorageSync('islogin') == 0) {
      wx.showModal({
        title: '请先登录',
        icon: 'loading',
        duration: 2000,
        success: function () {
          wx.navigateTo({
            url: '../logs/logs',
          })
        }
      })
    } else {
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
          user[index].isFollow = 0
          // console.log(result.data)
          that.setData({
            user: user
          })
        }
      });
    }
  },
  onLoad: function (options) {
    this.getrankinfo(this.data.isYear, this.data.type);
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