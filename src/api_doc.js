#!/usr/bin/env node

const path = require('path');
const fsExtra = require('fs-extra');
const { print } = require('./index');

function isArrEmpty(arr) {
    return arr.length === 0
}

function fmtYapiSchemas(list, isHeader) {
    const schemas = list.map(item => {
        let cache = {}
        if (isHeader) {
            const { name, required, value } = item
            cache = {
                [name]: value || 'any',
                required: !!+required
            }
        } else {
            const { name, type, required, desc, example } = item
            cache = {
                [name]: type === 'text' ? 'string' : type || example || 'any',
                required: !!+required,
            }
            if (desc) cache.desc = desc
        }
        return cache
    })
    return schemas
}

exports.FormatYapi = function (file) {
    const cwd = process.cwd();
    const file_path = path.join(cwd, file);
    const getData = require(file_path) || [];

    const putData = []
    getData.forEach(data => {
        const { name, list } = data
        const cache = { name, apis: [] }
        list.forEach(item => {
            const {
                title,
                method,
                path,
                tag,
                req_query,
                req_body_form,
                req_headers,
            } = item

            const body = fmtYapiSchemas(req_body_form || [])
            const query = fmtYapiSchemas(req_query || [])
            const headers = fmtYapiSchemas(req_headers || [], true)
            const putCache = {
                title,
                method,
                path,
            }
            if (!isArrEmpty(tag)) putCache.tag = tag
            if (!isArrEmpty(body)) putCache.body = body
            if (!isArrEmpty(query)) putCache.query = query
            if (!isArrEmpty(headers)) putCache.headers = headers
            cache.apis.push(putCache)
        })
        putData.push(cache)
    })
    try {
        const putPath = path.join(process.cwd(), 'yapi.json')
        fsExtra.writeFileSync(putPath, JSON.stringify(putData, '', '\t'));
        print.Message(`文件生成 ${putPath} !!!`)
    } catch (error) {
        print.Error('格式化出现了不可预知的错误')
    }
}

exports.FormatSwagger = function (file) {

}