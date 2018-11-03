// pages/games/game.js
let i = 0;
let j;
let timers;
let caiquan = ["../images/shitou.png", "../images/jiandao.png", "../images/bu.png"];
let jieguo;
let jieguoPic;
let manColor;
let manScode;
let heColor;
let heScode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caiquan: caiquan,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      chuquan:'../images/yumi-d.png',
      bgImg: true,
      flag: true,
      heColor: 'red',
      manColor: 'green',
      heScode: '敌方',
      manScode: '我方',
      heNum:73,
      manNum:73,
      cqa:false,
    });
    this.timerr(this);
  },
  
  start: function () {
    //什么时候触发倒计时，就在什么地方调用这个函数
    //this.timerr(this);
  },
  /**
    * 暂停倒计时
   */
  stop: function (event) {
    this.setData({
      chuquan: event.target.dataset.chuquan,
    })
    this.show(event.target.dataset.man);
  },
  timerr: function (that) {
    
    timers = setInterval(function () {
      that.setData({
        biquan: caiquan[i],
      })
      j=i;
      i++;
      if (i == 3) {
        i = 0;
      };
      i = i;
    }, 100);
  },
  /**
   * 弹出层函数
   */
  //出现
  show: function (man) {
    //man选手出的，进系统出的，判断
    if(man==0){
      if (j == 0) {
        jieguo = '平局，运气还行😁';
        jieguoPic = '../images/ping.png';
        heScode = '双方和局！！';
        manScode = '双方和局！！'
      } else if (j == 1) {
        jieguo = '胜利啦😀！！！'; 
        jieguoPic = '../images/succeed.png';
        heColor='red';
        manColor = 'green';
        manScode = '我方胜利！！！';
        heScode = '惨败！'
      } else {
        jieguo = '失败咯😭',
        jieguoPic = '../images/fail.png';
        manColor = 'red';
        heColor = 'green';
        heScode = '敌方胜利！！！';
        manScode = '我方惨败！'
      }
    } else if (man == 1) {
      if (j == 0) {
        jieguo = '失败咯😭';
        jieguoPic = '../images/fail.png';
        manColor = 'red';
        heColor = 'green';
        heScode = '敌方胜利！！！';
        manScode = '我方惨败！'
      } else if (j == 1) {
        jieguo = '平局，运气还行😁';
        jieguoPic = '../images/ping.png';
        heScode = '双方和局！！';
        manScode = '双方和局！！'
      } else {
        jieguo = '胜利啦😀！！！';
        jieguoPic = '../images/succeed.png';
        heColor = 'red';
        manColor = 'green';
        manScode = '我方胜利！！！';
        heScode = '敌方惨败！'
      }
    } else{
      if (j == 0) {
        jieguo = '胜利啦😀！！！';
        jieguoPic = '../images/succeed.png';
        heColor = 'red';
        manColor = 'green';
        manScode ='我方胜利！！！';
        heScode='敌方惨败！'
      } else if (j == 1) {
        jieguo = '失败咯😭';
        jieguoPic = '../images/fail.png';
        manColor = 'red';
        heColor = 'green';
        heScode = '敌方胜利！！！';
        manScode = '我方惨败！'
      } else {
        jieguo = '平局，运气还行😁';
        jieguoPic = '../images/ping.png';
        heScode = '双方和局！！';
        manScode = '双方和局！！'
      }
    } 

    this.setData({
      flag: false,
      jieguo: jieguo,
      jieguoPic: jieguoPic, 
      bgImg: false,
      heColor: heColor,
      manColor: manColor,
      manScode: manScode,
      heScode: heScode,
      heNum: 15,
      manNum: 73,
      manNum: 15,
      cqa: true,
    })
    clearInterval(timers);
  },
  //消失

  hide: function () {
    let that=this;
    that.setData({ 
      flag: true ,    
      bgImg: true,
    });
    clearInterval(timers);
    that.setData({
      i: 0,
      chuquan: '../images/yumi-d.png',
      heColor: 'red',
      manColor: 'green',
      manScode: '',
      heScode: '',
      heNum: 73,
      manNum: 73,
      heScode: '敌方',
      manScode: '我方',
      cqa: false,
    })
    that.timerr(that);
    i=0;
  },
});
