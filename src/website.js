#!/usr/bin/env node

const util = require('./utils')
const path = require('path');
const print = require('./print');
const open = require('open');
const fs = require('fs');
const chalk = require("chalk");

// 缓存目录
const CachePath = path.join(__dirname, '..', '.cache/note')

/**是否存在文件, 不存在则自动fetch */
async function fetchSync() {
    const exists = fs.existsSync(CachePath);
    if (!exists) await exports.RemoteFetch()
}

const WEBSITE_KEY = 'websit';

/**同步配置 */
exports.SyncConfig = async function () {
    const { ok: confOk, msg: errMsg } = await util.GetConfig(WEBSITE_KEY);
    if (!confOk) {
        print.Error(errMsg)
        const { ok, msg, data } = await util.Inquirer([
            {
                type: 'input',
                message: '请输入git仓库托管地址',
                default: 'https://gitee.com',
                name: 'git_url',
            }, {
                type: 'input',
                message: 'owner(作者)',
                name: 'owner',
                default: 'g0ngjie'
            }, {
                type: 'input',
                message: 'name(项目名)',
                name: 'name',
                default: 'note',
            }, {
                type: 'input',
                message: 'branch(分支)',
                name: 'branch',
                default: 'master'
            }
        ]);
        if (!ok) {
            print.Error(msg);
            process.exit(1);
        }
        const { git_url, owner, name, branch } = data;
        const { ok: isOk, msg: err } = await util.SetConfig({ [WEBSITE_KEY]: `${git_url}:${owner}/${name}#${branch}` });
        if (!isOk) {
            print.Error(err);
            process.exit(1)
        }
    }
}

exports.Clear = async function () {
    const { ok, msg } = await util.ClearConfig();
    if (ok) print.Message(msg);
    else {
        print.Error(msg);
        process.exit(1);
    }
}

/**远端获取最新 */
exports.RemoteFetch = async function () {
    const { ok, data: url, msg } = await util.GetConfig(WEBSITE_KEY);
    if (!ok) {
        print.Error(msg)
        process.exit(1)
    }
    return util.DownloadTemplate(url, CachePath, true)
}

/**查看所有 */
exports.ShowAll = async function () {
    await fetchSync();
    const files = require(`${CachePath}/websit.js`);
    const json = (files || []).map(item => {
        const { keywords, url, description } = item || {};
        return `${description} [${(keywords || []).join()}] ${chalk.green(url)}\n`
    })
    print.Messages(json)
}

/**关键词 打开网站 */
exports.Open = async function (key) {
    await fetchSync()
    const files = require(`${CachePath}/websit.js`);
    const targets = [];
    for (let i = 0; i < files.length; i++) {
        const { keywords = [] } = files[i];
        if (keywords.includes(key)) targets.push(files[i])
    }
    const len = targets.length
    if (len === 0) return print.Error('关键词不存在')
    if (len === 1) return open(targets[0].url)
    if (len > 1) {
        const { ok, data } = await util.Inquirer([
            {
                type: 'list',
                message: '链接',
                name: 'url',
                choices: targets.map(item => item.url),
            }
        ])
        if (ok) open(data.url)
    }
}