"use strict";

var NAME = "AppInfo";


var AppInfoInstance = {

    /**
     * @param {(appInfo: AppInfoBrowser)=>void} successCallback
     * @param {(error:any)=>void} failCallback
     * @param args
     */
    getPlatformAppInfo: function (successCallback, failCallback, args) {
        successCallback({});
    }
};

module.exports = AppInfoInstance;


require("cordova/exec/proxy").add(NAME, AppInfoInstance);

