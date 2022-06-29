function randomN(arr) {
    var randomElement;
    if (arr.length) {
        randomElement = arr[Math.floor(Math.random() * arr.length)];
    }
    return randomElement;
}


/*
 * 取得外层地址指定参数值
 */
function getQueryVariable(variable) {
    var query = "";
    var parent_url = getParentUrl();
    if(parent_url != null){
        if(parent_url.indexOf("?") != -1)
            query = parent_url.substr(parent_url.indexOf("?") +1);
    }else{
        query = window.location.search.substring(1)
    }

    // console.log("window.location.search:" + query);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return 0;
}

/*
 * clipboard
 */
