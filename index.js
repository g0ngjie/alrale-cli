#!/usr/bin/env node

const program = require('commander');
const PKG = require('./package.json');

const { remoteTemplate: Rt, dict, print, calc, date } = require('./src/index');

/* ========== cmd methods ========== */

// 查询字典
async function queryByDictionary() {
    const args = program.args.slice(1)
    const word = args.join(' ');
    const { ok, msg } = await dict.Query(word)
    if (ok) print.Message(msg)
    else print.Error(msg)
}

// 格式化时间戳
function fmtTs() {
    const [ts] = program.args.slice(1)
    const { ok, msg } = date.FmtTimestamp(ts)
    if (ok) print.Message(msg)
}

/* ========== commander ========== */
program
    .version(PKG.version, '-v, -version')

program
    .command('help', { isDefault: true })
    .description('帮助')
    .action(() => program.outputHelp());

program
    .command('init')
    .description('初始化模板')
    .action(Rt.InitTemplate)

program
    .command('q <word|expressions>')
    .description('翻译,查询中|英文单词，词句')
    .action(queryByDictionary);

program
    .command('ts [timestamp]')
    .description('格式化时间戳,默认查询当前时间')
    .action(fmtTs);

program
    .command('calc')
    .alias('c')
    .description('计算器')
    .action(() => calc.Calc(true));

program
    .parse(process.argv);