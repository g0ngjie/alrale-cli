#!/usr/bin/env node

// 字典
const superagent = require('superagent') // http请求 
const { GetTable } = require('./utils')

const url = `http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1`;

exports.Query = function (word) {
    return new Promise(resolve => {
        superagent.get(url)
            .query({ q: word })
            .end((err, res) => {
                if (err) resolve({ ok: false, msg: '对不起,再试一次' })
                let data = JSON.parse(res.text);
                let result = {};
                // 返回的数据处理
                if (data.basic) result[word] = data['basic']['explains'];
                else if (data.translation) result[word] = data['translation'];
                else resolve({ ok: false, msg: '查询异常' })
                // 输出表格
                const table = GetTable([result])
                resolve({ ok: true, msg: table })
            })
    })
}