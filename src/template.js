#!/usr/bin/env node

const ora = require('ora');
const util = require('./utils')
const print = require('./print')

/**
 * 下载koa2模板
 */
function koaBasicServices(custom) {
    const url = 'https://gitee.com:gjwork/koa2-basic-services-template#master'
    const dir = custom === '[default]' ? 'koa2-basic-services-template' : custom
    return util.DownloadTemplate(url, dir)
}

/**
 * 下载vue2-element-ui模板
 */
function vue2BasicElementUI(custom) {
    const url = 'https://gitee.com:gjwork/vue2-basic-element-ui-template#master'
    const dir = custom === '[default]' ? 'vue2-basic-element-ui-template' : custom
    return util.DownloadTemplate(url, dir)
}

/**
 * 模板下载
 */
exports.InitTemplate = async function () {
    const { ok, msg, data } = await util.Inquirer([
        {
            type: 'list',
            message: '模板选择',
            name: 'template',
            choices: ["koa2-basic-template", "vue2-basic-element-ui-template"],
        }, {
            type: 'input',
            message: '模板名称',
            name: 'custom',
            default: '[default]'
        }
    ])

    if (!ok) return print.Error(msg)
    const spinner = ora('Loading...').start();
    spinner.color = 'cyan';
    spinner.text = '正在安装...';
    const { template, custom } = data;
    let successMsg = []
    // 下载koa模板
    switch (template) {
        case 'koa2-basic-template':
            const koa2_path = await koaBasicServices(custom)
            successMsg = [
                `cd ${koa2_path}`,
                'yarn 或者 npm install 安装依赖',
                'yarn dev 启动开发环境'
            ]
            break;
        case 'vue2-basic-element-ui-template':
            const vue2_path = await vue2BasicElementUI(custom)
            successMsg = [
                `cd ${vue2_path}`,
                'yarn 或者 npm install 安装依赖',
                'yarn serve 启动开发环境'
            ]
            break;
        default:
            break;
    }
    spinner.succeed('安装完成!')
    spinner.stop()
    print.Messages(successMsg)
}