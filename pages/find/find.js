// pages/find/find.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
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
  yincang: function () {
    this.setData({
      zhuanfapage: 0,
      arrowtop: ''
    })
  },
  creathaibao: function () {
    var data={};
    if (this.data.article_status==100){
      var data = {
        tid: this.data.datatid,
        uid: wx.getStorageSync('uid')
      }
    } else if (this.data.article_status == 200){
      var data = {
        aid: this.data.datatid,
        uid: wx.getStorageSync('uid')
      }
    }
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/article_xcxhaibao.php',
      data: data,
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
  zhuanfa: function (e) {
    var article_status = e.currentTarget.dataset.article_status;
    this.setData({
      zhuanfapage: 3,
      arrowtop: 'arrowtop',
      datatid: e.currentTarget.dataset.tid,
      article_status: article_status
    })
    var that = this
    if (that.data.article_status == 100) {
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=birdArticleDetail',
        data: {
          uid: wx.getStorageSync('uid'),
          tid: that.data.datatid,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result.data)
          var coverImgUrl = result.data.data.coverImgUrl || ''
          // console.log(that.data.images)
          var shareData = {
            title: result.data.data.title,
            path: 'pages/Journal/Journal?tid=' + that.data.datatid + '&fanhui=1',
            imageUrl: coverImgUrl,
          }
          // console.log(shareData)
          that.setData({
            shareData: shareData
          })
        }
      })

    } else if (that.data.article_status == 200) {
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
    }
  },
  // 附近
  nearby:function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  other:function(e) {
    var authorid = e.currentTarget.dataset.authorid
    wx.navigateTo({
      url: '../other/other?authorid=' + authorid,
    })
  },
  watch:function() {
    wx.navigateTo({
      url: '../watch/watch',
    })
  },
  // 搜索
  search_qj:function() {
    wx.navigateTo({
      url: '../findSearch/findSearch',
    })
  },
  // 关注
  guanzhu:function(e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var article_list = this.data.article_list;
    var that = this;
    if (wx.getStorageSync('islogin')==0){
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
    }else{
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
          article_list[index].is_follow = 1
          // console.log(result.data)
          that.setData({
            article_list: article_list
          })
          // console.log(that.data.images)
        }
      });
    }
    
  },
  // 关注
  quxiaoguanzhu:function(e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var article_list = this.data.article_list;
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
          article_list[index].is_follow = 0
          // console.log(result.data)
          that.setData({
            article_list: article_list
          })
          // console.log(that.data.images)
        }
      });
    }
  },
  // 排行
  billing:function() {
    wx.navigateTo({
      url: '../billing/billing',
    })
  },
  // 鸟讯
  information:function() {
    wx.navigateTo({
      url: '../news/news',
    })
  },
  information1:function() {
    wx.navigateTo({
      url: '../photo/photo',
    })
  },
  csp_code:function(e) {
    var csp_code = e.currentTarget.dataset.csp_code
    console.log(csp_code)
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
    })
  },
  // 详情
  detail:function(e) {
    var index = e.currentTarget.dataset.index;
    var tid = e.currentTarget.dataset.tid;
    var url = e.currentTarget.dataset.url;
    var article_status = e.currentTarget.dataset.article_status;
    console.log(article_status)
    if (article_status =='100'){
      wx.navigateTo({
        url: '../Journal/Journal?tid=' + tid,
      })
    } else if(article_status == '200'){
      wx.navigateTo({
        url: '../Journal1/Journal?aid=' + tid,
      })
    } else if (article_status == '300'){
      wx.navigateTo({
        url: '../webview/webview?url=' + url,
      })
    }
  },
  comment: function (e) {
    var index = e.currentTarget.dataset.index;
    var tid = e.currentTarget.dataset.tid;
    var url = e.currentTarget.dataset.url;
    var article_status = e.currentTarget.dataset.article_status;
    console.log(article_status)
    if (article_status == '100') {
      wx.navigateTo({
        url: '../Journal/Journal?tid=' + tid,
      })
    } else if (article_status == '200') {
      wx.navigateTo({
        url: '../Journal1/Journal?aid=' + tid,
      })
    } else if (article_status == '300') {
      wx.navigateTo({
        url: '../webview/webview?url=' + url,
      })
    }
  },
  //  收藏
  collectArticle: function (options) {
    var that = this;
    var article_list = options.currentTarget.dataset.article_list;
    var index = options.currentTarget.dataset.index;
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
      if (article_list[index].isCollection == 1){
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
    }
  },
  // 点赞
  upArticle: function (options) {
    var that = this;
    var article_list = options.currentTarget.dataset.article_list;
    var index = options.currentTarget.dataset.index;
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
      if (article_list[index].isUp == 1){
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
            that.setData({
              article_list: article_list
            })
          }
        });
      }
    }
  },
  onReachBottom() {
    var article_list = this.data.article_list;
    var that = this
    if (that.data.pagenum < that.data.pagecounts) {  
      var pagenum = that.data.pagenum+1    
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=homeList',
        data: {
          uid: wx.getStorageSync('uid'),
          page: pagenum
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result)
          var article_list = result.data.data
          for (var i = 0; i < article_list.length; i++) {
            if (article_list[i].article_status == 200) {
              article_list[i].tid = article_list[i].aid
            }
          }
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
        icon:'loading'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.editTabBar(this);//添加tabBar数据
    var that = this
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=homeList',
      data: {
        uid: wx.getStorageSync('uid'),
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data)
        // console.log(result.data.data)
        var article_list = result.data.data
        for (var i = 0; i < article_list.length;i++){
          if (article_list[i].article_status==200){
            article_list[i].tid = article_list[i].aid
          }
        }
        that.setData({
          article_list: article_list,
          pagecounts: result.data.pagecounts
        })
        // console.log(that.data.images)
      }
    }); 
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=homeNavigation&bid=100',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data)
        // console.log(result.data.data)
        that.setData({
          banner: result.data.data
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

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {
  
  // },

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