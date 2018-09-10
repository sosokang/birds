// pages/zhineng/zhineng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_img:'../../img/top_img.jpg',
    niao_list:'',
    wenzi:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  
  uploadimg: function (options) {
    var _this = this
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        //启动上传等待中...  
        // 上传图片
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          top_img: tempFilePaths[0],
          wenzi:2
        })
        // var img = _this.data.img
        wx.uploadFile({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=aiSearchBirdByimg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file_bird',
          formData: {
            'uid': wx.getStorageSync('uid'),
            'token':''
          },
          success: function (res) {
            console.log(res)
            var res = JSON.parse(res.data)
            if (res.data==''){
              _this.setData({
                wenzi:3
              })
            }else{
              _this.setData({
                wenzi:4,
                niao_list: res.data
              })
            }
          },
          complete: function () {
            // complete 

          }
        })
      }
    });
  },
  xuan_niao: function (e) {
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