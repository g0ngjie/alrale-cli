const os = require('os')
const Table = require('cli-table2');
const { print } = require('.');

/**
 * 获取系统参数
 */
exports.GetOsInfo = function () {
    const {
        arch, // cpu(处理器架构)
        cpus, // cpu信息
        freemem, // 空闲内存字节
        hostname, // 主机名
        platform, // 操作系统类型
        release, // 操作系统版本
        totalmem, // 系统总内存
        type, // 操作系统名称
    } = os
    const _cpus = cpus()
    const { model } = _cpus[0]
    const _cpuNumber = _cpus.length
    // 兆
    const _freemem = (freemem() / (1 << 30)).toFixed(2)
    const _totalmem = (totalmem() / (1 << 30)).toFixed(2)

    const table = new Table({
        head: [
            'cpu',
            '处理器架构',
            '核数',
            '空闲内存字节',
            '主机名',
            '操作系统类型',
            '操作系统版本',
            '系统总内存',
            '操作系统名称'
        ]
    })
    table.push([model, arch(), _cpuNumber, _freemem, hostname(), platform(), release(), _totalmem, type()]);
    print.Message(table.toString())
}

/**
 * 获取ip信息
 * @param {Number} type ipv4|ipv6
 */
exports.GetIp = function (type) {
    const networks = os.networkInterfaces()
    const list = []
    Object.keys(networks).forEach(key => {
        const cacheList = []
        networks[key].forEach(item => {
            const { family, cidr } = item
            // IPv4
            if (family.includes(type)) cacheList.push([key, family, cidr])
        })
        list.push(...cacheList)
    })

    const table = new Table()
    table.push(...list);
    print.Message(table.toString())
}