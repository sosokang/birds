// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   page:1,
   zanimg:'zan1.png',
   photo: 0,
   gid:'',
   lastX: 0,          //滑动开始x轴位置
   lastY: 0,          //滑动开始y轴位置
   text: "没有滑动",
   currentGesture: 0, //标识手势
   color:'bbb',
   pingluntext:"",
   titlezt:"flex",
   current:0,
   pagenum:1,
   birdName:'',
   isindex:false,
   shareTitle:''
  },
  pinglun:function() { 
    // console.log(111)
   this.setData({
    page: 2,
    auto_focus: true
   })
  },
  pinglun2: function () {
    this.setData({
      page: 2,
      auto_focus:false
    })
  },
  swiperChange: function (e) {
    // var index = e.
    // console.log(this.data.movies[e.detail.current].aid)
    this.setData({
      current: e.detail.current,
      aid: this.data.movies[e.detail.current].aid,
      imgUrl: this.data.movies[e.detail.current].imgUrl
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    if (options.imgs!=null){
      var movies = JSON.parse(options.imgs)
      // console.log(movies)
      var index = parseInt(options.index)
      var birdName = options.birdName
      // console.log(birdName)
      that.setData({
        movies: movies,
        current: index,
        birdName: birdName
      })
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/photoDetail.php',
        data: {
          aid: movies[0].aid
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result)
          that.setData({
            pagenum:1,
            aid:movies[0].aid,
            author: result.data.author,
            head: result.data.head,
            tid: result.data.tid,
            shareTitle: result.data.birdName,
          })
        }
      })
    }else{
      var scene = decodeURIComponent(options.scene)
      // console.log('--scene--')
      // console.log(scene)
      //我这里传的参数为$data['scene'] = "gid=" 6435;
      //使用console.log(scene);得到的结果为gid=6435
      //获得uid 的值
      // var aid = 3575687;
      var aid = scene.split("=")[1] || options.aid;
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/photoDetail.php',
        data: {
          aid:aid
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result)
          that.setData({
            pagenum: 2,
            aid:aid,
            isindex:true,
            author: result.data.author,
            head: result.data.head,
            tid: result.data.tid,
            birdName: result.data.birdName,
            imgUrl: result.data.imgUrl,
            imgExifLen: result.data.imgExifLen,
            imgExifModel: result.data.imgExifModel,
            imgExifModel: result.data.imgExifParameter,
            shareTitle: result.data.shareTitle,
            imgHeight: result.data.imgHeight,
            imgWidth: result.data.imgWidth,
          })
        }
      })
    }
  },
  goback:function(){
    if (this.data.isindex==true){
      wx.navigateTo({
        url: '../find/find',
      })
    }else{
      wx.navigateBack({
        delta: 1
      })
    }    
  },
  titlezt:function(){
    if (this.data.titlezt =="flex"){
      this.setData({
        titlezt:"none",
        zhuanfapage: 0,
        arrowtop: ''
      })
    }else{
      this.setData({
        titlezt: "flex",
        zhuanfapage: 0,
        arrowtop: ''
      })
    }
  },
  photocs:function(){
    this.setData({
      photo:1
    })
  },
  zhuanfa: function () {
    this.setData({
      zhuanfapage: 3,
      arrowtop:'arrowtop'
    })
  },
  yincang: function () {
    this.setData({
      zhuanfapage: 0,
      arrowtop:''
    })
  },
  creathaibao: function () {
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/photo_xcxhaibao.php',
      data: {
        aid: this.data.aid,
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
  photocshide: function () {
    this.setData({
      photo: 0
    })
  },
  photoinfo: function () {
    if (this.data.photo==0){
      this.setData({
        photo: 1
      })
    }else{
      this.setData({
        photo: 0
      })
    }
  },
  handletouchmove: function (event) {
     var currentX = event.touches[0].pageX
     var currentY = event.touches[0].pageY
     var tx = currentX - this.data.lastX
     var ty = currentY - this.data.lastY
     var text = ""
     //左右方向滑动
     if (Math.abs(tx) > Math.abs(ty)) {
      //  if (tx < 0)
      //    text = "向左滑动"
      //  else if (tx > 0)
      //    text = "向右滑动"
     }
     //上下方向滑动
     else {
       if (ty < 0){
        //  text = "向上滑动"
         this.setData({
           photo: 1
         })
         }
      else if (ty > 0){
        //  text = "向下滑动"
         this.setData({
           photo: 0
         })
         }
     }
      //将当前坐标进行保存以进行下一次计算
     this.data.lastX = currentX
     this.data.lastY = currentY
     this.setData({
       text: text,
     });
   }, 
   //滑动开始事件
   handletouchtart: function (event) {
     this.data.lastX = event.touches[0].pageX
     this.data.lastY = event.touches[0].pageY
   },
   //滑动结束事件
   handletouchend: function (event) {
     this.data.currentGesture = 0;
     this.setData({
       text: "没有滑动",
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
  onShow: function (e) {

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
    let _that = this
    return {
      title: _that.data.shareTitle,
      path: 'pages/xiangqing/xiangqing?aid='+ _that.data.aid,
      imageUrl: _that.data.imgUrl,
    }
  }
})