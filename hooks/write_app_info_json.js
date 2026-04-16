'use strict';

const fs = require('fs');
const path = require('path');

function hook(context){

    const projectRoot = context.opts.projectRoot;

    const appInfoPath = path.join(projectRoot, 'www/appInfo.json');

    const packageJson = require(path.join(projectRoot, 'package.json'));

    /**
     *
     * @type {AppInfo}
     */
    const appInfo = {
        id: packageJson.name,
        displayName: packageJson.displayName,
        description: packageJson.description,
        version: packageJson.version,
    };

    fs.writeFileSync(appInfoPath, JSON.stringify(appInfo, null, 2), 'utf8');
}


module.exports = hook;