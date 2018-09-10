// pages/rules/rules.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:''
  },
  ruleCon: function () {
    wx.navigateTo({
      url: '../xing/xing',
    })
  },
  sousuo_box1: function () {
    wx.navigateTo({
      url: '../findSearch/findSearch',
    })
  },
  tupian: function () {
    wx.navigateTo({
      url: '../zhineng/zhineng',
    })
  },
  ruleCon1: function () {
    wx.navigateTo({
      url: '../mu/mu',
    })
  },
  detail: function (e) {
    var csp_code = e.currentTarget.dataset.csp_code
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
    })
  },
  onconfirm: function (e) {
    // console.log()
    var str = e.detail.value
    console.log(str)
  },
  onBindBlur: function (e) {
    // console.log()
    this.setData({
      keywords: e.detail.value
    })
  },
  search_bird: function (e) {
    // console.log()
    var keywords = this.data.keywords;
    if (keywords==''){
      wx.showModal({
        title: "请输入鸟名",
        icon: 'loading',
        duration: 2000,
        success: function () {

        }
      })
    }else{
      wx.navigateTo({
        url: '../niao_list/index?keywords=' + keywords,
      })
    }
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.editTabBar(this);//添加tabBar数据
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=commonBirds&page=1',

      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        that.setData({
          niao_list: result.data.data
        })
        // console.log(that.data.images)
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

  }
})