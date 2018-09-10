// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagenum:1
  },
  titlezt: function () {
    if (this.data.titlezt == "flex") {
      this.setData({
        titlezt: "none",
        zhuanfapage: 0,
        arrowtop: ''
      })
    } else {
      this.setData({
        titlezt: "flex",
        zhuanfapage: 0,
        arrowtop: ''
      })
    }
  },
  zhuanfa: function (e) {
    this.setData({
      zhuanfapage: 3,
      arrowtop: 'arrowtop',
      datatid: e.currentTarget.dataset.tid
    })
    var that = this
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=articleDetail',
      data: {
        uid: wx.getStorageSync('uid'),
        aid: that.data.datatid,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data.data)
        var shareData = {
          title: result.data.data.title,
          path: 'pages/Journal1/Journal?aid=' + that.data.datatid + '&fanhui=1',
          imageUrl: result.data.data.coverImgUrl,
        }
        console.log(shareData)
        that.setData({
          shareData: shareData
        })
        // console.log(that.data.images)
      }
    })
  },
  yincang: function () {
    this.setData({
      zhuanfapage: 0,
      arrowtop: ''
    })
  },
  creathaibao: function () {
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/article_xcxhaibao.php',
      data: {
        aid: this.data.datatid,
        uid: wx.getStorageSync('uid')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data)
        var picurl = result.data.picurl;
        const downloadTask = wx.downloadFile({
          url: picurl,
          success: function (res) {
            // console.log(res)
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (res) {
                // console.log(res)
                wx.hideLoading()
                wx.showModal({
                  title: "海报已保存到手机相册",
                  content: "快去分享给朋友，叫伙伴们来围观吧",
                  icon: 'loading',
                  duration: 3000,
                  success: function () {

                  }
                })
              },
              fail: function (res) {
                if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                  // console.log("用户一开始拒绝了，我们想再次发起授权")
                  // console.log('打开设置窗口')
                  wx.openSetting({
                    success(settingdata) {
                      // console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        // console.log('获取权限成功，给出再次点击图片保存到相册的提示。')

                      } else {
                        // console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                        wx.showModal({
                          title: "保存照片失败",
                          content: "请允许保存照片",
                          icon: 'loading',
                          duration: 3000,
                          success: function () {

                          }
                        })
                      }
                    }
                  })
                  // console.log('fail')
                }
              }
            })


          },
          fail: function () {
            console.log('fail')
          }
        })
        downloadTask.onProgressUpdate((res) => {
          // console.log('下载进度', res.progress)
          // console.log('已经下载的数据长度', res.totalBytesWritten)
          // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
          if (res.progress < 100) {
            wx.showLoading({
              title: '请稍后',
            })
          } else {
            // console.log(res)
          }
        })
      }
    })
  },
  // 详情
  detail: function (e) {
    var index = e.currentTarget.dataset.index;
    var tid = e.currentTarget.dataset.tid;
    var article_status = e.currentTarget.dataset.article_status;
    wx.navigateTo({
      url: '../Journal1/Journal?aid=' + tid,
    })
  },
  comment: function (e) {
    var index = e.currentTarget.dataset.index;
    var tid = e.currentTarget.dataset.tid;
    var article_status = e.currentTarget.dataset.article_status;
    wx.navigateTo({
      url: '../Journal1/Journal?aid=' + tid,
    })
  },
  //  收藏
  collectArticle: function (options) {
    var that = this;
    var article_list = options.currentTarget.dataset.article_list;
    var index = options.currentTarget.dataset.index;
    if (article_list[index].isCollection ==1){
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=collectArticle',
        data: {
          uid: wx.getStorageSync('uid'),
          tid: options.currentTarget.dataset.tid,
          token: '',
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          article_list[index].isCollection = 0
          // console.log(result.data)
          that.setData({
            article_list: article_list
          })
          // console.log(that.data.images)
        }
      });
    }else{
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=collectArticle',
        data: {
          uid: wx.getStorageSync('uid'),
          tid: options.currentTarget.dataset.tid,
          token: '',
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          article_list[index].isCollection = 1
          // console.log(result.data)
          that.setData({
            article_list: article_list
          })
          // console.log(that.data.images)
        }
      });
    }
    
  },
  // 点赞
  upArticle: function (options) {
    var that = this;
    var article_list = options.currentTarget.dataset.article_list;
    var index = options.currentTarget.dataset.index;
    if (article_list[index].isUp ==1){
      wx.showModal({
        title: '已赞',
        content: '',
      })
    }else{
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=upArticle',
        data: {
          uid: wx.getStorageSync('uid'),
          tid: options.currentTarget.dataset.tid,
          token: '',
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          article_list[index].isUp = 1;
          article_list[index].upNum++;
        }
      })
    }
    
  },
  onReachBottom() {
    var article_list = this.data.article_list;
    var that = this
    // console.log(that.data.pagecounts)
    if (that.data.pagenum < that.data.pagecounts) {
      // console.log(that.data.pagenum, that.data.pagecounts)
      var pagenum = that.data.pagenum + 1
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=articleList',
        data: {
          uid: wx.getStorageSync('uid'),
          cid: that.data.cid,
          page: pagenum
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // that.setData({
    //   cid: options.cid
    // })
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=articleList',
      data: {
        uid: wx.getStorageSync('uid'),
        // cid: options.cid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        that.setData({
          article_list: result.data.data,
          pagecounts: result.data.pagecounts
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


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(this.data.shareData)
      var that = this
      return this.data.shareData
    }
  }
})