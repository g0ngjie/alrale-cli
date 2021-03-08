#!/usr/bin/env node

const download = require("download-git-repo");
const path = require("path");
const rimraf = require("rimraf");
const ora = require('ora');
const util = require('./utils')
const print = require('./print')

function downloadTemplate(url, target) {
    const dir = path.join(process.cwd(), target); //这里可以自定义下载的地址
    rimraf.sync(dir, {});  //在下载前需要保证路径下没有同名文件
    return new Promise((resolve, reject) => {
        download(url, target, { clone: true }, (err) => {
            if (err) reject(err)
            else resolve(target)
        })
    })
}

/**
 * 下载koa2模板
 */
function koaBasicServices() {
    const url = 'https://gitee.com:gjwork/koa2-basic-services-template#master'
    const dir = 'koa2-basic-services-template'
    return downloadTemplate(url, dir)
}

/**
 * 下载vue2-element-ui模板
 */
function vue2BasicElementUI() {
    const url = 'https://gitee.com:gjwork/vue2-basic-element-ui-template#master'
    const dir = 'vue2-basic-element-ui-template'
    return downloadTemplate(url, dir)
}

/**
 * 模板下载
 */
exports.InitTemplate = async function () {
    const { ok, msg, data } = await util.Inquirer([{
        type: 'list',
        message: '模板选择',
        name: 'template',
        choices: ["koa2-basic-template", "vue2-basic-element-ui-template"],
    }])

    if (!ok) return print.Error(msg)
    const spinner = ora('Loading...').start();
    spinner.color = 'cyan';
    spinner.text = '正在安装...';
    const { template } = data;
    let successMsg = []
    // 下载koa模板
    switch (template) {
        case 'koa2-basic-template':
            const koa2_path = await koaBasicServices()
            successMsg = [
                `cd ${koa2_path}`,
                'yarn 或者 npm install 安装依赖',
                'yarn dev 启动开发环境'
            ]
            break;
        case 'vue2-basic-element-ui-template':
            const vue2_path = await vue2BasicElementUI()
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