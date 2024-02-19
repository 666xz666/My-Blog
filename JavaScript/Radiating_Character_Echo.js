function getRandomDarkColor() {
    var r = Math.floor(Math.random() * 10); // 0-127
    var g = Math.floor(Math.random() * 50); // 0-127
    var b = Math.floor(Math.random() * 12); // 0-127
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particles = [];

function Particle(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = 20;
    this.text = Math.random().toString(36).substring(2, 3); // 随机字符
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16); // 随机颜色
    this.lifeSpan = 1000; // 粒子的生命周期（单位：帧）
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) {
        this.speedX *= -1;
    }

    if (this.y < 0 || this.y > canvas.height) {
        this.speedY *= -1;
    }

    this.lifeSpan-=4; // 每帧减少生命周期
};

Particle.prototype.draw = function() {
    ctx.font = this.size + 'px Arial';
    ctx.fillStyle = this.color; // 使用随机颜色
    ctx.fillText(this.text, this.x, this.y);
};

function createParticle() {
    var speedX = (Math.random() - 0.5) * 4; // 减小速度
    var speedY = (Math.random() - 0.5) * 4; // 减小速度
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, speedX, speedY));
}


var timer =setInterval(createParticle, 10); // 每100毫秒创建一个新的粒子

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // 如果粒子的生命周期结束，从数组中移除
        if (particles[i].lifeSpan <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    animationFrameId=requestAnimationFrame(animateParticles);
}

animateParticles();

// 停止效果
window.stopEffect = function() {
    particles = []; // 清除所有粒子
    clearInterval(timer); // 清除定时器
    cancelAnimationFrame(animationFrameId); // 取消动画帧请求
};
