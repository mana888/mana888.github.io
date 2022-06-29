
var site_config;
/* 
 * 自行组成site config
 */
function setSiteConfig(ant, json){
    var code = ant.code;
    var channel = ant.channelCode;
    var temp_config = {
        AppKey: json.web_config.app_id,
        channels: {},
        check_password: false,
        check_rand_code: false,
        web_register: false,
        defult_apk_url: json.url_config.defultApkUrl,
        defult_ios_url: json.url_config.iosinstrUrl,
        iosChannelID: ant.channelCode,
        apkChannelID: ant.channelCode,
        kf: json.url_config.kfUrl
    }

    const key = 'egg^&*HBJyuTw';
    const platKey = json.web_config.app_id;

    temp_config.channels[channel] = {};
    temp_config.channels[channel].openinstalldata = {};
    temp_config.channels[channel].openinstalldata.code = code;
    temp_config.channels[channel].openinstalldata.ac = channel;
    temp_config.channels[channel].openinstalldata.ac_new = hex_md5(key+channel);
    temp_config.channels[channel].openinstalldata.c_new = hex_md5(key+channel);
    temp_config.channels[channel].openinstalldata.c = channel;
    temp_config.channels[channel].openinstalldata.ac_new1 = hex_md5(key+platKey+channel);
    temp_config.channels[channel].openinstalldata.c_new1 = hex_md5(key+platKey+channel);
    return temp_config;

}