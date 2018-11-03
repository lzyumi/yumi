//index.js
//获取应用实例
const app = getApp()
var bmap = require('../libs/bmap-wx.js'); 
Page({
  data: {
    weatherData: '',
    motto: 'ppp',
    userInfo:123,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  yummi:function(){
    wx.navigateTo({
      url: '../yumi/yummi', 
    })
  },
  onLoad: function () {
    wx.getSetting({
      success: res => {
    if (res.authSetting['scope.userInfo']) {
      console.log(1)
    }
      }
      })
    // if (app.globalData.userInfo) {
    //   console.log(1)
      
    //   this.setData({
    //     userInfo: { avatarUrl: "http://img1.imgtn.bdimg.com/it/u=3103050016,2356501630&fm=214&gp=0.jpg", nickName:"少年"} ,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   console.log(2)
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: { avatarUrl: "http://img1.imgtn.bdimg.com/it/u=3103050016,2356501630&fm=214&gp=0.jpg", nickName: "少年" },
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       console.log(3)
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
            
    //         userInfo: { avatarUrl: "http://img1.imgtn.bdimg.com/it/u=3103050016,2356501630&fm=214&gp=0.jpg", nickName: "少年" },
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // };
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'qfknv7Dxmp8dxYGL9kLIanZaSPn0ohQV'
    });
    var fail = function (data) {
      // console.log(data)
    };
    var success = data=>{
      var weatherData = data.currentWeather[0];
      // console.log(weatherData)
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    }); 
  },
  //用户信息
  getUserInfo: function(e) {

    wx.getUserInfo({
      lang: "zh_CN",
      withCredentials: false,
      success: data => {
        console.log(data.userInfo)
        this.setData({
          userInfo: {
            avatarUrl: data.userInfo.avatarUrl,
            nickName: data.userInfo.nickName
          }, 
          hasUserInfo: true
        });
        // var info: {"avatarUrl":         "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIJn5gIjssjwh5tkYktqDjOwbMV80bp0hY5yV0e5vgtDnQZ21AwbDvV7c5QetPa4CicibURB8CSZic7w/132", 
        //             "city": "开封", 
        //             "country":"中国",
        //             "gender":1,
        //             "language":"zh_CN",
        //             "nickName":"Career",
        //             "province":"河南"
        // };
        wx.cloud.callFunction({
          name: "lz_yumi",
          data: {
            info: {
              "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIJn5gIjssjwh5tkYktqDjOwbMV80bp0hY5yV0e5vgtDnQZ21AwbDvV7c5QetPa4CicibURB8CSZic7w/132",
              "city": "开封",
              "country": "中国",
              "gender": 1,
              "language": "zh_CN",
              "nickName": "Career",
              "province": "河南"
            },
            code: 721521
          },
          success: data => {
            //根据openId存库

            wx.setStorageSync('openId', data.result.openId);
          },
          fail: data => {
            console.log(data)
          },
        });
      }
    })
  },
  index: function () {
    this.setData({
      yume: 'none',
      index: 'block',
    })
  },
  yume: function () {
    this.setData({
      yume: 'block',
      index: 'none',
    })
  },
  onShareAppMessage: function () {

    return {

      title: '查看天气预报吧',

      desc: '多关注一下天气状况，方便出行',

      path: '/indx/indx'

    }

  }
})
