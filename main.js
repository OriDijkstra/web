window.onload = function () {
    if (!getCookie("hidePopup")) {
      document.getElementById("welcomePopup").style.display = "block";
    }
  }
  
  function closePopup() {
    document.getElementById("welcomePopup").style.display = "none";
  }
  
  function setCookieAndClosePopup() {
    var date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 24시간
    document.cookie = "hidePopup=true; expires=" + date.toUTCString();
    closePopup();
  }
  
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }