
Page({
  data: {
    isok:0
  },
  
  xuan_niao: function (e) {
    var csp_code = e.currentTarget.dataset.csp_code
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
    })
  },
  onLoad: function (a) {
    var keywords = a.keywords
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/home/index.php?cmd=searchBird',
      data: {
        keywords: keywords,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data.data)
        if(result.data.data==''){
          wx.showModal({
            title: "没有查询到相关鸟种",
            icon: 'loading',
            duration: 2000,
            success: function () {

            }
          })
        }else{
          that.setData({
            niao_list: result.data.data
          })
        }
       
        // console.log(that.data.images)
      }
    }); 
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "位置"
    });
  },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { }
});