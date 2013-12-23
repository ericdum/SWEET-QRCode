chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({"title": "生成选中二维码", "contexts": ["selection"], "id": "generat-rqcode-for-selection"});
  chrome.contextMenus.create({"title": "生成页面二维码", "contexts": ["page"], "id": "generat-rqcode-for-page"});
  chrome.contextMenus.create({"title": "生成图片地址二维码", "contexts": ["image"], "id": "generat-rqcode-for-image"});
  chrome.contextMenus.create({"title": "生成链接二维码", "contexts": ["link"], "id": "generat-rqcode-for-link"});
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    console.log(arguments);
    var text = "";
    switch( info.menuItemId ){
        case "generat-rqcode-for-selection":
            text = info.selectionText;
            break;
        case "generat-rqcode-for-image":
            text = info.srcUrl;
            break;
        case "generat-rqcode-for-link":
            text = info.linkUrl;
            break;
        default:
            text = tab.url;
    }
    var code = 'var mask = document.createElement("div"); var qrcode = document.createElement("iframe"); qrcode.src = "'+chrome.extension.getURL("index.html")+'#!?text='+encodeURIComponent(text)+'"; qrcode.style.boder = "0 none transparent"; qrcode.style.boxShadow = "0px 0px 20px gray"; qrcode.style.position = "fixed"; qrcode.style.left = "50%"; qrcode.style.top = "0"; qrcode.style.marginleft = "-100px"; qrcode.style.width = "200px"; qrcode.style.height = "233px"; qrcode.style.overflow="hidden"; qrcode.style.zIndex = 10001; qrcode.style.background = "white"; mask.style.width = "100%"; mask.style.height = "100%"; mask.style.position = "fixed"; mask.style.top = "0"; mask.style.left = "0"; mask.style.background = "black"; mask.style.opacity = ".3"; mask.style.zIndex = "10000"; mask.style.cursor = "pointer"; mask.onclick = function(){ mask.remove(); qrcode.remove(); }; document.body.appendChild(mask); document.body.appendChild(qrcode);';
    chrome.tabs.executeScript(null, {code:code}); 
});
