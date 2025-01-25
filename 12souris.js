
    document.onkeydown = function(n) {
        if (123 == n.keyCode) return !1;
    };
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
