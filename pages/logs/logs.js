//logs.js
const util = require('../../utils/util.js')


wx.cloud.init({
  env: 'lz-yumi-721521'
})
const testDB = wx.cloud.database({
  env: 'lz-yumi-721521'
})
Page({
  data: {
    
    logs: []
  },
  onLoad: function () {
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'lz_yumi',
      // 传给云函数的参数
      data: {
        a: 12,
        b: 19,
      },
      // 成功回调
      success: data=>{
        console.log(data.result)
        testDB.collection('lz_yumi_db').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            description: "第一个",
            due: new Date(),
            tags: [
              data.result.openId,
              data.result.sum,
            ],
            // 为待办事项添加一个地理位置（113°E，23°N）
            location: new testDB.Geo.Point(113, 23),
            done: false
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
           // console.log(res)
          },
          fail: console.error
        })
      },
      file: data => {
        console.log(data.result)
      },
      // complete:data=>{
      //   console.log(data.result)
      // }
    }),
    testDB.collection("lz_yumi_db").where({
      _id: "W5vIYWt09mnjE1Jn"
    }).get({
      success: data => {
        console.log(data)
      }
    });
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'lz_yumi_db_data',
      // 成功回调
      success: data => {
        console.log(data)
        console.log(data.result.data.length)
      }
    }),




    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
