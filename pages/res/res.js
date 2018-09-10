// pages/res/res.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fasong:1,
    min: 60,
    phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  user: function (e) {
    var _this = this
    // console.log(e.detail.value)
    if (e.detail.value!=''){
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/register.php?action=checkUserName',
        data: {
          userName: e.detail.value
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          if (result.data.code != 0) {
            wx.showModal({
              title: result.data.msg,
              icon: 'loading',
              duration: 2000,
              success: function () {

              }
            })
          } else {
            // console.log(result.data)
            _this.setData({
              username: e.detail.value
            })
          }

        }
      })
    }
    
  },
  phone: function (e) {
    // console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  password: function (e) {
    // console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  vCode: function (e) {
    // console.log(e.detail.value)
    this.setData({
      vCode: e.detail.value
    })
  },
  sendyzm: function () {
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
          mobile: _this.data.phone
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
              fasong:2
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
                  fasong: 1
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
                _this.setData({
                  sendyzm: 1
                })
              }
            })
          }
        }
      })
    }
  },
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail);
    if (that.data.username == '') {
      wx.showModal({
        title: '请输入用户名',
        icon: 'loading',
        duration: 0,
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '请输入密码',
        icon: 'loading',
        duration: 0,
      })
    } else {
      wx.login({
        success: res => {
          if (res.code) {
            //发起网络请求
            wx.getUserInfo({
              withCredentials: false,
              success: function (data) {
                // console.log(res, data)
                wx.setStorageSync('head', data.userInfo.avatarUrl)
                wx.request({
                  url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/login.php?action=getuserid',
                  data: {
                    code: res.code,
                    nick_name: data.userInfo.nickName,
                    // avatar: data.userInfo.avatarUrl,
                    scene: wx.getStorageSync('scene'),
                    iv: e.detail.iv,
                    // signature: e.detail.signature,
                    encryptedData: e.detail.encryptedData
                  },
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (result) {
                    if (result.data.error == 13) {
                      wx.showToast({
                        title: '请稍后再试',
                        icon: 'loading'
                      });
                    } else {
                      wx.setStorageSync('head', data.userInfo.avatarUrl)
                      wx.setStorageSync('uid', result.data.uid)
                      // wx.setStorageSync('islogin', result.data.islogin)
                      // wx.setStorageSync('username', result.data.username)
                      that.reg();
                    }
                    //最后，记得返回刚才的页面
                  }
                })
              }
            })
          }
        }
      })
      //接下来写业务代码
    }
  },
  reg: function () {
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/register.php',
      data: {
        userName: this.data.username,
        mobile: this.data.phone,
        password: this.data.password,
        vCode: this.data.vCode,
        uid: wx.getStorageSync('uid')
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
        } else if (result.data.code == 0){
          console.log(result.data.data.uid)
          console.log(result.data.data.islogin)
          wx.setStorageSync('uid', result.data.data.uid)
          wx.setStorageSync('islogin', result.data.data.islogin)
          wx.showModal({
            title: '注册成功',
            icon: 'loading',
            duration: 2000,
            success: function () {
              
            }
          })
          wx.navigateBack({
            delta: 2
          })
        }
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