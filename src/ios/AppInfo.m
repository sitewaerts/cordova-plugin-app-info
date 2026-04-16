#import "AppInfo.h"
#import <Cordova/CDVPluginResult.h>

@implementation AppInfo

- (void)getPlatformAppInfo : (CDVInvokedUrlCommand *)command
{
    NSString * callbackId = command.callbackId;
    NSString * localizedAppName = [[[NSBundle mainBundle] localizedInfoDictionary] objectForKey:@"CFBundleDisplayName"];
    NSString * appName = [[[NSBundle mainBundle] infoDictionary]objectForKey :@"CFBundleDisplayName"];
    NSString* packageName = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleIdentifier"];

    NSString* versionCode = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"];

    NSString* version = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
        if (version == nil) {
          NSLog(@"CFBundleShortVersionString was nil, attempting CFBundleVersion");
          version = versionCode;
          if (version == nil) {
            NSLog(@"CFBundleVersion was also nil, giving up");
            // not calling error callback here to maintain backward compatibility
          }
        }


    NSDictionary* ret = @{
            @"appName": [localizedAppName != nil ? localizedAppName : appName],
            @"packageName": [packageName],
            @"versionNumber": [version],
            @"versionCode": [versionCode]
        };


    CDVPluginResult * pluginResult =[CDVPluginResult resultWithStatus : CDVCommandStatus_OK messageAsDictionary:ret];
    [self.commandDelegate sendPluginResult : pluginResult callbackId : callbackId];
}

@end
