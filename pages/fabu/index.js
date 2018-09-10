var util = require('../../utils/util.js')
Page({
  data: {
    top_img: '../../img/fabu_top.jpg',
    coverImgHeight:'322',
    yunsuan_img:'../../img/reduce_bird.png',
    title:'',
    niao_num:1,
    niao_num1:1,
    dates: '',
    position:'',
    address: wx.getStorageSync('address'),
    location: wx.getStorageSync('location'),
    shengjing:'',
    paraList: [],
    niaob:'block',
    img:[],
    niao_info:[],
    firstAdding:false,
    Adding2:false,
    Adding:true,
    bigTitle:'',
    page:1,
    huan_top:"none",
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    },
  },
  //tab切换
  tab: function (e) {
    var dataId = e.currentTarget.id;
    console.log(dataId)
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj
    })
  },
  huan_img: function (e) {
    this.setData({
      page: 2
    })
  },
  xuanze_topimg: function (e) {
    this.setData({
      page: 1,
      top_img:e.currentTarget.dataset.img,
      imgId: e.currentTarget.dataset.aid
    })
  },
  onLoad: function (options) {
    var that = this
    var tid = parseInt(options.tid)
    if (tid>0) {
      console.log(options.tid)
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=birdArticleDetailForEdit',
        data: {
          uid: wx.getStorageSync('uid'),
          tid: options.tid,
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          // console.log(result.data.data)
          var birdInfo = result.data.data.birdInfo;
          var articleBody = result.data.data.articleBody[0];
          // console.log(articleBody[0].postList)
          var paraList = [];
          // var img = [{ aid: '' }]
          for (var i = 0; i < articleBody.postList.length; i++) {
            // img[i].aid = articleBody.postList[i].aid;
            // paraList[i].imgTag = articleBody.postList[i].imgTag;
            // paraList[i].isImg = articleBody.postList[i].isImg;
            // paraList[i].text = articleBody.postList[i].message;
            // paraList[i].img = articleBody.postList[i].imgUrl;
            paraList[i] = articleBody.postList[i];
          }
          console.log(paraList)
          var niao_info = [];
          for (var i = 0; i < birdInfo.length;i++){
            niao_info[i] = birdInfo[i]
          }   
          that.setData({
            title: result.data.data.title,
            bigTitle: result.data.data.title,
            top_img: result.data.data.coverImgUrl,
            huan_top:"block",
            // imgId: result.data.data.imgId,
            coverImgHeight: 500,
            address: result.data.data.locale,
            location: { lat: result.data.data.lat, lng: result.data.data.lng },
            shengjing: result.data.data.environment,
            shengjingid: result.data.data.environmentId,
            tid: options.tid,
            pid: articleBody.pid,
            paraList: paraList,
            niao_info: niao_info,
            // img: img,
            firstAdding: false,
            Adding2: true,
            Adding: false,
            xq_display: 1
          })
          // console.log(that.data.images)
        }
      })
    }
  },
  tuichu: function () {//如果页面被卸载时被执行
    wx.showModal({
      title: "确定退出编辑吗？",
      icon: 'loading',
      duration: 2000,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../find/find',
          })
        } else if (res.cancel) {
          
        }

      }
    })
  },
  jia:function(){
    var num = this.data.niao_num+1
    this.setData({
      niao_num: num
    })
  },
  jian:function(){
    if (this.data.niao_num<2){
      this.setData({
        niao_num: 1
      })
    }else{
      var num = this.data.niao_num-1
      this.setData({
        niao_num: num
      })
    }
  },
  pullUp:function(e){
    var index = e.currentTarget.dataset.index;
    var index2 = index-1;
    var paraList = this.data.paraList
    paraList[index] = paraList.splice(index2, 1, paraList[index])[0]
    this.setData({
      paraList: paraList
    })
    // console.log(paraList[index]);
    // console.log(paraList[index-1]);
  },
  pullDown: function (e) {
    var index = e.currentTarget.dataset.index;
    var index2 = index + 1;
    var paraList = this.data.paraList
    paraList[index] = paraList.splice(index2, 1, paraList[index])[0]
    this.setData({
      paraList: paraList
    })
  },
  para_add:function(){
    var paraList = this.data.paraList
    for (var i = 0; i < paraList.length; i++) {
      paraList[i].adding = false
    }
    this.setData({
      paraList: paraList,
      firstAdding:true,
      Adding2:false
    })
  },
  para_add1: function (e) {
    var index = e.currentTarget.dataset.index;
    var paraList = this.data.paraList
    for(var i= 0 ;i<paraList.length;i++){
      paraList[i].adding = false
    }
    paraList[index].adding =true
    this.setData({
      paraList: paraList,
      Adding2: true,
      firstAdding: false,
    })
  },
  delPara: function (e) {
    var index = e.currentTarget.dataset.index;
    var paraList = this.data.paraList
    paraList.splice(index,1);
    this.data.img.splice(index,1);
    // console.log(paraList)
    // console.log(this.data.img)
    if(paraList.length==0){
      this.setData({
        firstAdding: false,
        Adding: true,
        Adding2: false,
      })
    }
    this.setData({
      paraList: paraList
    })
  },
  delNiao: function (e) {
    var index = e.currentTarget.dataset.index;
    var niao_info = this.data.niao_info
    niao_info.splice(index, 1)
    if (niao_info==''){
      
      this.setData({
        xq_display: 2
      })
    }
    this.setData({
      niao_info: niao_info
    })
  },
  jia1: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var niao_info = this.data.niao_info
    niao_info[index].niao_num = parseInt(niao_info[index].niao_num)+1
    this.setData({
      niao_info: niao_info
    })
  },
  jian1: function (e) {
    var index = e.currentTarget.dataset.index
    var niao_info = this.data.niao_info
    
    if (parseInt(niao_info[index].niao_num) < 2) {
      niao_info[index].niao_num=1
      this.setData({
        niao_info: niao_info
      })
    } else {
      niao_info[index].niao_num = parseInt(niao_info[index].niao_num) - 1
      this.setData({
        niao_info: niao_info
      })
    }
  },
  onconfirm: function (e) {
    var str = e.detail.value
    var index = e.currentTarget.dataset.index
    var niao_info = this.data.niao_info
    niao_info[index].niao_num = parseInt(str)
    this.setData({
      niao_info: niao_info
    })
  },
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  position:function(){
    wx.navigateTo({
      url: '../fabu_dizhi/index',
    })
  },
  shengjing: function () {
    wx.navigateTo({
      url: '../fabu_sj/index',
    })
  },
  xuanze_niao: function () {
    wx.navigateTo({
      url: '../fabu_niao/index',
    })
  },
  editPara: function (e) {
    var index = e.currentTarget.dataset.index
    var niao_list = this.data.niao_info
    wx.navigateTo({
      url: '../fabu_niao/index?index=' + index + '&niao_list=' + JSON.stringify(niao_list),
    })
  },
  addImg:function(e){
    var index = e.currentTarget.dataset.index+1;
    var _this = this
    wx.chooseImage({
      count: 9,  //最多可以选择的图片总数  
      //original原图，compressed压缩图
      // sizeType: ['original'],
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 图片上传
        // 上传图片
        var tempFilePaths = res.tempFilePaths;
        var img = _this.data.img
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file_bird',
            formData: {
              'uid': wx.getStorageSync('uid')
            },
            success: function (res) {
              img = img.concat(JSON.parse(res.data).data)
              // for (var i = 0; i < tempFilePaths.length; i++) {
              _this.data.paraList.splice(index, 0, { img: JSON.parse(res.data).data.imgUrl, isImg: 1, aid: JSON.parse(res.data).data.aid, isNewAid:1})
              for (var i = 0; i < _this.data.paraList.length; i++) {
                _this.data.paraList[i].adding = false
              }
              // }
              var paralist = _this.data.paraList
              // console.log(paralist)
              var imgId ='';
              var top_img ='';
              for (var i = 0; i < paralist.length;i++){
                if (paralist[i].isImg==1){
                  top_img = paralist[i].img;
                  imgId = paralist[i].aid;
                }
              }
              _this.setData({
                paraList: _this.data.paraList,
                img: img,
                top_img: top_img,
                huan_top: "block",
                imgId: imgId,
                coverImgHeight:500,
                firstAdding: false,
                Adding: false,
                Adding2: true,
              })
            },
            complete: function () {
              // complete 

            }
          })
        }
      }
    });
  },
  addImg1: function (e) {
    var index = e.currentTarget.dataset.index + 1;
    var _this = this
    wx.chooseImage({
      count: 9,  //最多可以选择的图片总数  
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        //启动上传等待中...  
        // console.log(res)
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 上传图片
        var tempFilePaths = res.tempFilePaths;
        var img = _this.data.img
        for (var i = 0; i < tempFilePaths.length; i++) {
            wx.uploadFile({
              url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=upload', //仅为示例，非真实的接口地址
              filePath: tempFilePaths[i],
              name: 'file_bird',
              formData: {
                'uid': wx.getStorageSync('uid')
              },
              success: function (res) {
                img= img.concat(JSON.parse(res.data).data)
                // console.log(img)
                _this.data.paraList.splice(index, 0, { img: JSON.parse(res.data).data.imgUrl, isImg: 1, aid: JSON.parse(res.data).data.aid, isNewAid:1})
                for (var i = 0; i < _this.data.paraList.length; i++) {
                  _this.data.paraList[i].adding = false
                }
                // console.log(_this.data.paraList)
                _this.setData({
                  img: img,
                  top_img: _this.data.paraList[0].img,
                  huan_top: "block",
                  imgId: _this.data.paraList[0].aid,
                  paraList: _this.data.paraList,
                  firstAdding: false,
                  Adding: false,
                  Adding2: true,
                  coverImgHeight: 500,
                })
              },
              complete: function () {
                // complete 

              }
            })
          }
        // console.log(_this.data.img)
        // var imgbox = []
        // for (var i = tempFilePaths.length-1; i >=0 ; i--) {
        //   _this.data.paraList.splice(index, 0, { img: tempFilePaths[i], isImg:1})
        // }
        // var paralist = _this.data.paraList
        // _this.setData({
        //   paraList: paralist,
        //   firstAdding: false,
        //   Adding: false,
        //   Adding2: true,
        // })
      }
    });
  },
  onShow: function (options) {
    if (wx.getStorageSync('islogin') == 0) {
      wx.showModal({
        title: '请先登录',
        icon: 'loading',
        duration: 2000,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../logs/logs',
            })
          } else if (res.cancel) {
            wx.redirectTo({
              url: '../find/find',
            })
          }
        }
      })
    } else {
      this.setData({
        dates: util.formatTime(new Date)
      })
      // console.log(util.formatTime(new Date))
      
    }
  },
  addText:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../fabu_niao_name/index?index=' + index,
    })
  },
  addText1: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../fabu_niao_name/index?index=' + index,
    })
  },
  oninput:function(e){
    var index = e.currentTarget.dataset.index;
    var paralist = this.data.paraList
    paralist[index].niao_name = e.detail.value 
    // console.log(paralist[index].niao_name)
    this.setData({
      paraList: paralist
    })
  },
  onBindBlur: function (event) {
    var text = event.detail.value;
    // console.log(text);
    this.setData({
      bigTitle: text
    })
  },
  fabu:function(){
    var that = this;
    if (that.data.bigTitle==''){
      wx.showModal({
        title: "请输入标题",
        icon: 'loading',
        duration: 2000,
        success: function () {

        }
      })
    }else{
      var articleBody = []
      var postList = []
      for (var i=0;i<that.data.paraList.length;i++){
        var data = {
          'aid':  that.data.paraList[i].aid,
          'csp_code': that.data.paraList[i].csp_code,
          'imgTag': that.data.paraList[i].imgTag,
          'isImg': that.data.paraList[i].isImg,
          'isNewAid': that.data.paraList[i].isNewAid||0,
          'message': that.data.paraList[i].text || that.data.paraList[i].message,
        }
        postList.push(data)
        // console.log(postList)
        // articleBody.postList.push({data})
        articleBody = [{ postList: postList, 'pid': that.data.pid || ''}]
      }
      console.log(articleBody)
      articleBody = JSON.stringify(articleBody)
      var birdInfo = []
      for (var i = 0; i < that.data.niao_info.length;i++){
        var data = {
          'csp_code': that.data.niao_info[i].csp_code,
          'num': that.data.niao_info[i].niao_num || that.data.niao_info[i].num,
        }
        birdInfo.push(data)
      }
      console.log(birdInfo)
      birdInfo = JSON.stringify(birdInfo)
      var _data = { 
        'tid': that.data.tid || '',
        'title': that.data.bigTitle, 
        'uid': wx.getStorageSync('uid'),
        'observeTime': that.data.dates,
        'locale': that.data.position.name || that.data.address,
        'lng': that.data.position.longitude || that.data.location.lng,  
        'lat': that.data.position.latitude || that.data.location.lat,  
        'imgUrl': that.data.top_img,
        'imgId': that.data.imgId||'',
        'environmentId': that.data.shengjingid,
        'birdInfo': birdInfo,
        'articleBody': articleBody
      }
      console.log(_data)
      wx.request({
        url: 'https://xcxu.birdfans.com/source/xcxbirdapi/article/index.php?cmd=saveBirdArticle',
        data: _data,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (result) {
          console.log(result.data)
          // console.log(that.data.images)
          wx.showModal({
            title: "发布成功",
            icon: 'loading',
            duration: 2000,
            success: function () {
              wx.redirectTo({
                url:'../my/my',
              })
            }
          })
        }
      })
    }
    
  }
})
