const appInfoPlugin = {

    /**
     * @param {Array<any>} args
     * @param {CallbackContext} callbackContext
     * @void
     */
    getPlatformAppInfo: (args, callbackContext) =>
    {
        callbackContext.success({
            platform: process.platform,
            windowsStore: process.windowsStore
        })
    }

}

/**
 * @type {CordovaElectronPlugin}
 */
const plugin = function (action, args, callbackContext)
{
    if (!appInfoPlugin[action])
        return false;
    try
    {
        appInfoPlugin[action](args, callbackContext)
    } catch (e)
    {
        console.error(action + ' failed', e);
        callbackContext.error({message: action + ' failed', cause: e});
    }
    return true;
}

module.exports = plugin;
