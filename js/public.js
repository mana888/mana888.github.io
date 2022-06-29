function isIos() {
    let u;
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

function getParentUrl() {
    var isInIframe, parentUrl = null;
    return parent !== window && (parentUrl = document.referrer), parentUrl
}

function androidVer() {
	var ua = navigator.userAgent;
	var v = 8.0;
	if( ua.indexOf("Android") >= 0 )
	{
	  v = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
	}
	
    //let v;
    //if(navigator.userAgent.indexOf("ANDROID") > -1){
        //v= navigator.userAgent.match(/Android [\d+\.]{3,5}/)[0].replace('Android ','');
    //}
    //else {
        //v=8.0;
    //}
    return parseInt(v);
};


function isDevice() {
    if (navigator.userAgent.match(/Tablet|iPad/i))
    {
        return "tablet";
    } else if(navigator.userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i) )
    {
        // do mobile stuff
        return "mobile";
    } else {
        // do desktop stuff
        return "desktop";
    }
}

function redirectPleaseOpenInSafari() {
    const userAgent = navigator.userAgent.toUpperCase(),
        is_window = userAgent.indexOf("WINDOWS") > -1,
        is_android = userAgent.indexOf("ANDROID") > -1,
        is_chrome = userAgent.indexOf("CHROME") > -1,
        is_UCBrowser = userAgent.indexOf("UCBROWSER") > -1,
        is_qqBrowser = userAgent.indexOf("QQBROWSER") > -1,
        is_safari = !is_UCBrowser && !is_chrome && !is_qqBrowser && userAgent.indexOf("SAFARI") > -1;
    return !is_window && !is_android && (!is_safari && (location.href = "./safari.html?url=" + location.href, !0))
}

