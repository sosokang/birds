// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:100,
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    },
    gu: 1,
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
      type: type,
      gu: dataId
    });
    this.getrankinfo(type);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 相册
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=photographyList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: that.data.type,
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          albumList: res.data.data.imgList,
          maxAid: res.data.data.maxAid,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getrankinfo: function (type) {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=photographyList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: type,
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          albumList: res.data.data.imgList,
          maxAid: res.data.data.maxAid,
        })
      }
    })
  },
  imageDetails: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    var aid = e.currentTarget.dataset.aid;
    var albumList = e.currentTarget.dataset.albumList;
    var birdName = e.currentTarget.dataset.niao;
    // console.log(JSON.stringify(item))
    wx.navigateTo({
      url: '../xiangqing/xiangqing?aid=' + aid,
    })
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
    var that = this;
    var minAid = that.data.maxAid;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=photographyList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: that.data.type,
        minAid: minAid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          albumList: that.data.albumList.concat(res.data.data.imgList),
          maxAid: res.data.data.maxAid,
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})