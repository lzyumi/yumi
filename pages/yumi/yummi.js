

var yumi = { yumi: 'career' };
Page({
  data: yumi,
  onLoad: function () {

    //console.log(yumi)
    // this.setData({
    //   yumi,
    // })
    var cal = '';
    for (var i = 1; i < 10; i++) {
      var cals = '';
      for (var k = i; k <= 10; k++) {
        cals += "\t"
      }
      cal += cals;
      for (var j = 1; j <= i; j++) {

        cal += i * j + "\t\t";
      }
      cal += "\n"
    }
    this.setData({
      cals: cal,
    })
  },


})