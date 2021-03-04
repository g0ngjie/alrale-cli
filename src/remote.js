#!/usr/bin/env node

const print = require('./print')
const util = require('./utils')

// 箴言、言语、格言

/**
 * 获取一言数据
 */
exports.GetProverbs = async function () {
    const url = 'https://v1.hitokoto.cn'
    const { ok, msg, data } = await util.Get(url)
    if (ok) print.Message(data)
    else print.Error(msg)
}

/**
 * 获取必应图列表
 * @param {Number} limit 
 */
exports.GetBingImgList = async function (limit = 10) {
    const BING_URL = "https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=" + limit;
    const BASE_URL = "https://www.bing.com";
    const { ok, msg, data } = await util.Get(BING_URL)
    if (ok) print.Message(data)
    else print.Error(msg)
}