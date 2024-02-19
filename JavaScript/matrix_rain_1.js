var c = document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var chinese = "01";
chinese = chinese.split("");

var font_size = 10;
var columns = Math.floor(c.width/font_size);
var drops = [];
for(var x = 0; x < columns; x++)
drops[x] = 1;

var timer;  // 创建一个全局变量来保存定时器

function draw() {
    
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0";
    ctx.font = font_size + "px arial";
    for(var i = 0; i < drops.length; i++) {
        var text = chinese[Math.floor(Math.random()*chinese.length)];
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        if(drops[i]*font_size > c.height && Math.random() > 0.975) 
            drops[i] = 0;
        drops[i]++;
    }
}


timer = setInterval(draw, 33);  // 将定时器保存到全局变量中

// 添加一个全局函数来停止效果
window.stopEffect = function() {
    clearInterval(timer);
};