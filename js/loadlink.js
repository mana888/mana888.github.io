var jsondata = {};
var N_Channel = "",
    N_Code = "";
var jqueryLoader = false;
var _time = new Date();
const domainName = window.location.hostname || 'localhost';



function CreateTemplate(json, type_down) {
    let _manifest = false;
    if(json.url_config.ios_url_extra_1.indexOf("manifest")>-1) {
        _manifest = true;
    }
    var msg_warning = "";

    var html_url = "./static/html/";
    console.log(navigator.userAgent);


    switch(isDevice()) {
        case "desktop":
          // waring desktop;
          html_url += "desktop.html";
          msg_warning += " MANA88 không hỗ trợ chơi trên PC và các trình giả lập trên PC !!! ";
          break;
        case "tablet":
          // waring tablet;
          console.log("tablet");
          tablet_warning = true;
          msg_warning += " MANA88 chỉ hỗ trợ một vài máy tính bảng !!! ";
          if(!isIos()) {
            if(androidVer() < 7) {
                android_warning = true;
                msg_warning += " Phiên bản Android của bạn có vẻ quá thấp, hãy nâng cấp lên android 7.0 trở lên!!! ";
            }
            html_url += "android.html";
          } else {
              if(_manifest) {
                  html_url += "iostype2.html";
              } else { 
                html_url += "iostype1.html";
              }
          }
          break;
        default:
            if(!isIos()) {
				console.log(androidVer());
                if(androidVer() < 7) {
                    android_warning = true;
                    msg_warning += " Phiên bản Android của bạn có vẻ quá thấp, cần nâng cấp Android 7.0 trở lên!!! ";
                }
                html_url += "android.html";
              } else {
                  if(_manifest) {
                      html_url += "iostype2.html";
                  } else { 
                    html_url += "iostype1.html";
                  }
            }
    };
    

    fetchHtmlFile(html_url).then((html) => {
        document.getElementById("down_content").innerHTML = html;
        
        let node_kuf = document.getElementById('kuf');
        let node_waring = document.getElementById('warning');
        let kuf = json.url_config.kfUrl;
        if(json.channel_config.list_channel[domainName]) {
            kuf = json.channel_config.list_channel[domainName].kf_url;
        };
		
        node_kuf.setAttribute("href", kuf);
        if(msg_warning) {
            node_waring.innerHTML = msg_warning;
        }
        var g_code =  checkAndSetCode(json);
        site_config = setSiteConfig(g_code,json);
        runAnyEvent(g_code, json);
    });
    
};
// fetch json file


function showHTML(json, type_down) {
    let html = '';
    html += `
    <div class="game_code" id="gameCode"></div>
    <div class="downregister">`;
    if (isDevice() == "desktop") {
        html += `
            <p>Không hỗ trợ trên máy tính. Vui lòng sử dụng điện thoại Android hoặc Iphone hoặc trình giả lập</p>
            <div class="android-down"><span id="down_btn2" class="downbutton down_btn btn-bg" >Tải file APK cho Android</span></div>
			</br>
            <p>Nếu không thể tải xuống, hoặc có lỗi khi tải, hãy liên hệ CSKH hỗ trợ tải game <a target="_blank" id="kuf" href="#" style="font-size: 0.6rem; color: green">tại đây</a></p>
            </div>
            `;
    } else if (isDevice() == "tablet") {
        html += `<p>Một số máy tính bảng sẽ không tương thích với trò chơi. Vui lòng sử dụng điện thoại Android hoặc Iphone</p>`
        if (isIos()) {
            html += `
            <div class="ios-down">
                <div class="down_btn btn-bg down-ios-1">Tải xuống IOS</div>
                <div class="down_btn btn-bg down-ios-2 ">Link IOS dự phòng</div>
            </div>
            </br>
            <p>Nếu không thể tải xuống, hoặc có lỗi khi tải, hãy liên hệ CSKH hỗ trợ tải game <a target="_blank" id="kuf" href="#" style="font-size: 0.6rem; color: green">tại đây</a></p>
            </div>
            `;
        } else {
            html += `
            <div class="android-down"><span id="down_btn2" class="downbutton down_btn inactive">Tải file APK cho Android</span></div>
            </br>
            <p>Nếu không thể tải xuống, hoặc có lỗi khi tải, hãy liên hệ CSKH hỗ trợ tải game <a target="_blank" id="kuf" href="#" style="font-size: 0.6rem; color: green">tại đây</a></p>
            </div>
            `;
        }
    } else {
        if (isIos()) {
            html += `
            <div class="ios-down" >
                <div class="down_btn btn-bg down-ios-1">Tải xuống IOS</div>
                <div class="down_btn btn-bg down-ios-2 ">Link IOS dự phòng</div>
            </div>
            </br>
            <p>Nếu không thể tải xuống, hoặc có lỗi khi tải, hãy liên hệ CSKH hỗ trợ tải game <a target="_blank" id="kuf" href="#" style="font-size: 0.6rem; color: green">tại đây</a></p>
            </div>
            `;
        } else {
            html += `
            <div class="android-down"><span id="down_btn2" class="downbutton down_btn btn-bg">Tải xuống cho Android</span></div>
            </br>
            <p>Nếu không thể tải xuống, hoặc có lỗi khi tải, hãy liên hệ CSKH hỗ trợ tải game <a target="_blank" id="kuf" href="#" style="font-size: 0.6rem; color: green">tại đây</a></p>
            </div>
            `;
        }
    }
    return html;
}

// load json file
async function fetchJsonData(url) {
    try {
        const response = await fetch(url + "?v=" + _time.getTime());
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Could not get JsonData: ${error}`);
    }
}

// load html file
async function fetchHtmlFile(url) {
    try {
        const response = await fetch(url + "?v=" + _time.getTime());
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error(`Could not get HtmlFile: ${error}`);
    }
}

// jquery already
$(document).ready(function () {
    fetchJsonData('./webconfig.php').then((json) => {
        CreateTemplate(json);
    });

});


    
function redirectToLink(type) {
    $("#contain").fadeIn(0);
    $("#contain").fadeOut(5000);
    setTimeout(() => {
		location.href = type;
	},3000);
}
// random link follow json file.
function setRandomLink(json) {
    var data = json;
    var N_Channel = getDefaultChannelCode(data);
    var N_Code = 0;
    if (data.channel_config.list_channel[domainName]) {
        if (data.channel_config.list_channel[domainName].is_set_link_random) {
            N_Channel = data.channel_config.list_channel[domainName].channel_set_default;
            N_Code = randomN(data.channel_config.list_channel[domainName].list_id_set);
        }
    }
    return {
        code: N_Code,
        channelCode: N_Channel
    }
}

// after load any thing
function runAnyEvent(g_code, jsondata) {
    let copyText, channelCode = g_code.channelCode;
    copyText = JSON.stringify(site_config.channels[channelCode].openinstalldata);
    $(".down_btn").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        clipboard(copyText, event);
        redirectToLink(jsondata.url_config[$(this).attr("link")]);
    });
}

// check and set Code


function checkAndSetCode(data) {
    if (getQueryVariable('code') == 0 && getQueryVariable('channelCode') == 0) {
        return setRandomLink(data);
    } else {
        var ant = {
            code: getQueryVariable('code'),
            channelCode: getQueryVariable('channelCode') || getDefaultChannelCode(data)
        }
        return ant;
    }
}

function getDefaultChannelCode(data) {
    let dchannel = 4260000;
    if(data.channel_config.list_channel[domainName]) {
        dchannel = data.channel_config.list_channel[domainName].channel_set_default;
    }
    return dchannel;
}