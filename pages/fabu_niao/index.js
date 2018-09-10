
Page({
  data: {
    position:'',
    niao_list:[]
  },
  oninput: function (e) {
    // console.log(e.detail.value)
  },
  onconfirm:function(e){
    // console.log()
    var str = e.detail.value
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=searchBird',
      data: {
        keywords: str,
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
            success: function () {

            }
          })
        } else {
          that.setData({
            niao_list: result.data.data
          })
        }
        // console.log(that.data.images)
      }
    })
    
  },
  xuan_niao:function(e){
    // console.log(e.currentTarget.dataset.index)
    // var niao_list1 = this.data.niao_list1;
    // wx.setStorageSync('niao_list1', niao_list1.concat(this.data.niao_list[e.currentTarget.dataset.index]))
    // console.log()
    wx.navigateBack()
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一级页面
    // 直接调用上一级页面Page对象，存储数据到上一级页面中
    var niao_info = prevPage.data.niao_info;
    var xinzeng = JSON.stringify(e.currentTarget.dataset.name)
    // console.log(niao_info)
    if (this.data.index !=undefined){
      // console.log('11'+this.data.index)
      var xiangdeng = 0;
      var info = e.currentTarget.dataset
      if (niao_info.length > 0) {
        for (var i = 0; i < niao_info.length; i++) {
          var niao_name = JSON.stringify(niao_info[i].name)
          if (niao_name == xinzeng) {
            // niao_info = niao_info.concat(e.currentTarget.dataset)
            // niao_info.splice(i, 1);
            info=''
            // return
          } else {
            xiangdeng=1
          }
        }
        if(xiangdeng==1){
          if (info==""){

          }else{
            niao_info = niao_info.concat(info)
          }
        }
      } else {
        niao_info = niao_info.concat(e.currentTarget.dataset)
      }
      var paralist = prevPage.data.paraList
      paralist[this.data.index].imgTag = e.currentTarget.dataset.name
      paralist[this.data.index].csp_code = e.currentTarget.dataset.csp_code
      prevPage.setData({
        paraList: paralist,
        niao_info: niao_info,
        xq_display: '1'
      });
    }else{
      var xiangdeng = 0;
      if (niao_info.length > 0) {
        for (var i = 0; i < niao_info.length; i++) {
          var niao_name = JSON.stringify(niao_info[i].name)
          if (niao_name == xinzeng) {
            // niao_info = niao_info.concat(e.currentTarget.dataset)
            // niao_info.splice(i, 1);
            return
          } else {
            xiangdeng = 1
          }
        }
        if (xiangdeng == 1) {
          niao_info = niao_info.concat(e.currentTarget.dataset)
        }
      } else {
        niao_info = niao_info.concat(e.currentTarget.dataset)
      }
      prevPage.setData({
        niao_info: niao_info,
        xq_display: '1'
      });
    }
    
    
  },
  onLoad: function (a) {
    var index = a.index
    var that = this;
    // console.log()
    if (a.niao_list== null){    
    }else{
    // if (JSON.parse(a.niao_list).length > 0){    
      var niao_list = JSON.parse(a.niao_list);
      for(var i=0;i<niao_list.length;i++){
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=searchBird',
          data: {
            keywords: niao_list[i].name || niao_list[i].genus,
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (result) {
            console.log(result.data)
            that.setData({
              niao_list: that.data.niao_list.concat(result.data.data)
            })
            // console.log(that.data.images)
          }
        })
      }
    }
    that.setData({
      index: index
    })
  },
  onReady: function () {
    // wx.setNavigationBarTitle({
    //   title: "位置"
    // });
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { }
});