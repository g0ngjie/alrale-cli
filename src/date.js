const Table = require('cli-table2')

/**非负浮点数（正浮点数 + 0） */
const NotNegativeFloatReg = /^\d+(\.\d+)?$/;
/**非正浮点数（负浮点数 + 0） */
const NotPositiveFloatReg = /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;

/**
 * 判断数字类型,(包含字符串类型数字)
 * @param {any} target 
 */
function isNumber(target) {
    return NotNegativeFloatReg.test(target) || NotPositiveFloatReg.test(target)
}

/**
 * 整数前置补零
 * @param {number|string} target 
 * @param {number} places 位数，默认2 -> 10
 */
function prefixZero(target, places = 2) {
    if (!isNumber(target)) return ''
    const condition = 10 ** (places - 1)
    if (+target < condition) {
        return (Array(places).join('0') + target).slice(-places)
    }
    return target + '';
}

/**
 * 格式化时间戳
 * @param {String|Number} timestamp 
 */
function formatTs(timestamp) {
    if (!isNumber(timestamp)) timestamp = Date.now()
    let ts = +timestamp;
    // 13位毫(秒) 10位(秒)
    const tsLen = String(timestamp).length
    if (tsLen === 10) ts *= 1000
    const _date = new Date(ts)
    const year = _date.getFullYear()
    const month = _date.getMonth() + 1
    const week = _date.getDay()
    const day = _date.getDate()
    const hour = _date.getHours()
    const minutes = _date.getMinutes()
    const seconds = _date.getSeconds()
    const milliseconds = _date.getMilliseconds()
    const fullMonth = prefixZero(month)
    const fullDay = prefixZero(day)
    const fullHour = prefixZero(hour)
    const fullMinutes = prefixZero(minutes)
    const fullSeconds = prefixZero(seconds)

    const YMD = [year, '-', month, '-', day, ' ', hour, ':', minutes, ':', seconds].join('')
    const FullYMD = [year, '-', fullMonth, '-', fullDay, ' ', fullHour, ':', fullMinutes, ':', fullSeconds].join('')

    const table = new Table({
        head: ['\\', '年', '月', '日', '星期', '时', '分', '秒', '毫秒', 'YMD Hms', 'timestamp'],
    })
    table.push(
        ['简', year, month, day, week, hour, minutes, seconds, milliseconds, YMD, timestamp],
        ['繁', year, fullMonth, fullDay, week, fullHour, fullMinutes, fullSeconds, milliseconds, FullYMD, timestamp]
    );
    return table.toString()
}


exports.FmtTimestamp = function (ts) {
    const msg = formatTs(ts)
    return { ok: true, msg }
}