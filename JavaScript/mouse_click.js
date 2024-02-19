document.body.addEventListener('click', function(e) {
    var ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - 25) + 'px';  /* 更新波纹的初始位置 */
    ripple.style.top = (e.clientY - 25) + 'px';  /* 更新波纹的初始位置 */
    /* 使用随机颜色 */
    ripple.style.backgroundColor = 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',0.7)';
    document.body.appendChild(ripple);
    setTimeout(function() {
        ripple.parentElement.removeChild(ripple);
    }, 1000);
});