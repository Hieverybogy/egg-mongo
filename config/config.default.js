/* eslint valid-jsdoc: "off" */
const path = require('path');
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1559097863702_9406';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    config.static = {
        prefix: '/public/'
    };

    //模板引擎
    config.view = {
        defaultViewEngine: 'ejs'
    };

    config.cors = {
        origin: '*', // 访问白名单,根据你自己的需要进行设置
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    config.mongoose = {
        url: 'mongodb://localhost:27017/test',
        options: {},
    };

    config.multipart = {
        fileExtensions: [ '.xlsx' ] // 增加对 apk 扩展名的文件支持
    }

    return {
        ...config,
        ...userConfig,
    };
};
