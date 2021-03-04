const os = require('os')

/**
 * 获取系统参数
 */
exports.GetOsInfo = function () {
    const {
        arch, // cpu(处理器架构)
        cpus, // cpu信息
        freemem, // 空闲内存字节
        homedir, // 当前登录用户的根目录
        hostname, // 主机名
    } = os
    const _arch = arch()
    const _cpus = cpus()
    const { model } = _cpus[0]
    const _cpuModel = model
    const _cpuNumber = _cpus.length
    // 兆
    const _freemem = (freemem() / (1 << 30)).toFixed(2)
    const _homedir = homedir()
    const _hostname = hostname()
    console.log('[debug]_arch-> ', _arch);
    console.log('[debug]_cpuModel-> ', _cpuModel);
    console.log('[debug]_cpuNumber-> ', _cpuNumber);
    console.log('[debug]_freemem-> ', _freemem);
    console.log('[debug]_homedir-> ', _homedir);
    console.log('[debug]_hostname-> ', _hostname);
}