var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var particles = [];

function Particle(x, y) {
    this.x = x;
    this.y = y;

    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
};

Particle.prototype.draw = function() {
    ctx.fillStyle = '#75F94D'; 
    ctx.strokeStyle = '#0023F5'; 

    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
};

function createParticle() {
    var xPos = Math.random() * canvas.width;
    var yPos = Math.random() * canvas.height;

    for (var i = 0; i < 5; i++) {
        particles.push(new Particle(xPos, yPos));
    }
}

var timer = setInterval(createParticle, 10); // 每秒在随机位置生成烟花

var animationFrameId;

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";

    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }

    animationFrameId = requestAnimationFrame(animateParticles);
}


animateParticles();

// 添加一个全局函数来停止效果
window.stopEffect = function() {
    clearInterval(timer);
    cancelAnimationFrame(animationFrameId);
};
