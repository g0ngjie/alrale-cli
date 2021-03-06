#!/usr/bin/env node

const { util, print } = require("./index")

/**查看全局已被安装过的npm包 */
exports.ShowGlobalNpm = async function () {
    const npmShell = util.GetPlatform().isWindow ? 'npm.cmd' : 'npm'
    print.Message('查询全局npm包')
    const { ok, msg, data } = await util.Shell(npmShell, ['list', '-g', '--dept', 0])
    if (ok) print.Message(data)
    else print.Error(msg)
}