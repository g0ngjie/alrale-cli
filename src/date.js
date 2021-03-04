#!/usr/bin/env node

const Table = require('cli-table2');
const { IsNumber, PrefixZero } = require('./utils');

/**
 * 格式化时间戳
 * @param {String|Number} timestamp 
 */
function formatTs(timestamp) {
    if (!IsNumber(timestamp)) timestamp = Date.now()
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
    const fullMonth = PrefixZero(month)
    const fullDay = PrefixZero(day)
    const fullHour = PrefixZero(hour)
    const fullMinutes = PrefixZero(minutes)
    const fullSeconds = PrefixZero(seconds)

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