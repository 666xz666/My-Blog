function updateClock() {
    var now = new Date();
    var second = now.getSeconds();
    var minute = now.getMinutes();
    var hour = now.getHours();
  
    document.getElementById('hour-hand').style.transform = 'rotate(' + (hour * 30 + minute * 0.5) + 'deg)';
    document.getElementById('minute-hand').style.transform = 'rotate(' + (minute * 6 + second * 0.1) + 'deg)';
    document.getElementById('second-hand').style.transform = 'rotate(' + (second * 6) + 'deg)';
  
    document.getElementById('time').textContent = now.toLocaleTimeString();
    document.getElementById('date').textContent = now.toLocaleDateString();
  }
  
  setInterval(updateClock, 1000);
  updateClock();