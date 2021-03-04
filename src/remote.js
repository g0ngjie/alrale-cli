#!/usr/bin/env node

const print = require('./print')
const util = require('./utils')

// 箴言、言语、格言

/**
 * 获取一言数据
 */
exports.GetProverbs = async function () {
    const url = 'https://v1.hitokoto.cn'
    const { ok, msg, data } = await util.HttpsGet(url)
    if (ok) {
        const { hitokoto, from } = JSON.parse(data)
        print.Message(`${hitokoto} ———— ${from}`)
    }
    else print.Error(msg)
}

/**
 * 获取必应图列表
 * @param {Number} page 页数
 */
exports.GetBingImgList = async function (page = 1) {
    // const BING_URL = "https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=" + limit;
    const start = (page - 1) * 8
    const url = `http://cn.bing.com/HPImageArchive.aspx?format=js&idx=${start}&n=8&mkt=zh-CN`
    const BASE_URL = "https://www.bing.com";
    const { ok, msg, data } = await util.HttpGet(url)
    if (ok) {
        let resData;
        if ('[object Uint8Array]' === Object.prototype.toString.call(data)) {
            try {
                resData = JSON.parse(data.toString())
            } catch (error) {
                return print.Error('解析失败了~')
            }
        } else if ('[object Object]' === Object.prototype.toString.call(data)) {
            resData = data
        }
        const { images = [] } = resData || {}
        const rows = images.map((item, i) => {
            return [`${i + 1} ${item.copyright}`, `${BASE_URL}${item.url}`]
        });
        const table = util.GetTable(rows)
        print.Message(table)
    }
    else print.Error(msg)
}