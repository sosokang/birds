// pages/vedio/vedio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ''
  },
  // /**
  //      * 打开本地视频
  //      */
  // bindButtonTap: function () {
  //   var that = this
  //   //拍摄视频或从手机相册中选视频
  //   wx.chooseVideo({
  //     //album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
  //     sourceType: ['album', 'camera'],
  //     //拍摄视频最长拍摄时间，单位秒。最长支持60秒
  //     maxDuration: 60,
  //     //前置或者后置摄像头，默认为前后都有，即：['front', 'back']
  //     camera: ['front', 'back'],
  //     //接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
  //     success: function (res) {
  //       console.log(res.tempFilePaths[0])
  //       that.setData({
  //         src: res.tempFilePaths[0]
  //       })
  //     }
  //   })
  // },
  // /**
  //  * 当发生错误时触发error事件，event.detail = {errMsg: 'something wrong'}
  //  */
  // videoErrorCallback: function (e) {
  //   console.log('视频错误信息:')
  //   console.log(e.detail.errMsg)
  // },
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
        console.log(result.data.data.video)
        that.setData({
          video: result.data.data.video
        })
        // console.log(result.data.data.img)

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