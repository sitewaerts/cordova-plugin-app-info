var NAME = "AppInfo";


/**
 *
 * @param {(name:string|null)=>void} successCallback
 * @void
 */
function getAppName(successCallback) {
    if (Windows.ApplicationModel.Package.current && Windows.ApplicationModel.Package.current.displayName) {
        var name = Windows.ApplicationModel.Package.current.displayName;
        successCallback(name);
    } else {

        var failed = function (error) {
            console.warn("cannot load display name", error);
            successCallback(null);
        };

        Windows.ApplicationModel.Package.current.installedLocation.getFileAsync("AppxManifest.xml").then(function (file) {
            Windows.Data.Xml.Dom.XmlDocument.loadFromFileAsync(file).then(function (xDoc) {
                var displayName = xDoc.getElementsByTagName("DisplayName");
                if (displayName && displayName.length === 1) {
                    var name = displayName[0].innerText;
                    successCallback(name);
                } else {
                    failed({code: -1, message: "ERR_DISPLAY_NAME_NOT_FOUND"});
                }
            }, failed);
        }, failed);
    }
}

var AppInfoInstance = {

    /**
     * @param {(appInfo: AppInfoWindows)=>void} successCallback
     * @param {(error:any)=>void} failCallback
     * @param {Array<any>} args
     */
    getPlatformAppInfo: function (successCallback, failCallback, args) {

        getAppName(function (appName) {
            var version = Windows.ApplicationModel.Package.current.id.version;
            successCallback(
                {
                    appName: appName,
                    packageName: Windows.ApplicationModel.Package.current.id.name,
                    versionNumber: [version.major, version.minor, version.build].join('.'),
                    versionCode: Windows.ApplicationModel.Package.current.id.version.build
                }
            );
        });
    }
};

//module.exports = AppInfoInstance;

cordova.commandProxy.add(NAME, AppInfoInstance);
