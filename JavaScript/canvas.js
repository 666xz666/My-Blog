function loadScript(url) {
    // 移除旧的脚本
    var oldScript = document.getElementById('effectScript');
    if (oldScript) {
        oldScript.parentNode.removeChild(oldScript);
    }

    // 创建新的脚本元素
    var script = document.createElement('script');
    script.src = url;
    script.id = 'effectScript';
    document.body.appendChild(script);
}


var effects = ['/JavaScript/matrix_rain_1.js', '/JavaScript/matrix_rain_2.js', '/JavaScript/fireworks.js','/JavaScript/Radiating_Character_Echo.js'];
var currentEffect = 0;

function switchEffect() {
    // 如果存在，停止当前效果
    if (window.stopEffect) {
        window.stopEffect();
        window.stopEffect = null;
    }

    // 加载新的效果
    loadScript(effects[currentEffect]);
    currentEffect = (currentEffect + 1) % effects.length;
}


// 每隔半分钟切换效果
setInterval(switchEffect, 20000);

// 立即显示第一个效果
switchEffect();



