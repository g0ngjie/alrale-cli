#!/usr/bin/env node

const util = require('./utils')
const print = require('./print')

/**进位 */
function _carryBit(t, index) {
    return t * (1024 ** (index - 1)) * 8
}

/**降位 */
function _dropBit(t, index) {
    return t / (1024 ** (index - 1)) / 8
}

function _up(t, index) {
    // return t >> (index * 10)
    return t / (1024 ** index)
}
function _down(t, index) {
    // return t << (index * 10)
    return t * (1024 ** index)
}


function _format(target) {
    return {
        Bit: {
            toBit: () => target,
            toByte: () => _dropBit(target, 1),
            toKB: () => _dropBit(target, 2),
            toMB: () => _dropBit(target, 3),
            toGB: () => _dropBit(target, 4),
            toTB: () => _dropBit(target, 5),
        },
        Byte: {
            toBit: () => _carryBit(target, 1),
            toByte: () => target,
            toKB: () => _up(target, 1),
            toMB: () => _up(target, 2),
            toGB: () => _up(target, 3),
            toTB: () => _up(target, 4),
        },
        KB: {
            toBit: () => _carryBit(target, 2),
            toByte: () => _down(target, 1),
            toKB: () => target,
            toMB: () => _up(target, 1),
            toGB: () => _up(target, 2),
            toTB: () => _up(target, 3),
        },
        MB: {
            toBit: () => _carryBit(target, 3),
            toByte: () => _down(target, 2),
            toKB: () => _down(target, 1),
            toMB: () => target,
            toGB: () => _up(target, 1),
            toTB: () => _up(target, 2),
        },
        GB: {
            toBit: () => _carryBit(target, 4),
            toByte: () => _down(target, 3),
            toKB: () => _down(target, 2),
            toMB: () => _down(target, 1),
            toGB: () => target,
            toTB: () => _up(target, 1),
        },
        TB: {
            toBit: () => _carryBit(target, 5),
            toByte: () => _down(target, 4),
            toKB: () => _down(target, 3),
            toMB: () => _down(target, 2),
            toTB: () => target,
            toGB: () => _down(target, 1),
        },
    }
}

/**
 * 字节转换
 * @param {number} b byte
 */
exports.ByteFmt = async function () {
    const prompts = [
        { type: 'rawlist', name: 'from', choices: ['Bit', 'Byte', 'KB', 'MB', 'GB', 'TB']},
        { type: 'rawlist', name: 'to', choices: ['Bit', 'Byte', 'KB', 'MB', 'GB', 'TB'] },
        { type: 'input', name: 'byte' }
    ]

    const { ok, msg, data } = await util.Inquirer(prompts);
    if (ok) {
        const { from, to, byte } = data;
        if (!util.IsNumber(byte)) return print.Error('参数错误')
        const result = _format(byte)[from][`to${to}`]()
        print.Message(`${result} ${to}`)
    }
    else print.Error(msg)
}