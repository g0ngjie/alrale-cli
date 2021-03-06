#!/usr/bin/env node

const { print, util } = require("./index")

const Config = {
    npm: { title: '全局npm包', cmd: 'list -g --dept 0' },
}
// 管道符常用命令
exports.GetCMD = function (target) {
    const shell = Config[target]
    print.Message(shell && shell.cmd)
}

/**查看命令 */
exports.Show = function () {
    const rows = []
    for (const key in Config) {
        if (Object.hasOwnProperty.call(Config, key)) {
            const { cmd } = Config[key];
            rows.push(`${key}: ${cmd}`)
        }
    }
    print.Messages(rows)
}

/**表格查看 */
exports.ShowTable = function () {
    const head = ['Option', 'Command', 'Details']
    const rows = []
    for (const key in Config) {
        if (Object.hasOwnProperty.call(Config, key)) {
            const { cmd, title } = Config[key];
            rows.push([key, cmd, title])
        }
    }
    const table = util.GetTable(rows, head)
    print.Message(table)
}