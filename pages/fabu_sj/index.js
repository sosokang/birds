
Page({
  data: {
    
    shengjing_str:[],
  },
  onclick_sj: function (e) {
    // console.log(e.currentTarget.dataset.sj)
    // console.log(e.currentTarget.dataset.num)
    let data1 = e.currentTarget.dataset;
    let check = this.data.shengjing_str;
    check[data1.num].checked = true
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一级页面
    // 直接调用上一级页面Page对象，存储数据到上一级页面中
    prevPage.setData({
      'shengjing': e.currentTarget.dataset.sj,
      'shengjingid': e.currentTarget.dataset.id,
    });
    this.setData({
      shengjing_str: check
      // checked: { checked.name}
    })
    setTimeout(function(){
        wx.navigateBack()
    },800)
  },
  onLoad: function (a) {
    var that = this
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=environmentList',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data)
        var shengjing = result.data.data
        for (var i = 0; i < shengjing.length;i++){
          shengjing[i].checked=false
        }
        that.setData({
          shengjing_str: shengjing
        })
        // console.log(that.data.shengjing_str)
      }
    })
  },
  onReady: function () {
    // wx.setNavigationBarTitle({
    //   title: "生态环境"
    // });
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { }
});