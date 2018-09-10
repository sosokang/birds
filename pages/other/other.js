// pages/other/other.js
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
    classList:[],
    pagenum1: 0,  
    pagecounts1: 1,
  },
  //tab切换
  tab: function (e) {
    var dataId = e.currentTarget.id;
    // console.log(dataId)
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj
    })
  },
  imageDetails: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    var albumList = e.currentTarget.dataset.albumList;
    var birdName = e.currentTarget.dataset.niao;
    wx.navigateTo({
      url: '../xiangqing/xiangqing?imgs=' + JSON.stringify(item.albumList) + '&index=' + index + '&birdName=' + birdName,
    })
  },
  fanspage: function (e) {
    wx.navigateTo({
      url: '../myfans/myfans?taid=' + this.data.taid,
    })
  },
  guanzhu1: function (e) {
    wx.navigateTo({
      url: '../myfocus/myfocus?taid=' + this.data.taid,
    })
  },
  xuan_niao: function (e) {
    var csp_code = e.currentTarget.dataset.csp_code
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
    })
  },
  detail: function (e) {
    // var index = e.currentTarget.dataset.index;
    var tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '../Journal/Journal?tid=' + tid,
    })
    
  },
  // 关注
  guanzhu: function (e) {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=follow',
      data: {
        uid: wx.getStorageSync('uid'),
        fuid: that.data.taid,
        token: '',
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data)
        // console.log(that.data.fansNum)
        var fansNum = that.data.fansNum+1
        that.setData({
          isFollow: 1,
          fansNum: fansNum
        })
        // console.log(that.data.images)
      }
    });
  },
  // 取消关注
  quxiaoguanzhu: function (e) {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=follow',
      data: {
        uid: wx.getStorageSync('uid'),
        fuid: that.data.taid,
        token: '',
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        var fansNum = that.data.fansNum-1
        that.setData({
          isFollow: 0,
          fansNum: fansNum
        })
        // console.log(that.data.images)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var taid = options.authorid
    this.setData({
      taid: taid
    })
    var that= this;
    // 个人信息
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=personalInfo',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync('uid'),
        taid: taid
      },
      method: "POST",
      success: function (res) {
        var data = res.data.data;
        //console.log(res);
        that.setData({
          head: data.head,
          followNum: data.followNum,
          fansNum: data.fansNum,
          credit: data.credit,
          level: data.level,
          username:data.username,
          articleNum: data.articleNum,
          birdspeciesNum: data.birdspeciesNum,
          weibo: data.weibo,
          wechat: data.wechat,
          sign: data.sign,
          isFollow: data.isFollow,
        })
      }
    });
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=articleList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync('uid'),
        taid: taid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        //console.log(res.data.data.articleList[0].upNum);
        that.setData({
          articleList: res.data.data.articleList,
          pagecounts1: res.data.pagecounts

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
        uid: wx.getStorageSync('uid'),
        taid: taid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res);
        // console.log(res.data.data);
        var list = res.data.data;
        for (var i = 0; i < list.length; i++) {
          list[i].dateline = time.js_date_time(list[i].dateline, 'Y-M-D');

          console.log(list[i].dateline)
        }
        // console.log(list)
        that.setData({
          birdNum: parseInt(res.data.data.birdNum),
          classList: res.data.data.birdInfo,
          dateList: list
        })
      }
    })
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=album',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uid: wx.getStorageSync('uid'),
        taid: taid
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data.data[0].albumList)
        that.setData({
          albumList: res.data.data
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
  onReachBottom() {
    var article_list = this.data.article_list;
    var that = this
    if (that.data.tabArr.curBdIndex == 1) {
      if (that.data.pagenum1 < that.data.pagecounts1) {
        var pagenum1 = that.data.pagenum1 + 1
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/index.php?cmd=articleList',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: wx.getStorageSync('uid'),
            taid: that.data.taid,
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
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})