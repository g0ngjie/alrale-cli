#!/usr/bin/env node

const inquirer = require('inquirer')
const https = require('https')
const http = require('http')
const { spawn } = require('child_process');
const Table = require('cli-table2');
const os = require('os')
const ora = require('ora');
const download = require("download-git-repo");
const path = require("path");
const rimraf = require("rimraf");

/**非负浮点数（正浮点数 + 0） */
const NotNegativeFloatReg = /^\d+(\.\d+)?$/;
/**非正浮点数（负浮点数 + 0） */
const NotPositiveFloatReg = /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;

/**
 * 判断数字类型,(包含字符串类型数字)
 * @param {any} target 
 */
exports.IsNumber = function (target) {
    return NotNegativeFloatReg.test(target) || NotPositiveFloatReg.test(target)
}

/**
 * 整数前置补零
 * @param {number|string} target 
 * @param {number} places 位数，默认2 -> 10
 */
exports.PrefixZero = function (target, places = 2) {
    if (!exports.IsNumber(target)) return ''
    const condition = 10 ** (places - 1)
    if (+target < condition) {
        return (Array(places).join('0') + target).slice(-places)
    }
    return target + '';
}

/**
 * 移除引号
 * @param {String} str 
 */
exports.ClearQuotes = function (str) {
    return str.replace(/\"|\'/g, "")
}

/**
 * 终端交互
 * @param {Array} prompts 
 */
exports.Inquirer = function (prompts = []) {
    return new Promise(resolve => {
        inquirer
            .prompt(prompts)
            .then(answers => {
                resolve({ ok: true, data: answers })
            })
            .catch(error => {
                if (error.isTtyError) resolve({ ok: false, msg: '不能在当前环境下呈现' })
                else resolve({ ok: false, msg: error + '' })
            });
    })
}

/**
 * https.Get请求
 * @param {String} url 
 */
exports.HttpsGet = function (url) {
    return new Promise(resolve => {
        https.get(url, function (e) {
            if (e.statusCode === 200) {
                e.on('data', function (data) {
                    resolve({ ok: true, data })
                })
            } else resolve({ ok: false, msg: e.statusMessage })
        }).on('error', function (err) {
            resolve({ ok: false, msg: err.message })
        })
    })
}

/**
 * http.Get请求
 * @param {String} url 
 */
exports.HttpGet = function (url) {
    return new Promise(resolve => {
        http.get(url, function (e) {
            if (e.statusCode === 200) {
                e.on('data', function (data) {
                    resolve({ ok: true, data })
                })
            } else resolve({ ok: false, msg: e.statusMessage })
        }).on('error', function (err) {
            resolve({ ok: false, msg: err.message })
        })
    })
}

/**
 * 表格
 * @param {Array} rows 
 * @param {Array|undefined} head 
 */
exports.GetTable = function (rows, head) {
    const table = new Table({ head })
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        table.push(row)
    }
    return table.toString()
}

/**
 * 获取平台
 */
exports.GetPlatform = function () {
    const platform = os.platform();
    const current = {
        aix: 'IBM AIX',
        android: 'Android',
        darwin: 'Apple',
        freebsd: 'FreeBSD',
        linux: 'Linux',
        openbsd: 'OpenBSD',
        sunos: 'SunOS',
        win32: 'Windows',
    }[platform] || 'unknown'
    return {
        isWindow: current === 'Windows',
        isApple: current === 'Apple',
        isLinux: current === 'Linux',
        infos: current
    }
}
/**
 * 执行shell命令
 * @param {String} command 命令
 * @param {Array} args 参数
 * @returns 
 */
exports.Shell = function (command, args, options) {
    return new Promise(resolve => {
        const spinner = ora().start();
        spinner.color = 'cyan';
        const shell = spawn(command, args, options)
        shell.stdout.on('data', data => resolve({ ok: true, data: data.toString() }))
        shell.stdout.on('end', () => spinner.stop())
        shell.stdout.on('error', err => {
            spinner.stop()
            resolve({ ok: false, msg: err.message })
        })
    })
}

/**
 * 模板下载
 * @param {String} url 
 * @param {Strubg} target 
 * @returns 
 */
exports.DownloadTemplate = function (url, target, private = false) {
    let dir;
    if (private) dir = target
    else dir = path.join(process.cwd(), target); //这里可以自定义下载的地址
    rimraf.sync(dir, {});  //在下载前需要保证路径下没有同名文件
    return new Promise((resolve, reject) => {
        download(url, target, { clone: true }, (err) => {
            if (err) reject(err)
            else resolve(target)
        })
    })
}
