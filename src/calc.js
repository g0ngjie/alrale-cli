#!/usr/bin/env node
// 计算器

function convert(input) {
    return parseFloat(input);
}
/**加 */
function Add(param1, param2) {
    return convert(param1) + convert(param2);
}

/**减 */
function Subtract(param1, param2) {
    return convert(param1) - convert(param2);
}

/**乘 */
function Mutiply(param1, param2) {
    return convert(param1) * convert(param2);
}

/**除 */
function Divide(param1, param2) {
    return convert(param1) / convert(param2);
}

module.exports = { Add, Subtract, Mutiply, Divide };

