// pages/Journal/Journal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    pinglun:0,
    coverImgUrl:'',
    bianji:0,

  },
  // 转发
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
        tid: this.data.tid,
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
  zhuanfa: function () {
    this.setData({
      zhuanfapage: 3,
      arrowtop: 'arrowtop'
    })
  },
 
  // 评论
  pinglun3: function (e) {
    // console.log(e.detail.value)
    this.setData({
      pingluntext: e.detail.value
    })
  },
  other: function () {
    var authorid = this.data.authorid
    wx.navigateTo({
      url: '../other/other?authorid=' + authorid,
    })
  },
  fabiao1: function () {
    var that = this
    if (that.data.pingluntext == "") {
      wx.showModal({
        title: "请输入评论",
        icon: 'loading',
        duration: 2000,
        success: function () {

        }
      })
    } else {
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=commentArticle',
        data: {
          tid: that.data.tid,
          uid: wx.getStorageSync('uid'),
          comment: that.data.pingluntext
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          if (result.data.code != 0) {
            that.setData({
              kong: '',
              pingluntext: '',
              pinglun: 0
            })
            wx.showModal({
              title: "评论失败，请稍后再试",
              icon: 'loading',
              duration: 2000,
              success: function () {
              }
            })
          } else {
            // console.log(result.data)
            
            wx.showModal({
              title: "发表评论成功",
              icon: 'loading',
              duration: 2000,
              success: function () {

              }
            })
            wx.request({
              url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=birdArticleCommentList',
              data: {
                uid: wx.getStorageSync('uid'),
                tid: that.data.tid,
              },
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (result) {
                // console.log(result.data)
                that.setData({
                  commentList: result.data.data.commentList,
                  count: result.data.data.count
                })
                // console.log(that.data.images)
              }
            })
            that.setData({
              kong: '',
              pingluntext: '',
              pinglun: 0
            })
          }
        }
      })
    }

  },
  comment: function () {
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
      this.setData({
        pinglun:1
      })
    }
  },
  //  收藏
  collectArticle: function (options) {
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
      if (that.data.isCollection==1){
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=collectArticle',
          data: {
            uid: wx.getStorageSync('uid'),
            tid: that.data.tid,
            token: '',
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (result) {
            that.setData({
              isCollection: 0
            })
            // console.log(that.data.images)
          }
        });
      }else{
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=collectArticle',
          data: {
            uid: wx.getStorageSync('uid'),
            tid: that.data.tid,
            token: '',
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (result) {

            // console.log(result.data)
            that.setData({
              isCollection: 1
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
      if (that.data.isUp==1){
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
            // console.log(result.data)
            that.setData({
              isUp: 1,
              upnum: that.data.upnum+1
            })
          }
        });
      }
    }
  },
  // 关注
  guanzhu: function (e) {
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
          fuid: that.data.authorid,
          token: '',
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          that.setData({
            isFollow: 1
          })
          // console.log(that.data.images)
        }
      });
    }
  },
  // 关注
  quxiaoguanzhu: function (e) {
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
          fuid: that.data.authorid,
          token: '',
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          that.setData({
            isFollow: 0
          })
          // console.log(that.data.images)
        }
      });
    }
  },
  // 日志编辑
  rizhibianji: function (e) {
    var that = this;
    wx.redirectTo({
      url: '../fabu/index?tid='+that.data.tid,
    })
  },
  goback: function () {
    wx.navigateTo({
      url: '../find/find',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var scene = decodeURIComponent(options.scene)
    console.log('--scene--')
    console.log(scene)
    //我这里传的参数为$data['scene'] = "gid=" 6435;
    //使用console.log(scene);得到的结果为gid=6435
    //获得uid 的值
    var tid = scene.split("=")[1];
    console.log(tid)
    var that = this
    if (tid) {
      that.setData({
        // gohome: true,
        tid: tid,
        fanhui: 1
      })
    } else {
      that.setData({
        tid: options.tid,
        fanhui: options.fanhui||0,
      })
    }
    
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=birdArticleDetail',
      data: {
        uid: wx.getStorageSync('uid'),
        tid: that.data.tid,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data)
        if (result.data.data.authorid == wx.getStorageSync('uid')){
          that.setData({
            bianji:1
          })
        }
        that.setData({
          coverImgUrl: result.data.data.coverImgUrl||'',
          author: result.data.data.author,
          authorHead: result.data.data.authorHead,
          authorid: result.data.data.authorid,
          title: result.data.data.title,
          birdInfo: result.data.data.birdInfo,
          locale: result.data.data.locale,
          observeTime: result.data.data.observeTime,
          postBody: result.data.data.postBody,
          publishTime: result.data.data.publishTime,
          isUp: result.data.data.isUp,
          isCollection: result.data.data.isCollection,
          isFollow: result.data.data.isFollow,
          viewNum: result.data.data.viewNum,
          environment: result.data.data.environment,
        })
        // console.log(that.data.images)
      }
    })
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=birdArticleUpList',
      data: {
        uid: wx.getStorageSync('uid'),
        tid: that.data.tid,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          uplist: result.data.data,
          upnum: result.data.data.length
        })
        // console.log(that.data.images)
      }
    })
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=birdArticleCommentList',
      data: {
        uid: wx.getStorageSync('uid'),
        tid: that.data.tid,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          commentList: result.data.data.commentList,
          count: result.data.data.count
        })
        // console.log(that.data.images)
      }
    })
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '爱鸟国际',
      path: 'pages/Journal/Journal?tid=' + this.data.tid + '&fanhui=1',
    }
  }
})