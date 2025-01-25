
    document.onkeydown = function(n) {
        if (123 == n.keyCode) return !1;
    };
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });window.onscroll = function() {
  const button = document.getElementById("sidoxtop");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) { 
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};document.getElementById("sidoxtop").addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

