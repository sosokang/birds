// pages/observe/observe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagenum: 1,
    pagecounts:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      csp_code: options.csp_code
    })
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=birdLogList',
      data: {
        csp_code: options.csp_code
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log()
        that.setData({
          pagecounts: result.data.pagecounts,
          article_list: result.data.data
        })
        // console.log(result.data.data.img)
        
      }
    })
  },
  other: function (e) {
    var authorid = e.currentTarget.dataset.authorid
    wx.navigateTo({
      url: '../other/other?authorid=' + authorid,
    })
  },
  // 详情
  detail: function (e) {
    var tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../Journal/Journal?tid=' + tid,
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
    var article_list = this.data.article_list;
    var that = this
    if (that.data.pagenum < that.data.pagecounts) {
      var pagenum = that.data.pagenum + 1
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=birdLogList',
        data: {
          csp_code: that.data.csp_code,
          page: pagenum
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result)
          var article_list = result.data.data
          var article_list1 = that.data.article_list.concat(article_list)
          // console.log(article_list1)
          that.setData({
            article_list: article_list1,
            pagenum: pagenum
          })
          // console.log(that.data.images)
        }
      });
    } else {
      wx.showToast({
        title: '我是有底线的',
        icon: 'loading'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})