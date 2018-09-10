// pages/back/back.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    password1: '',
    phone: '',
    pcode: '',
    sendyzm: 0,
    min: 60,
    uid: wx.getStorageSync('uid'),
    sendyzm: 0,
  },
  phone: function (e) {
    // console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  pass: function (e) {
    // console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  pass1: function (e) {
    // console.log(e.detail.value)
    this.setData({
      password1: e.detail.value
    })
    if (this.data.password != this.data.password1) {
      wx.showModal({
        title: "两次密码不一致",
        icon: 'loading',
        duration: 2000,
        success: function () {

        }
      })
    } else {
      this.setData({
        password1: e.detail.value
      })
    }
  },
  pcode: function (e) {
    // console.log(e.detail.value)
    this.setData({
      pcode: e.detail.value
    })
  },
  yzm: function () {
    var _this = this
    if (_this.data.phone == '') {
      wx.showModal({
        title: "请输入手机号",
        icon: 'loading',
        duration: 2000,
        success: function () {

        }
      })
    } else {
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/sendSms.php',
        data: {
          mobile: _this.data.phone,
          isRegister:2
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          console.log(result);
          if (result.data.code == 0) {
            _this.setData({
              min: 60,
              sendyzm: 1
            })
            setInterval(function () {
              var min222 = _this.data.min
              if (min222 > 0) {
                // console.log(min222)
                var min1 = min222 - 1
                // console.log(min1)
                _this.setData({
                  min: min1
                })
              } else {
                _this.setData({
                  sendyzm: 0
                })
              }
            }, 1000)
            wx.showModal({
              title: result.data.msg,
              icon: 'loading',
              duration: 2000,
              success: function () {

              }
            })
          } else {
            wx.showModal({
              title: result.data.msg,
              icon: 'loading',
              duration: 2000,
              success: function () {
                this.setData({
                  sendyzm: 0
                })
              }
            })
          }

        }
      })
    }
  },
  
  reg: function () {
    if (this.data.password != this.data.password1) {
      wx.showModal({
        title: "两次密码不一致",
        icon: 'loading',
        duration: 2000,
        success: function () {

        }
      })
    } else {
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/resetpass_xcx.php',
        data: {
          phone: this.data.phone,
          password: this.data.password1,
          pcode: this.data.pcode,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result.data)
          if (result.data.code > 0) {
            wx.showModal({
              title: result.data.msg,
              icon: 'loading',
              duration: 2000,
              success: function () {

              }
            })
          } else {
            wx.setStorageSync('uid', result.data.uid)
            wx.setStorageSync('islogin', result.data.islogin)
            wx.showModal({
              title: '密码重置成功，请登录！',
              icon: 'loading',
              duration: 1000,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
             
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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