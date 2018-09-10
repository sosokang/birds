
Page({
  data: {
    position:''
  },
  oninput: function (e) {
    // console.log(e.detail.value)
  },
  onconfirm:function(e){
    // console.log()
    var str = e.detail.value
    var index = this.data.index+1
    wx.navigateBack()
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一级页面
    // 直接调用上一级页面Page对象，存储数据到上一级页面中
    prevPage.data.paraList.splice(index, 0, { text: str, isImg: 0})
    var paralist = prevPage.data.paraList
    for (var i = 0; i < paralist.length; i++) {
      paralist[i].adding = false
    }
    prevPage.setData({
      paraList: paralist,
      firstAdding: false,
      Adding: false,
      Adding2: true,
    });
  },
  onLoad: function (a) {
    this.setData({
      index:a.index
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