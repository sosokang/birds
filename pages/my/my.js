var time = require('../../utils/util.js');
// pages/my/my.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab 切换
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    },
    gu: 1,
    pagenum1:1,
    pagenum2:1,
    pagenum3:1,
    pagecounts1:1,
    pagecounts2:1,
    pagecounts3:1,
    classList:''
  },
  //tab切换
  tab: function (e) {
      var dataId = e.currentTarget.id;
      // console.log(dataId)
      var obj = {};
      obj.curHdIndex = dataId;
      obj.curBdIndex = dataId;
      this.setData({
        tabArr: obj,
        gu: dataId
      });
    },
    xiangqing:function(e){
      var tid = e.currentTarget.dataset.tid;
      wx.navigateTo({
        url: '../Journal/Journal?tid=' +tid,
      })
    },
    imageDetails:function(e){
      var index = e.currentTarget.dataset.index;
      var item = e.currentTarget.dataset.item;
      var albumList = e.currentTarget.dataset.albumList;
      var birdName = e.currentTarget.dataset.niao;
      wx.navigateTo({
        url: '../xiangqing/xiangqing?imgs=' + JSON.stringify(item.albumList) + '&index=' + index + '&birdName=' + birdName,
      })
    },
    fanspage:function(e){
      wx.navigateTo({
        url: '../myfans/myfans',
      })
    },
    guanzhupage:function(e){
      wx.navigateTo({
        url: '../myfocus/myfocus',
      })
    },
    xuan_niao: function (e) {
      var csp_code = e.currentTarget.dataset.csp_code
      wx.navigateTo({
        url: '../detail/detail?csp_code=' + csp_code,
      })
    },
    detail: function (e) {
      var index = e.currentTarget.dataset.index;
      var tid = e.currentTarget.dataset.tid;
      var aid = e.currentTarget.dataset.aid||'';
      var url = e.currentTarget.dataset.url;
      var article_status = e.currentTarget.dataset.article_status||'';
      console.log(article_status)
      if (article_status == '100' || article_status == '') {
        wx.navigateTo({
          url: '../Journal/Journal?tid=' + tid,
        })
      } else if (article_status == '200') {
        wx.navigateTo({
          url: '../Journal1/Journal?aid=' + aid,
        })
      } else if (article_status == '300') {
        wx.navigateTo({
          url: '../webview/webview?url=' + url,
        })
      }
    },
    other: function (e) {
      var authorid = e.currentTarget.dataset.authorid
      wx.navigateTo({
        url: '../other/other?authorid=' + authorid,
      })
    },
  comment: function (e) {
    var index = e.currentTarget.dataset.index;
    var tid = e.currentTarget.dataset.tid;
    var article_status = e.currentTarget.dataset.article_status;
    wx.navigateTo({
      url: '../Journal/Journal?tid=' + tid,
    })
  },
  //  收藏
  collectArticle: function (options) {
    var that = this;
    var article_list = options.currentTarget.dataset.article_list;
    var index = options.currentTarget.dataset.index;
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
        console.log(result.data)
        that.setData({
          detailsList: article_list
        })
        // console.log(that.data.images)
      }
    });
  },
  //  取消收藏
  collectArticle1: function (options) {
    var that = this;
    var article_list = options.currentTarget.dataset.article_list;
    var index = options.currentTarget.dataset.index;
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
        console.log(result.data)
        that.setData({
          detailsList: article_list
        })
        // console.log(that.data.images)
      }
    });
  },
  // 点赞
  upArticle: function (options) {
    var that = this;
    var article_list = options.currentTarget.dataset.article_list;
    var index = options.currentTarget.dataset.index;
    if (article_list[index].isUp == 1) {
      wx.showModal({
        title: '已赞',
        content: '',
      })
    } else {
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
          article_list[index].isUp = 1
          article_list[index].upNum = article_list[index].upNum + 1
          // console.log(article_list)
          that.setData({
            detailsList: article_list
          })
        }
      })
    }
  },
  // 关注
  guanzhu: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    console.log(authorid)
    var index = e.currentTarget.dataset.index;
    var detailsList = this.data.detailsList;
    var that = this;
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
        detailsList[index].is_follow = 1
        that.setData({
          detailsList: detailsList
        })
        // console.log(that.data.images)
      }
    });
  },
  // 取消关注
  guanzhu1: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    console.log(authorid)
    var index = e.currentTarget.dataset.index;
    var detailsList = this.data.detailsList;
    var that = this;
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
        detailsList[index].is_follow = 0
        that.setData({
          detailsList: detailsList
        })
        // console.log(that.data.images)
      }
    });
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this
      App.editTabBar(this);//添加tabBar数据
     
      
    },
    onReachBottom() {
      var article_list = this.data.article_list;
      var that = this
      if(that.data.gu==1){
        if (that.data.pagenum1 < that.data.pagecounts1) {
          var pagenum1 = that.data.pagenum1 + 1
          wx.request({
            url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=articleList',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              uid: wx.getStorageSync('uid'),
              page: pagenum1
            },
            method: 'POST',
            success: function (res) {
              var article_list = res.data.data.articleList
              // console.log(article_list)
              // console.log(that.data.articleList)
              var article_list1 = that.data.articleList.concat(article_list)
              that.setData({
                articleList: article_list1,
                pagenum1: pagenum1
              })
            }
          });
        } else {
          wx.showToast({
            title: '我是有底线的',
            icon: 'loading'
          })
        }
      } else if (that.data.gu == 2){
        if (that.data.pagenum2 < that.data.pagecounts2) {
          var pagenum2 = that.data.pagenum2 + 1;
          wx.request({
            url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=collectionList',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              uid: wx.getStorageSync('uid'),
              page: pagenum2
            },
            method: 'POST',
            success: function (res) {
              var collectionList = res.data.data
              // console.log(article_list)
              // console.log(that.data.articleList)
              var collectionList1 = that.data.collectionList.concat(collectionList)
              that.setData({
                collectionList: collectionList1,
                pagenum2: pagenum2
              })
            }
          });
        } else {
          wx.showToast({
            title: '我是有底线的',
            icon: 'loading'
          })
        }
      } else if (that.data.gu == 4){
        if (that.data.pagenum3 < that.data.pagecounts3) {
          var pagenum3 = that.data.pagenum3 + 1
          wx.request({
            url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=followArticleList',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              uid: wx.getStorageSync('uid'),
              page: pagenum3
            },
            method: 'POST',
            success: function (res) {
              var detailsList = res.data.data
              // console.log(article_list)
              // console.log(that.data.articleList)
              var detailsList1 = that.data.detailsList.concat(detailsList)
              that.setData({
                detailsList: detailsList1,
                pagenum3: pagenum3
              })
            }
          })
        } else {
          wx.showToast({
            title: '我是有底线的',
            icon: 'loading'
          })
        }
      }
      
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
      var that = this
      if (wx.getStorageSync('islogin') == 0) {
        wx.showModal({
          title: '请先登录',
          icon: 'loading',
          duration: 2000,
          success: function (res) {
            if(res.confirm){
              wx.navigateTo({
                url: '../logs/logs',
              })
            }else if(res.cancel){
              wx.redirectTo({
                url: '../find/find',
              })
            }
          }
        })
      }else{
      // 我的信息
        that.setData({
          head: wx.getStorageSync('head')
        })
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=personalInfo',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: wx.getStorageSync('uid')
          },
          method: "POST",
          success: function (res) {
            var data = res.data.data;
            //console.log(res);
            that.setData({
              // head: data.head,
              followNum: data.followNum,
              fansNum: data.fansNum,
              credit: data.credit,
              level: data.level,
              articleNum: data.articleNum,
              birdspeciesNum: data.birdspeciesNum,
              weibo: data.weibo,
              wechat: data.wechat,
              username: data.username,
              sign: data.sign
            })
          }
        });
        // 我的日志
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=articleList',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: wx.getStorageSync('uid')
          },
          method: 'POST',
          success: function (res) {
            that.setData({
              articleList: res.data.data.articleList,
              pagecounts1: res.data.pagecounts
            })
          }
        });
        // 我的收藏
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=collectionList',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: wx.getStorageSync('uid')
          },
          method: 'POST',
          success: function (res) {
            // console.log(res);
            //console.log(res.data.data.articleList[0].upNum);
            that.setData({
              collectionList: res.data.data,
              pagecounts2: res.data.pagecounts
            })
          }
        });
        // 我的鸟种
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=obBirdList',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: wx.getStorageSync('uid')
          },
          method: 'POST',
          success: function (res) {
            // console.log(res);
            // console.log(res.data.data);
            var list = res.data.data;
            // for(var i = 0; i < list.length; i++ ){
            //   list[i].dateline = time.js_date_time(list[i].dateline, 'Y-M-D');

            //   console.log(list[i].dateline)
            // }
            // console.log(list)
            that.setData({
              birdNum: parseInt(res.data.data.birdNum),
              classList: res.data.data.birdInfo || '',
              dateList: list
            })
          }
        })
        //我的好友圈
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=followArticleList',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: wx.getStorageSync('uid')
          },
          method: 'POST',
          success: function (res) {
            that.setData({
              detailsList: res.data.data,
              pagecounts3: res.data.pagecounts
            })
          }
        })
        // 相册
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=album',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: wx.getStorageSync('uid'),
          },
          method: 'POST',
          success: function (res) {
            // console.log(res.data.data[0].albumList)
            that.setData({
              albumList: res.data.data
            })
          }
        })
      }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    }
})