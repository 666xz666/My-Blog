window.addEventListener('load',function() {
    document.getElementsByClassName("loader")[0].style.display = "none";
  });
  
  window.onbeforeunload = function() {
    document.getElementsByClassName("loader")[0].style.display = "block";
  };