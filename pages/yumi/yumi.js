
var app = getApp();
var yumi = {yumi:'carrer'};
Page({
  data: yumi,
  onLoad: function () {
    console.log(app.globalData.yumiUserInfo);
    //console.log(yumi)
    // this.setData({
    //   yumi,
    // })
    var cal='';
    for (var i = 1; i < 10; i++) {
      var cals='';
      for (var k = i; k <= 10; k++) {
        cals += "\t"
      }
      cal+=cals;
      for (var j=1; j <=i; j++) {

        cal += i * j +"\t\t";
      }
      cal+="\n"
    }

    console.log(cal)    
    this.setData({
      cal: cal, cals: cal,
    })
  },

  
})