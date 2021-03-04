#!/usr/bin/env node

const program = require('commander');
const PKG = require('../package.json');

const {
    download,
    dict,
    print,
    calc,
    date,
    remote,
    os,
} = require('./index');

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

// 远程获取数据
function remoteFunc(cmd) {
    if (cmd.proverbs) remote.GetProverbs()
    else if (cmd.bing) {
        const [limit] = program.args.slice(2)
        remote.GetBingImgList(limit)
    } else remote.GetProverbs()
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
    .action(download.InitTemplate)

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
    .command('remote')
    .alias('r')
    .description('远程获取, default: 获取一言数据')
    .option('-p, --proverbs', '箴言、言语、格言')
    .option('-b, --bing [limit]', '获取必应壁纸列表')
    .action(remoteFunc);

program
    .command('os')
    .description('获取系统参数')
    .action(os.GetOsInfo);

program
    .parse(process.argv);