package de.sitewaerts.cordova.plugin.appInfo;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.PackageManager;

public class AppInfoPlugin extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        try {
            if (action.equals("getPlatformAppInfo")) {

                JSONObject result = new JSONObject();

                String packageName = this.cordova.getActivity().getPackageName();
                PackageManager packageManager = this.cordova.getActivity().getPackageManager();
                PackageInfo packageInfo = packageManager.getPackageInfo(packageName, 0);
                ApplicationInfo appInfo = packageManager.getApplicationInfo(packageName, 0);

                result.put("appName", String.valueOf(packageManager.getApplicationLabel(appInfo)));
                result.put("packageName", packageName);
                result.put("versionNumber", packageInfo.versionName);
                result.put("versionCode", packageInfo.versionCode);

                callbackContext.success(result);
                return true;
            }
            return false;
        } catch (NameNotFoundException e) {
            callbackContext.error(e.getMessage());
            return true;
        }
    }

}
