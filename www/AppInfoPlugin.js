"use strict";

var exec = cordova.require('cordova/exec')

var NAME = "AppInfo";

/**
 *
 * @param {(appInfo:AppInfo)=>void} success
 * @param {(error:any)=>void} fail
 */
function loadAppInfo(success, fail) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        try {
            success(JSON.parse(xhr.responseText));
        } catch (e) {
            fail(e);
        }
    });

    xhr.addEventListener("error", fail);
    xhr.open("get", "appInfo.json", true);
    xhr.send();

}

/**
 *
 * @constructor
 * @implements AppInfoPlugin
 */
function AppInfoPluginImpl() {

    /**
     *
     * @type {AppInfo}
     * @private
     */
    var _appInfo = null;

    /**
     *
     * @param {(appInfo:AppInfo)=>void} success
     * @param {(error:any)=>void} fail
     */
    this.getAppInfo = function (success, fail) {
        if (_appInfo) {
            if (success)
                success(_appInfo);
            return;
        }

        function onError(error) {
            console.error(NAME + ": cannot load app info", error);
            if (fail)
                fail(error);
        }


        loadAppInfo(function (appInfo) {
            exec(
                /**
                 * @param {AppInfoPlatformSpecific} appInfoPlatform
                 */
                function (appInfoPlatform) {
                    _appInfo = appInfo;
                    _appInfo[cordova.platformId] = appInfoPlatform;
                    if (success)
                        success(_appInfo);
                }, onError, NAME, 'getPlatformAppInfo', []);

        }, onError);


    }
}

module.exports = new AppInfoPluginImpl();
