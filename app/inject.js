var mask = document.createElement("div");
var qrcode = document.createElement("iframe");
qrcode.src = chrome.extension.getURL("index.html");
qrcode.style.boder = "0 none transparent";
qrcode.style.boxShadow = "0px 0px 20px gray";
qrcode.style.position = "fixed";
qrcode.style.left = "50%";
qrcode.style.top = "0";
qrcode.style.marginleft = "-100px";
qrcode.style.width = "200px";
qrcode.style.height = "233px";
qrcode.style.overflow="hidden";
qrcode.style.zIndex = 1000001;
qrcode.style.background = "white";
qrcode.scrolling="no";

mask.style.width = "100%";
mask.style.height = "100%";
mask.style.position = "fixed";
mask.style.top = "0";
mask.style.left = "0";
mask.style.background = "black";
mask.style.opacity = ".3";
mask.style.zIndex = "1000000";
mask.style.cursor = "pointer";
mask.onclick = function(){
    mask.remove();
    qrcode.remove();
};
document.body.appendChild(mask);
document.body.appendChild(qrcode);




