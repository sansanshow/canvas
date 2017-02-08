/**
 * Created by HX-MG01 on 2017/2/8.
 */
var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_LEFT = 20;
var MARGIN_TOP = 20;
var currShowTimeSeconds;
var endDate = new Date(2017, 1, 8, 18, 0, 0)
var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]
window.onload = function () {
  var canvas = document.getElementById("canvas")
  if (canvas.getContext("2d")) { // 支持
    var context = canvas.getContext("2d")
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    // render(context)
    currShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function () {
      render(context);
      update();
    }, 50)
  } else {
    alert("当前浏览器不支持canvas，请更换浏览器重试")
  }
}

function update() {
  var nextShowTimeSeconds = getCurrentShowTimeSeconds()
  var nextHours = parseInt(nextShowTimeSeconds / 3600)
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
  var nextSeconds = parseInt(nextShowTimeSeconds % 60)

  var currHours = parseInt(currShowTimeSeconds / 3600)
  var currMinutes = parseInt((currShowTimeSeconds - currHours * 3600) / 60)
  var currSeconds = parseInt(currShowTimeSeconds % 60)
  if (nextSeconds != currSeconds) {

    if (parseInt(nextSeconds % 10) != parseInt(currSeconds % 10)) {
      addBall(MARGIN_LEFT + (5 * 15 + 9 * 2) * (RADIUS + 1), MARGIN_TOP, parseInt(currSeconds % 10))
    }
    if (parseInt(nextSeconds / 10) != parseInt(currSeconds / 10)) {
      addBall(MARGIN_LEFT + (4 * 15 + 9 * 2) * (RADIUS + 1), MARGIN_TOP, parseInt(currSeconds / 10))
    }
    if (parseInt(nextMinutes % 10) != parseInt(currMinutes % 10)) {
      addBall(MARGIN_LEFT + (3 * 15 + 9) * (RADIUS + 1), MARGIN_TOP, parseInt(currMinutes % 10))
    }
    if (parseInt(nextMinutes / 10) != parseInt(currMinutes / 10)) {
      addBall(MARGIN_LEFT + (2 * 15 + 9) * (RADIUS + 1), MARGIN_TOP, parseInt(currMinutes / 10))
    }
    if (parseInt(nextHours % 10) != parseInt(currHours % 10)) {
      addBall(MARGIN_LEFT + 1 * 15 * (RADIUS + 1), MARGIN_TOP, parseInt(currHours % 10))
    }
    if (parseInt(nextHours / 10) != parseInt(currHours / 10)) {
      addBall(MARGIN_LEFT, MARGIN_TOP, parseInt(currHours / 10))
    }
    currShowTimeSeconds = nextShowTimeSeconds;
  }
  updateBalls();
}

function addBall(x, y, num) {
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        var aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        balls.push(aBall)
      }

    }
  }
}

function updateBalls() {
  for (var i = 0; i < balls.length; i++) {

    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= CANVAS_WIDTH - RADIUS) {
      balls[i].y = CANVAS_HEIGHT - RADIUS;
      balls[i].vy = -0.5 * balls[i].vy;
    }
  }

  // 移除数组中已经消失在屏幕外面的小球
  var cnt = 0;
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].x - RADIUS > 0 && balls[j].x + RADIUS < CANVAS_WIDTH) {
      balls[cnt++] = balls[j]
    }
  }
  while (balls.length>Math.min(300,cnt)){
    balls.pop()
  }
  // console.log(balls.length)
}
function getCurrentShowTimeSeconds() {
  var oDate = new Date()
  var ret = oDate.getHours()*3600+oDate.getMinutes()*60+oDate.getSeconds()
  // var ret = Math.round((endDate.getTime() - oDate.getTime()) / 1000)
  return ret >= 0 ? ret : 0;
}
function render(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  var hour = parseInt(currShowTimeSeconds / 3600);
  var minute = parseInt((currShowTimeSeconds - hour * 3600) / 60);
  var second = parseInt(currShowTimeSeconds % 60);
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), ctx);
  renderDigit(MARGIN_LEFT + 1 * 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), ctx);
  renderDigit(MARGIN_LEFT + 2 * 15 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
  renderDigit(MARGIN_LEFT + (2 * 15 + 9) * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), ctx);
  renderDigit(MARGIN_LEFT + (3 * 15 + 9) * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), ctx);
  renderDigit(MARGIN_LEFT + (4 * 15 + 9) * (RADIUS + 1), MARGIN_TOP, 10, ctx);
  renderDigit(MARGIN_LEFT + (4 * 15 + 9 * 2) * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), ctx);
  renderDigit(MARGIN_LEFT + (5 * 15 + 9 * 2) * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), ctx);

  //更新小球
  for (var i = 0; i < balls.length; i++) {
    ctx.fillStyle = balls[i].color;

    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
  }
}

function renderDigit(x, y, num, ctx) {
  ctx.fillStyle = "rgb(0,102,153)";
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        ctx.beginPath()
        ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
      }

    }
  }
}
