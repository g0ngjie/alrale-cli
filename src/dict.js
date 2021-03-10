#!/usr/bin/env node

// 字典
const superagent = require('superagent') // http请求 
const { GetTable } = require('./utils')
const ora = require('ora');

function queryByYoudao(word) {
    return new Promise(resolve => {
        const url = `http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1`;
        const spinner = ora().start();
        spinner.color = 'cyan';
        superagent.get(url)
            .query({ q: word })
            .end((err, res) => {
                spinner.stop()
                if (err) resolve({ ok: false, msg: '对不起,再试一次' })
                let data = JSON.parse(res.text);
                let result = {};
                // 返回的数据处理
                if (data.basic) result[word] = data['basic']['explains'];
                else if (data.translation) result[word] = data['translation'];
                else resolve({ ok: false, msg: '查询异常' })
                resolve({ ok: true, msg: result })
            })
    })
}

/**
 * 单查询
 */
exports.Query = async function (word) {
    const { ok, msg } = await queryByYoudao(word);
    if (ok) {
        // 输出表格
        const table = GetTable([msg])
        return { ok, msg: table }
    } else return { ok, msg }
}