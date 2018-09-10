//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    username:'',
    password:'',
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }, 
  reg:function(e){
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          wx.getUserInfo({
            withCredentials: false,
            success: function (data) {
              // console.log(e.detail.iv)
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
                  console.log(result)
                  wx.navigateTo({
                    url: '../res/res',
                  })
                  // console.log('登陆成功', result.data.uid)

                }
              })
            }
          })
        }
      }
    })
    
  },
  user: function (e) {
    // console.log(e.detail.value)
    this.setData({
      username: e.detail.value
    })
  },
  pass: function (e) {
    // console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    // console.log(e.detail);
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
                // console.log(e.detail.iv)
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
                    console.log(result)
                    if (result.data.error==13){
                      wx.showToast({
                        title: '请稍后再试',
                        icon: 'loading'
                      });
                    }else{
                      wx.setStorageSync('uid', result.data.uid)
                      wx.setStorageSync('islogin', result.data.islogin)
                      wx.setStorageSync('username', result.data.username)
                      that.denglu();
                    }
                    // console.log('登陆成功', result.data.uid)
                   
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
  
  denglu: function () {
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/login.php?action=dologin',
      data: {
        userName: this.data.username,
        password: this.data.password,
        uid: wx.getStorageSync('uid')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log('登陆成功', result.data.islogin)
        console.log('登陆成功11', result)
        
        if (result.data.code > 0) {
          wx.showModal({
            title: result.data.data.showMessage,
            icon: 'loading',
            duration: 2000,
            success: function () {

            }
          })
        } else {
          //最后，记得返回刚才的页面
          // console.log(result.data.data.islogin)
          // console.log(result.data.data.uid)
          wx.setStorageSync('uid', result.data.data.uid)
          wx.setStorageSync('islogin', result.data.data.islogin)
          // console.log(wx.getStorageSync('uid'))
          // console.log(wx.getStorageSync('islogin'))
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })   
  },
  back: function (e) {
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          wx.getUserInfo({
            withCredentials: false,
            success: function (data) {
              // console.log(e.detail.iv)
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
                  console.log(result)
                  wx.navigateTo({
                    url: '../back/back',
                  })
                  // console.log('登陆成功', result.data.uid)

                }
              })
            }
          })
        }
      }
    })

  },
  yhxy: function () {
    wx.navigateTo({
      url: '../yhxy/yhxy',
    })
  },
  houtui: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})
