// pages/mu/mu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1
  },
  sousuo_box1: function () {
    wx.navigateTo({
      url: '../findSearch/findSearch',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=searchSubject',
      method: "post",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data)
        for (var i = 0;i<result.data.data.length;i++){
          result.data.data[i].index_text = result.data.data[i].subject.slice(0,1)
        }
        that.setData({
          mulist: result.data.data,
        })
        // console.log(that.data.images)
      }
    })
  },
  mu_submit:function(e){
    var index = e.currentTarget.dataset.index;
    var mulist = this.data.mulist;
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=searchFamily',
      method: "post",
      data: { subject: mulist[index].subject},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data)
        for (var i = 0; i < result.data.data.length; i++) {
          result.data.data[i].index_text = result.data.data[i].family.slice(0, 1)
        }
        that.setData({
          kelist: result.data.data,
          page: 2
        })
        // console.log(that.data.images)
      }
    })
  },
  ke_submit: function (e) {
    var index = e.currentTarget.dataset.index;
    var kelist = this.data.kelist;
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=searchGenus',
      method: "post",
      data: { family: kelist[index].family },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data)
        for (var i = 0; i < result.data.data.length; i++) {
          result.data.data[i].index_text = result.data.data[i].genus.slice(0, 1)
        }
        that.setData({
          shulist: result.data.data,
          page: 3
        })
        // console.log(that.data.images)
      }
    })
  },
  shu_submit: function (e) {
    var index = e.currentTarget.dataset.index;
    var shulist = this.data.shulist;
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=searchBird',
      method: "post",
      data: { genus: shulist[index].genus },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data)
        for (var i = 0; i < result.data.data.length; i++) {
          result.data.data[i].index_text = result.data.data[i].name.slice(0, 1)
        }
        that.setData({
          zhonglist: result.data.data,
          page: 4
        })
        // console.log(that.data.images)
      }
    })
  },
  xuan_niao:function(e){
    var csp_code = e.currentTarget.dataset.csp_code
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
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