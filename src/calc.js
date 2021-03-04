#!/usr/bin/env node

const { print } = require(".");
const util = require('./utils')

// 计算器

function convert(input) {
    return parseFloat(input);
}
/**加 */
function add(param1, param2) {
    return convert(param1) + convert(param2);
}

/**减 */
function subtract(param1, param2) {
    return convert(param1) - convert(param2);
}

/**乘 */
function mutiply(param1, param2) {
    return convert(param1) * convert(param2);
}

/**除 */
function divide(param1, param2) {
    return convert(param1) / convert(param2);
}

/**平方 */
function square(param1, param2) {
    return convert(param1) ** convert(param2)
}

/**
* 计算器
* @param {Boolean} first 第一次
* @param {Number} total 计算数
* @param {String} currentOperator 当前运算符
*/
exports.Calc = async function (first, total, currentOperator) {
    const initPrompts = [{ type: 'rawlist', name: 'operator', choices: ["+", "-", "*", "/", "**"] }]
    const selectConfig = [{ type: 'input', prefix: '<number>|q:quit|s:select|c:clear\n', name: 'target' }]
    let conf = first ? initPrompts : selectConfig

    const { ok, msg, data } = await util.Inquirer(conf);
    if (ok) {
        const { operator, target } = data;
        if (operator) currentOperator = operator
        else if (target) {
            // 退出
            if (target === 'q') {
                print.Message('quit!')
                process.exit(0)
            }
            // 清空
            else if (target === 'c') {
                print.Message('重新计算')
                return exports.Calc(true)
            }
            else if (target === 's') return exports.Calc(true, total)
            // 初始化 total
            if (!total) {
                total = +target
                return exports.Calc(false, total, currentOperator)
            }
            if (!util.IsNumber(target)) print.Error('类型不正确')
            else if (total || total === 0) {
                switch (currentOperator) {
                    case '+':
                        total = add(total, +target)
                        break;
                    case '-':
                        total = subtract(total, +target)
                        break;
                    case '*':
                        total = mutiply(total, +target)
                        break;
                    case '/':
                        total = divide(total, +target)
                        break;
                    case '**':
                        total = square(+total, +target)
                        break;
                    default:
                        break;
                }
            }
        }
    }
    else print.Error(msg)
    if (total || total === 0) print.Message(total)
    exports.Calc(false, total, currentOperator)
}