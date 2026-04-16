// Type definitions for Cordova appInfo plugin
// Project: https://github.com/sitewaerts/cordova-plugin-app-info"
// Definitions by: Microsoft Open Technologies Inc. <http://msopentech.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// Copyright (c) Microsoft Open Technologies Inc
// Licensed under the MIT license

interface AppInfoPlatformSpecific{
}

interface AppInfoAndroid extends AppInfoPlatformSpecific{
    appName: string
    packageName: string
    versionNumber: string
    versionCode: number
}

interface AppInfoIOS extends AppInfoPlatformSpecific{
    appName: string
    packageName: string
    versionNumber: string
    versionCode: number
}

interface AppInfoWindows extends AppInfoPlatformSpecific{
    appName: string
    packageName: string
    versionNumber: string
    versionCode: number
}

interface AppInfoElectron extends AppInfoPlatformSpecific{
    platform:string
    windowsStore?:boolean
}

interface AppInfoBrowser extends AppInfoPlatformSpecific{

}

interface AppInfo{
    id: string
    displayName: string
    description: string
    version: string

    ios?: AppInfoIOS
    android?: AppInfoAndroid
    windows?: AppInfoWindows
    electron?: AppInfoElectron
    browser?: AppInfoBrowser
}

/**
 *
 */
interface AppInfoPlugin {

    getAppInfo: (success: (info: AppInfo) => void, fail: (error: any) => void) => void


}

// plugin available at window.cordova.plugins.appInfo
interface CordovaPlugins {
    appInfo: AppInfoPlugin
}
