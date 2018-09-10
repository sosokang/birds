var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    url: '',
    listData: [
     
    ],
    dingwei:'',
    scale: '15',
    Height: '0',
    controls: '40',
    latitude: '',
    longitude: '',
    display:'none',
    markers: [],
    fanwei:'5000',
    current_position:'北京',
    mapLaclNum:1,
    market:[]
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map')
  },
  xuan_niao: function (e) {
    var csp_code = e.currentTarget.dataset.csp_code
    wx.navigateTo({
      url: '../detail/detail?csp_code=' + csp_code,
    })
  },
  //点击merkers  
  markertap(e) {
    // console.log(this.data.markers)
    // console.log(e.markerId)
    var position={};
    for (var i = 0; i < this.data.markers.length;i++){
      if (this.data.markers[i].id == e.markerId){
        position = this.data.markers[i]
      }
    }
    // console.log(position)
    var that = this
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=getBirdListByGps',
      data: {
        lng: position.longitude,
        lat: position.latitude,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        console.log(result.data.data)
        that.setData({
          niao_list: result.data.data,
          display:'flex'
        })
      }
    })
    // wx.showActionSheet({
    //   itemList: [e.markerId],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
  }, 
  hide:function(){
    this.setData({
      display:'none'
    })
  },
  gongli:function(e){
    // console.log(e.currentTarget.dataset.gongli);
    this.setData({
      fanwei: e.currentTarget.dataset.gongli,
      scale: e.currentTarget.dataset.scale
    })
    let that = this; 
    wx.request({
      url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=getBirdPoint',
      data: {
        lng: that.data.longitude,
        lat: that.data.latitude,
        raidus: that.data.fanwei
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (result) {
        that.setData({
          listData: result.data.data,
          markers: that.getSchoolMarkers(result.data.data),
        })
      }
    })
  },
  sousuo_box:function(){
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        var longitude = res.longitude;
        var latitude = res.latitude;
        that.loadCity(longitude, latitude)
        // 
        that.mapCtx.includePoints({
          padding: [10],
          points: [{
            latitude: res.latitude,
            longitude: res.longitude,
          }, {
              latitude: res.latitude,
              longitude: res.longitude,
          }]
        })  
        that.setData({
          scale: 15,
          longitude: res.longitude,
          latitude: res.latitude
        })
        // console.log(111)
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=getBirdPoint',
          data: {
            lng: res.longitude,
            lat: res.latitude,
            raidus: that.data.fanwei
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (result) {
            // console(result.data)
            that.setData({
              listData: result.data.data,
              markers: that.getSchoolMarkers(result.data.data),
            })
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }, 
  sousuo_box1:function(){
    wx.navigateTo({
      url: '../findSearch/findSearch',
    })
  },
  onLoad: function (options) {
    app.editTabBar(this);//添加tabBar数据
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'JE5BZ-PDLCD-HMH4X-HYXP6-EQEN3-PJFFB'
    });
    that.setData({
      // url: app.globalData.url
    })
    var data = JSON.stringify({
      page: 1,
      pageSize: 10,
      request: {
        placeLongitude: app.globalData.longitude,
        placeLatitude: app.globalData.latitude,
        userId: app.globalData.userId
      }
    })
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        // console.log(res)
        var longitude = res.longitude;
        var latitude = res.latitude;
        that.loadCity(longitude, latitude)
        wx.request({
          url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=getBirdPoint',
          data: {
            lng: res.longitude,
            lat: res.latitude,
            raidus: that.data.fanwei
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (result) {
            // console.log(result.data)
            that.setData({
              listData: result.data.data,
              markers: that.getSchoolMarkers(result.data.data),
            })
            
            // console.log(that.data.listData)
          }
        })
        that.setData({
          scale: 15,
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        // console.log(res)
        that.setData({
          view: {
            Height: res.windowHeight-(120/(750/res.windowWidth))
          },

        })
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=JE5BZ-PDLCD-HMH4X-HYXP6-EQEN3-PJFFB&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success
        // console.log(res);
        if (res.data.status==0){
          var city = res.data.result.address_component.city;
          var address = res.data.result.address;

          var location = res.data.result.location;
          wx.setStorageSync('address', address)
          wx.setStorageSync('location', location)
          page.setData({dingwei: city });
        }
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // controltap(e) {
  //   var that = this;
  //   console.log("scale===" + this.data.scale)
  //   if (e.controlId === 1) {
  //     that.setData({
  //       scale: --this.data.scale
  //     })
  //   } else {
  //     that.setData({
  //       scale: ++this.data.scale
  //     })
  //   }
  // },  
  getSchoolMarkers(result) {
    // console.log(result)
    let that = this;
    var market = [];
    for (let item of result) {
      let marker1 = that.createMarker(item);
      market.push(marker1)
    }
    // that.shujufunction(marker1)
    return market;
    // console.log(market)
   
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  mapChange: function (e) {
    var that = this;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var mapLaclNum = that.data.mapLaclNum;
    if (mapLaclNum > 2) {
      return;
    }
    // console.log(11)
    mapLaclNum++;
    if (e.type == 'end') {
      // console.log(22)
      // that.mapCtx = wx.createMapContext("map");
      that.mapCtx.getCenterLocation({
        success: function (res) {
          if ((res.latitude == latitude && res.longitude == longitude)) {
            return;
          }
          // console.log(11)
          // console.log(res)
          var tmpLatitude = res.longitude;
          var tmpLongitude = res.latitude;
          that.loadCity(tmpLatitude, tmpLongitude)
          that.setData({
            longitude: res.longitude
            , latitude: res.latitude,
            mapLaclNum: mapLaclNum,
            // markers: []
          })
          wx.request({
            url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=getBirdPoint',
            data: {
              lng: res.longitude,
              lat: res.latitude,
              raidus: that.data.fanwei
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (result) {
              // console(222322)
              that.setData({
                listData: result.data.data,
                markers: that.getSchoolMarkers(result.data.data),
              })
            }
          })
        }
      })
    } else if (e.type == "begin") {
      that.setData({
        mapLaclNum: 0,
      })
    }
  },
  // regionchange: function (e) {
  //   // console.log(1111)
  //   var that = this;
  //   var latitude = that.data.latitude;
  //   var longitude = that.data.longitude;
  //   var mapLaclNum = that.data.mapLaclNum;
  //   if (mapLaclNum > 2) {
  //     console.log(mapLaclNum)
  //     return;
  //   } 
  //   mapLaclNum++;
    
  //   if (e.type == 'end') {
  //     console.log(mapLaclNum)
  //     that.mapCtx = wx.createMapContext("map");
  //     that.mapCtx.getCenterLocation({
  //       success: function (res) {
  //         var tmpLatitude = res.longitude;
  //         var tmpLongitude = res.latitude;
  //         that.loadCity(tmpLatitude, tmpLatitude)
  //         that.setData({
  //           markers: []
  //         })
  //         // console.log(res)
  //         wx.request({
  //           url: 'https://xcxu.birdfans.com/source/xcxbirdapi/bird/index.php?cmd=getBirdPoint',
  //           data: {
  //             lng: res.longitude,
  //             lat: res.latitude,
  //             raidus: that.data.fanwei
  //           },
  //           method: "POST",
  //           header: {
  //             'content-type': 'application/x-www-form-urlencoded'
  //           },
  //           success: function (result) {
  //             // console(222322)
  //             that.setData({
  //               listData: result.data.data,
  //               markers: that.getSchoolMarkers(result.data.data),
  //             })
  //           }
  //         })
  //         that.setData({
  //           longitude: res.longitude, 
  //           latitude: res.latitude,
  //           mapLaclNum: mapLaclNum
  //         })
  //       }
  //     })
  //   } else if (e.type == "begin") {
  //     console.log(mapLaclNum)
  //     that.setData({
  //       mapLaclNum: 0,
  //     })
  //   }
  // },
  strSub: function (a) {
    var str = a.split(".")[1];
    str = str.substring(0, str.length - 1)
    return a.split(".")[0] + '.' + str;
  },
  createMarker(point) {
    // console.log(point.birdCount)
    let latitude = this.strSub(point.lat);
    let longitude = point.lng;
    let marker = {
      iconPath: '../../img/sub_bird_naved1.png',
      id: point.id || 0,
      name:'',
      title:'',
      latitude: latitude,
      longitude: longitude,
      label: {
        x: 14,
        y: -60,
        color:'#ffffff',
        bgColor:'#3ed8c0',
        fontSize:12,
        borderRadius:100,
        padding: 5,
        display: "ALWAYS",
        content: point.birdCount,
        zIndex:9
      },
      width: 50,
      height: 50
    };
    // console.log(marker)
    return marker;
  }
})