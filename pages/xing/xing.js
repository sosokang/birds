// pages/xing/xing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    daxiao:[
      { img: 'da1', text: "0-30", width: "62", height: '56', left: '44', length_code:101},
      { img: 'da2', text: "30-60", width: "106", height: '84', left: '22',length_code: 102},
      { img: 'da3', text: "60-90", width: "114", height: '124', left: '18', length_code:103},
      { img: 'da4', text: ">90", width: "114", height: '178', left: '18', length_code: 104},
    ],
    tixing:[
      { img: 'xing13', name: "燕子形", shape_code:"201"},
      { img: 'xing11', name: "喜鹊形", shape_code: "202"},
      { img: 'xing9', name: "山雀形", shape_code: "203"},
      { img: 'xing16', name: "啄木鸟形", shape_code: "204"},
      { img: 'xing6', name: "麻雀形", shape_code: "205"},
      { img: 'xing2', name: "海鸥形", shape_code: "206"},
      { img: 'xing10', name: "天鹅形", shape_code: "207"},
      { img: 'xing5', name: "鸡形", shape_code: "208"},
      { img: 'xing12', name: "鸭子形", shape_code: "209"},
      { img: 'xing14', name: "鹦鹉形", shape_code: "210"},
      { img: 'xing1', name: "鸽子形", shape_code: "211"},
      { img: 'xing7', name: "猫头鹰形", shape_code: "212"},
      { img: 'xing15', name: "鹰形", shape_code: "213"},
      { img: 'xing3', name: "鹤形", shape_code: "214"},
      { img: 'xing4', name: "鸻鹬形", shape_code: "215"},
      { img: 'xing8', name: "其他", shape_code: "2400"},
    ],
    zuiba:[
      { img: 'zui4_1', name: " ≤1比3", bill_code:'401'},
      { img: 'zui5_1', name: " ≤1比2", bill_code: '402'},
      { img: 'zui3_1', name: " ≤1比1", bill_code: '403'},
      { img: 'zui1_1', name: " ≤2比1", bill_code: '404' },
      { img: 'zui2_1', name: " >2比1", bill_code: '405'},
      { img: '', name: " " },
    ],
    yanse:[
      { img: 'se1_2', name: " 黑色", color_code:'301'},
      { img: 'se2_2', name: " 灰色", color_code: '302' },
      { img: 'se3_2', name: " 白色", color_code: '303' },
      { img: 'se4_2', name: " 红色", color_code: '304' },
      { img: 'se5_2', name: " 黄色", color_code: '305' },
      { img: 'se6_2', name: " 褐色", color_code: '306' },
      { img: 'se7_2', name: " 绿色", color_code: '307' },
      { img: 'se8_2', name: " 蓝色", color_code: '308' },
      { img: 'se9_2', name: " 棕色", color_code: '309' },
    ],
    next:'',
    length_code:'',
    shape_code:'',
    color_code:'',
    bill_code:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  daxiao:function(e){
    var index = e.currentTarget.dataset.index;
    // console.log(index)
    var daxiao = this.data.daxiao;
    daxiao=[
      { img: 'da1', text: "0-30", width: "62", height: '56', left: '44', length_code: "101" },
      { img: 'da2', text: "30-60", width: "106", height: '84', left: '22', length_code: "102" },
      { img: 'da3', text: "60-90", width: "114", height: '124', left: '18', length_code: "103" },
      { img: 'da4', text: ">90", width: "114", height: '178', left: '18', length_code: "104" },
    ]
    daxiao[index].img = daxiao[index].img+'_1';
    daxiao[index].color = '7faf41';
    daxiao[index].zindex = '2';
    // console.log(daxiao[index].length_code)
    this.setData({
      length_code: daxiao[index].length_code,
      daxiao: daxiao
    })
  },
  daxiao_submit:function() {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=displayShape',
      data: {
        length_code: that.data.length_code
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data.data)
        var tixing = that.data.tixing;
        for (var i = 0; i < result.data.data.shape_code.length;i++){
          for (var j = 0; j < tixing.length; j++) {
            if (tixing[j].shape_code == result.data.data.shape_code[i]) {
              // console.log(j)
              // console.log(that.data.tixing[j])
              tixing[j].img = tixing[j].img+'_2';
              tixing[j].isclick=true
            }
          }
        }
        that.setData({
          page:2,
          tixing: tixing
        })
        // console.log(result.data.data.img)

      }
    })
  },
  tixing: function (e) {
    var index = e.currentTarget.dataset.index;
    var tixing = this.data.tixing;
    if (this.data.next != '') {
      tixing[this.data.next].img = tixing[this.data.next].img.split('_')[0] + '_2';
    } 
    tixing[index].img = tixing[index].img.split('_')[0] + '_1';
    this.setData({
      next:index,
      shape_code: tixing[index].shape_code,
      tixing: tixing
    })
  },
  tixing_submit: function () {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=displayColor',
      data: {
        shape_code: that.data.shape_code,
        length_code: that.data.length_code
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data.data)
        var yanse = that.data.yanse;
        for (var i = 0; i < result.data.data.color_code.length; i++) {
          for (var j = 0; j < yanse.length; j++) {
            if (yanse[j].color_code == result.data.data.color_code[i]) {
              // console.log(j)
              // console.log(that.data.tixing[j])
              yanse[j].img = yanse[j].img.slice(0, 3);
              yanse[j].isclick = true
            }
          }
        }
        that.setData({
          page: 3,
          yanse: yanse,
          next:''
        })
        // console.log(result.data.data.img)

      }
    })
  },
  zuiba: function (e) {
    var index = e.currentTarget.dataset.index;
    var zuiba = this.data.zuiba;
    if (this.data.next != '') {
      zuiba[this.data.next].img = zuiba[this.data.next].img.slice(0, 4);
    } 
    zuiba[index].img = zuiba[index].img.slice(0,4) + '_2';
    this.setData({
      next: index,
      bill_code: zuiba[index].bill_code,
      zuiba: zuiba
    })
  },
  yanse:function(e) {
    var index = e.currentTarget.dataset.index;
    var yanse = this.data.yanse;
    if (this.data.next!=''){
      yanse[this.data.next].img = yanse[this.data.next].img.slice(0, 3);
    } 
    yanse[index].img = yanse[index].img.slice(0, 3) + '_1';
    this.setData({
      next:index,
      color_code: yanse[index].color_code,
      yanse: yanse
    })
  },
  yanse_submit: function () {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=displayBill',
      data: {
        shape_code: that.data.shape_code,
        length_code: that.data.length_code,
        color_code: that.data.color_code
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(result.data.data)
        var zuiba = that.data.zuiba;
        for (var i = 0; i < result.data.data.bill_code.length; i++) {
          for (var j = 0; j < zuiba.length; j++) {
            if (zuiba[j].bill_code == result.data.data.bill_code[i]) {
              // console.log(j)
              // console.log(that.data.tixing[j])
              zuiba[j].img = zuiba[i].img.slice(0, 4);
              zuiba[j].isclick = true
            }
          }
        }
        that.setData({
          page: 4,
          zuiba: zuiba,
          next: ''
        })
        // console.log(result.data.data.img)
      }
    })
  },
  zuiba_submit: function () {
    var that = this;
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=searchBirdByShape',
      data: {
        shape_code: that.data.shape_code,
        length_code: that.data.length_code,
        color_code: that.data.color_code,
        bill_code: that.data.bill_code,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        // console.log(a)
        that.setData({
          niao_list: result.data.data,
          page: 5,
        })
        // console.log(result.data.data.img)
      }
    })
  },
  xuan_niao: function (e) {
    var csp_code = e.currentTarget.dataset.csp_code
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
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