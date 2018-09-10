// pages/audio/audio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    play:1
  },
/**
 *播放暂停状态 
 */ 
  playtap: function(){
  this.setData({
    play:0,
  })
  // this.audioCtx.play()
},
  stoptap:function() {
    this.setData({
      play: 1,
    })
    // this.audioCtx.pause()
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
        console.log(result.data.data)
        that.setData({
          name: result.data.data.name,
          song: result.data.data.song
        })
        // console.log(result.data.data.img)

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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