//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.setStorageSync('uid', '72308')
    // // wx.setStorageSync('scene', '0')
    // wx.setStorageSync('islogin', 1)
    var that=this
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=v',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log()
        wx.setStorageSync('isok', result.data.isok)
        that.globalData.isok = result.data.isok;
      }
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        if (res.code) {
          wx.request({
            url: 'https://xcxu.birdfans.com/source/xcxbirdapi/user/login.php?action=getisLogin',
            data: {
              // length_code: that.data.length_code
              code: res.code
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
              console.log(result)
              if (result.data.uid > 0) {
                // wx.setStorageSync('uid', 72308)
                wx.setStorageSync('uid', result.data.uid)
                // wx.setStorageSync('scene', '0')
                wx.setStorageSync('islogin', result.data.islogin)
              }
              // console.log(result.data.data.img)

            }
          })
        }
      }
    })
    

    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  //修改tabBar的active值  
  editTabBar: function (that) {

    var tabBar = this.globalData.tabBar;
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = '/' + currentPage.route //当前页面url


    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == url) {
        tabBar.list[i].active = true;//根据页面地址设置当前页面状态  
      }
    }

    that.setData(this.globalData);
    // that.setData(tabBar); //这样页面不会渲染新数据
    // console.log(that.data);

  },
  globalData: {
    userInfo: null,
    userId: null,
    isok:'',
    //配置tabBar 
    tabBar: {
      "color": "#7f7f7f",
      "borderStyle": "#000",
      "selectedColor": "#7faf41",
      "list": [{
        "pagePath": "/pages/find/find",
        "text": "发现",
        "iconPath": "/img/sub_discover.png",
        "selectedIconPath": "/img/sub_discovered.png",
        "vsActive": false,
        "active": false
      },
      {
        "pagePath": "/pages/rules/rules",
        "text": "查鸟",
        "iconPath": "/img/sub_find_bird.png",
        "selectedIconPath": "/img/sub_find_birded.png",
        "vsActive": true,
        "active": false
      },
      {
        "pagePath": "",
        // "text": "发布",
        "vsActive": true,
      },
      {
        "pagePath": "/pages/chat/chat",
        "text": "鸟圈",
        "iconPath": "/img/sub_bird_nav.png",
        "selectedIconPath": "/img/sub_bird_naved.png",
        "vsActive": true,
        "active": false
      },
      {
        "pagePath": "/pages/my/my",
        "bindtap": "mypage",
        "text": "我的",
        "iconPath": "/img/sub_mine.png",
        "selectedIconPath": "/img/sub_mined.png",
        "vsActive": false,
        "active": false
      }
      ],
      "position": "bottom"
    }
  },
  

})
