#!/usr/bin/env node

const util = require('./utils')
const path = require('path');
const print = require('./print');
const open = require('open');
const fs = require('fs');

// 缓存目录
const CachePath = path.join(__dirname, '..', '.cache/note')

/**是否存在文件, 不存在则自动fetch */
async function fetchSync() {
    const exists = fs.existsSync(CachePath);
    if (!exists) await exports.RemoteFetch()
}

/**远端获取最新 */
exports.RemoteFetch = function () {
    const url = 'https://gitee.com:gjwork/note#master'
    return util.DownloadTemplate(url, CachePath, true)
}

/**查看所有 */
exports.ShowAll = async function () {
    await fetchSync();
    const files = require(`${CachePath}/websit.js`);
    const json = (files || []).map(item => {
        const { keywords, url, description } = item || {};
        return `${(keywords || []).join()} ${url} ${description}`
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