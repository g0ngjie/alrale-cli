#!/usr/bin/env node
// 计算器

function convert(input) {
    return parseFloat(input);
}
/**加 */
exports.Add = function (param1, param2) {
    return convert(param1) + convert(param2);
}

/**减 */
exports.Subtract = function (param1, param2) {
    return convert(param1) - convert(param2);
}

/**乘 */
exports.Mutiply = function (param1, param2) {
    return convert(param1) * convert(param2);
}

/**除 */
exports.Divide = function (param1, param2) {
    return convert(param1) / convert(param2);
}

/**平方 */
exports.Square = function (param1, param2) {
    return convert(param1) ** convert(param2)
}