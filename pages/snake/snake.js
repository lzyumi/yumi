var startX = 0;
var startY = 0;
var moveX = 0;
var moveY = 0;
//移动位置和开始位置的坐标差值
var X = 0;
var Y = 0; 
var that;
//蛇头的对象
var snakeHead = {
  x: 0,
  y: 0,
  color: "green",
  w: 20,
  h: 20
}
//蛇身对象数据
var snakeArr = [];
//方向
var direction = "right";
var directio = null;
//食物数组
var foodArr = [];
//窗口宽高
var windowWidth = 0;
var windowHeight = 0;
//撞上为true
var bool = true;
//记录吃的食物数
var foodNum = 0;
var res = wx.getSystemInfoSync()
windowWidth = res.windowWidth;
windowHeight = (res.windowHeight)*0.9;
Page({
  data: {
    x: 0,
    y: 0,
    hidden: true
  },
  snakeStart: function (e) {
      startX = e.touches[0].x;
      startY = e.touches[0].y;
  },
  snakeMove: function (e) {
    moveX = e.touches[0].x;
    moveY = e.touches[0].y;
    X = moveX - startX;
    Y = moveY - startY;
    console.log(Y+"==="+X)
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      directio = "right"
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      directio = "left"
    } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
      directio = "bottom"
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
      directio = "top"
    }
    direction = directio;
  },
  snakeEnd: function (e) {
    this.setData({
      hidden: true,
    });
  },
  onReady: function (){
    that=this;
    //获取画布上下文
    var context = wx.createCanvasContext("snakCanvas", this);
    //帧数
    var num = 0;
    function draw(obj) {
      context.drawImage("../images/xiaohai.png", obj.x, obj.y, obj.w, obj.h);
      context.beginPath();
      //关闭路径
      context.closePath();
      //填充
      context.fill();
    };
    function drawBody(obj) {
      context.drawImage("../images/chi.png", obj.x, obj.y, obj.w, obj.h);
      context.beginPath();
      //关闭路径
      context.closePath();
      //填充
      context.fill();
    };
    function drawFond(obj) {
      context.setFillStyle();
      context.drawImage(obj.color, obj.x, obj.y, obj.w, obj.h);
      context.beginPath();
      //关闭路径
      context.closePath();
      //填充
      context.fill();
    };
    function animation() {
      if (num == 1) {
        console.log(bool)
      }
      if (num % 10 == 0) {
        //向蛇身体添加最新的位置

        snakeArr.push({
          x: snakeHead.x,
          y: snakeHead.y,
          w: 20,
          h: 20,
          color: "#00ff00"
        });

        if (snakeArr.length > foodNum) {
          snakeArr.shift()
        }
        switch (direction) {
          case "right":
            snakeHead.x += snakeHead.w;
            if (Math.abs(snakeHead.x) >= windowWidth && snakeHead.x > 0) {
              snakeHead.x = 0;
              snakeHead.y = 0;
              context.clearRect(0, 0, res.windowWidth, (res.windowHeight) * 0.9);
              foodArr = [];
              snakeArr = [];
              direction = "right";
              that.show(foodNum);
              foodNum = 0;
              return;
            }
            break;
          case "left":
            snakeHead.x -= snakeHead.w;
            if (Math.abs(snakeHead.x + 20) == 0) {
              //snakeHead.x = windowWidth;
              snakeHead.x = 0;
              snakeHead.y = 0;
              context.clearRect(0, 0, res.windowWidth, (res.windowHeight) * 0.9);
              foodArr = [];
              snakeArr = [];
              direction = "right";
              that.show(foodNum);
              foodNum = 0;
              return;
            }
            break;
          case "top":
            snakeHead.y -= snakeHead.h;
            if (snakeHead.y < 0) {//snakeHead.y + 20 <= 0
              //snakeHead.y = windowHeight;
              snakeHead.x = 0;
              snakeHead.y = 0;
              context.clearRect(0, 0, res.windowWidth, (res.windowHeight) * 0.9);
              foodArr = [];
              snakeArr = [];
              direction = "right";
              Y = 0;
              that.show(foodNum);
              console.log(9)
              foodNum = 0;
              return;
            }
            console.log(windowHeight)
            console.log(snakeHead.y)
            break;
          case "bottom":
            snakeHead.y += snakeHead.h;
            if (snakeHead.y >= windowHeight) {
              //snakeHead.y = 0;
              snakeHead.x = 0;
              snakeHead.y = 0;
              context.clearRect(0, 0, res.windowWidth, (res.windowHeight) * 0.9);
              foodArr = [];
              snakeArr = [];
              direction = "right";
              that.show(foodNum);
              foodNum = 0;
              return;
            }

            break;
        }

      }
      num++;
      //绘制蛇头
      draw(snakeHead);

      //绘制蛇身
      for (var i = 0; i < snakeArr.length; i++) {
        var snake = snakeArr[i]
        drawBody(snake);
      }
      //绘制食物
      for (var i = 0; i < foodArr.length; i++) {
        var food = foodArr[i];
        drawFond(food);
        if (collide(snakeHead, food)) {
          foodNum++;
          //如果碰到食物,那么该食物就重新随机生成       
          bool = true;
          food.x = rand(0, windowWidth);
          food.y = rand(0, windowHeight);
          food.color = "../images/rou" + rand(7, 1) + ".png";
          var w = rand(10, 20);
          food.w = w;
          food.h = w;
          draw(food);
        } else {
          bool = false;
        }
      }
      var time=1;
      if(foodNum>=5){
        time = foodNum/5+0.3;
      }
      setTimeout(animation, 100 / time)
      wx.drawCanvas({
        canvasId: "snakCanvas",
        actions: context.getActions()
      });
    };
    //食物对象
    function Food() {
      this.x = rand(0, windowWidth);
      this.y = rand(0, windowHeight);
      var w = rand(10, 20);
      this.w = w;
      this.h = w;
      this.color = "../images/rou" + rand(7, 1) + ".png";
    };
    for (var i = 0; i < 10; i++) {
      var food = new Food();
      foodArr.push(food);
    };
    //随机数
    function rand(max, min) {
      return parseInt(Math.random() * (max - min) + min)
    };
    //碰撞函数 obj1蛇 obj2 食物对象
    function collide(obj1, obj2) {
      var l1 = obj1.x;
      var r1 = l1 + obj1.w;
      var t1 = obj1.y;
      var b1 = t1 + obj1.h;
      var l2 = obj2.x;
      var r2 = l2 + obj2.w;
      var t2 = obj2.y;
      var b2 = t2 + obj2.h;
      if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2) {
        return true;
      } else {
        return false;
      }
    }
  animation();
  },
  onLoad: function () {
    this.setData({
      flag: true,
  })
  },
  show: function (num) {
    var title;
    if ((num/6)<=1){
      title ="太少了，也不知道吃饱了没😰"
    } else if ((num / 6) <= 2) {
      title = "有点不理想，但也够你一个人吃的了😏"
    } else if ((num / 6) <= 3) {
      title = "及格啦，这次你应该吃的饱饱的👏"
    } else if ((num / 6) <= 4) {
      title = "哇，好优秀，居然吃了这么多👍"
    } else if ((num / 6) <= 6) {
      title = "不是吧，你真是太棒了，真担心店家会关门🙏"
    } else if ((num / 6) <= 6) {
      title = "这么多，你怎么做到的，可以传授一二么😁"
    } else{
      title = "太厉害了，你已被我平台列为偷吃小能手TOP10!!!"
    }
    this.setData({
      flag: false,
      jieguo:"┗|｀O′|┛ 嗷~~😭😭😭，被警察逮到了，一共偷吃了" + num + "块肉，"+title,
    });
  },
  hide: function () {
    this.setData({
      flag: true,
    });
    wx.redirectTo({
      url: "../yumi/yumii",
    })
  },
  // onPullDownRefresh: function () {
  //   wx.showNavigationBarLoading() //在标题栏中显示加载
  //   setTimeout(function () {
  //     // complete
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     wx.stopPullDownRefresh() //停止下拉刷新
  //   }, 1500);
  // },
})