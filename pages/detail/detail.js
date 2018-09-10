// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
  },
// 声音
  audio:function() {
    wx.navigateTo({
      url: '../audio/audio?csp_code=' + this.data.csp_code,
    })
  },
  // 视频
  video:function() {
    wx.navigateTo({
      url: '../vedio/vedio?csp_code=' + this.data.csp_code,
    })
  },
  diyufenbu:function() {
    wx.navigateTo({
      url: '../fenbu/fenbu?csp_code=' + this.data.csp_code,
    })
  },
  observe:function() {
    wx.navigateTo({
      url: '../observe/observe?csp_code=' + this.data.csp_code,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=birdDetail',
      data: {
        csp_code: options.csp_code
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data)
        // console.log(result.data.data.img)
        that.setData({
          imgList: result.data.data.img,
          name: result.data.data.name,
          pinyin: result.data.data.pinyin,
          name_latin: result.data.data.name_latin,
          song_num: result.data.data.song.length,
          video_num: result.data.data.video.length,
          obs_times: result.data.data.obs_times,
          dis_status: result.data.data.dis_status,
          bird_class: result.data.data.bird_class,
          alias: result.data.data.alias,
          protect_iucn: result.data.data.protect_iucn,
          protect_cites: result.data.data.protect_cites,
          protect_china: result.data.data.protect_china,
          describe: result.data.data.describe,
          hand_drawing_img: result.data.data.hand_drawing_img,
          color: result.data.data.color,
          song_describe: result.data.data.song_describe,
          habit: result.data.data.habit,
          bi_property: result.data.data.bi_property,
          po_ch_property: result.data.data.po_ch_property,
          dis_range: result.data.data.dis_range,
          dis_status: result.data.data.dis_status,
          dis_status_china: result.data.data.dis_status_china,
          csp_code: options.csp_code
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
  
  }
})