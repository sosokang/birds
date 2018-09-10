// pages/findUser/findUser.js
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
    searchText: ''
  },
  //tab切换
  tab: function (e) {
    var dataId = e.currentTarget.id;
    console.log(dataId)
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj,
      gu: dataId
    });
  },
  getSearchText: function (e) {
    console.log(e.detail.value);
    this.setData({
      searchText: e.detail.value
    })
  },
  xuan_niao: function (e) {
    var csp_code = e.currentTarget.dataset.csp_code
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
    })
  },
  other: function (e) {
    var authorid = e.currentTarget.dataset.authorid
    wx.navigateTo({
      url: '../other/other?authorid=' + authorid,
    })
  },
  // 关注
  guanzhu: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var heads = this.data.heads;
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
          heads[index].isFollow = 1
          // console.log(result.data)
          that.setData({
            heads: heads
          })
          // console.log(that.data.images)
        }
      });
    }

  },
  // 关注
  quxiaoguanzhu: function (e) {
    var authorid = e.currentTarget.dataset.authorid;
    var index = e.currentTarget.dataset.index;
    var heads = this.data.heads;
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
          heads[index].isFollow = 0
          // console.log(result.data)
          that.setData({
            heads: heads
          })
          // console.log(that.data.images)
        }
      });
    }
  },
  oninput: function (e) {
    // console.log(e.detail.value)
  },
  onconfirm: function (e) {
    // console.log()
    var str = e.detail.value
    var that = this;
    if (that.data.gu==1){
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi//home/index.php?cmd=searchBird',
        data: {
          keywords: str,
          uid: wx.getStorageSync('uid')
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result.data)
          if (result.data.data == '') {
            wx.showModal({
              title: "没有查询到相关鸟种",
              icon: 'loading',
              duration: 2000,
            })
          } else {
            that.setData({
              birdslists: result.data.data
            })
          }
          // console.log(that.data.images)
        }
      })
    } else if (that.data.gu == 2){
      // 话题
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchBirdArticle',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          keywords: str,
          uid: wx.getStorageSync('uid')
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          if (res.data.data == '') {
            wx.showModal({
              title: "没有查询到相关话题",
              icon: 'loading',
              duration: 2000,
            })
          } else {
            that.setData({
              birdDetails: res.data.data
            })
          }
        }
      });
    } else if (that.data.gu == 3){
      // 用户
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchUser',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          keywords: str,
          uid: wx.getStorageSync('uid')
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          if (res.data.data == '') {
            wx.showModal({
              title: "没有查询到相关用户",
              icon: 'loading',
              duration: 2000,
            })
          } else {
            that.setData({
              heads: res.data.data
            })
          }
        }
      });
    } else if (that.data.gu == 4){
      //资源装备
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchArticle',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          keywords: str,
          uid: wx.getStorageSync('uid')
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          if (res.data.data == '') {
            wx.showModal({
              title: "没有查询到相关资讯",
              icon: 'loading',
              duration: 2000,
            })
          } else {
            that.setData({
              zixunDetails: res.data.data
            })
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 鸟种
    // wx.request({
    //   url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchBird',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     uid: wx.getStorageSync('uid')
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       birdslists: res.data.data
    //     })
    //   }
    // });
    // // 话题
    // wx.request({
    //   url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchBirdArticle',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     uid: wx.getStorageSync('uid')
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       birdDetails: res.data.data
    //     })
    //   }
    // });
    // // 用户
    // wx.request({
    //   url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchUser',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     uid: wx.getStorageSync('uid')
    //   },
    //   method: "POST",
    //   success: function(res){
    //     console.log(res);
    //     that.setData({
    //       heads: res.data.data
    //     })
    //   }
    // });
    // //资源装备
    // wx.request({
    //   url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchArticle',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     uid: wx.getStorageSync('uid')
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       zixunDetails: res.data.data
    //     })
    //   }
    // });
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