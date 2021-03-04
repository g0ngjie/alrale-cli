#!/usr/bin/env node

const inquirer = require('inquirer')

/**非负浮点数（正浮点数 + 0） */
const NotNegativeFloatReg = /^\d+(\.\d+)?$/;
/**非正浮点数（负浮点数 + 0） */
const NotPositiveFloatReg = /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;

/**
 * 判断数字类型,(包含字符串类型数字)
 * @param {any} target 
 */
exports.IsNumber = function (target) {
    return NotNegativeFloatReg.test(target) || NotPositiveFloatReg.test(target)
}

/**
 * 整数前置补零
 * @param {number|string} target 
 * @param {number} places 位数，默认2 -> 10
 */
exports.PrefixZero = function (target, places = 2) {
    if (!exports.IsNumber(target)) return ''
    const condition = 10 ** (places - 1)
    if (+target < condition) {
        return (Array(places).join('0') + target).slice(-places)
    }
    return target + '';
}

/**
 * 移除引号
 * @param {String} str 
 */
exports.ClearQuotes = function (str) {
    return str.replace(/\"|\'/g, "")
}

/**
 * 终端交互
 * @param {Array} prompts 
 */
exports.Inquirer = function (prompts = []) {
    return new Promise(resolve => {
        inquirer
            .prompt(prompts)
            .then(answers => {
                resolve({ ok: true, data: answers })
            })
            .catch(error => {
                if (error.isTtyError) resolve({ ok: false, msg: '不能在当前环境下呈现' })
                else resolve({ ok: false, msg: error + '' })
            });
    })
}