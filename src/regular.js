#!/usr/bin/env node

const util = require('./utils')
const print = require('./print')

const Config = {
    /**Url */
    'url': /^((https|http|ftp|rtsp|mms)?:\/\/)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
    /**身份证号（15位或18位数字） */
    'idcard': /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    /**邮箱 */
    'email': /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
    /**中文 */
    'chinese': /^[\u4e00-\u9fa5]+$/,
    /**整数 */
    'integer': /^-?\d+$/
}

exports.GetRegs = async function () {
    const { ok, msg, data } = await util.Inquirer([{
        type: 'list',
        message: '正则表达式',
        name: 'reg',
        choices: [
            { name: "身份证", value: "idcard" },
            { name: "邮箱", value: "email" },
            { name: "中文", value: "chinese" },
            { name: "整数", value: "integer" },
            { name: "URL", value: "url" }
        ]
    }])
    if (ok) {
        const { reg } = data;
        print.Message(Config[reg])
    }
    else print.Error(msg)
}