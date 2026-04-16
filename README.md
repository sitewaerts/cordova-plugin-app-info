# Cordova AppInfo plugin

Access info about currently running app.

Based on https://github.com/sampart/cordova-plugin-app-version


## Installation

```bash
cordova plugin add https://github.com/sitewaerts/cordova-plugin-app-info
```
## Usage
```javascript
cordova.plugins.appInfo.getAppInfo(
    /**
     * 
     * @param {AppInfo} appInfo
     */
    function(appInfo){
        console.log(appInfo);
    },
    /**
     * 
     * @param {any} error
     */
    function(error){
        console.error("cannot load app info", error);
    }
);
```
TypeDef available at [./types/index.d.ts](./types/index.d.ts).

## Credits

Based on https://github.com/sampart/cordova-plugin-app-version written by [Robert (Jamie) Munro](http://twitter.com/rjmunro) at [White October](http://whiteoctober.co.uk/)

