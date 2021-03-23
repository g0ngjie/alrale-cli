#!/usr/bin/env node

const program = require('commander');
const PKG = require('../package.json');

const {
    template,
    dict,
    print,
    calc,
    date,
    remote,
    os,
    regular,
    byte,
    shell,
    pipe,
    website,
    api_doc,
    color
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

// 获取系统信息
function osFunc(cmd) {
    if (cmd.ipv4) os.GetIp(4)
    else if (cmd.ipv6) os.GetIp(6)
    else os.GetOsInfo()
}

// shell 操作
async function shellFunc(cmd) {
    switch (cmd.ls) {
        case 'npm':
            shell.ShowGlobalNpm()
            break;
        default:
            break;
    }
}

// 管道符
function pipeFunc(cmd) {
    if (cmd.table) return pipe.ShowTable()
    if (cmd.list) return pipe.Show()
    const [target] = program.args.slice(1)
    if (target) pipe.GetCMD(target)
}

// 常用网站
async function openFunc(keywords, cmd) {
    if (cmd.clear) return website.Clear()
    await website.SyncConfig();
    if (cmd.fetch) website.RemoteFetch()
    else if (keywords) website.Open(keywords)
    else if (cmd.t) website.ShowAll()
}

// api文档
function apiDocFunc(cmd) {
    const { yapi, swagger } = cmd
    if (yapi) api_doc.FormatYapi(yapi);
    else if (swagger) api_doc.FormatSwagger(swagger);
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
    .action(template.InitTemplate)

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
    .option('-b, --bing [page]', '获取必应壁纸列表 [page]页数')
    .action(remoteFunc);

program
    .command('os')
    .description('获取系统参数')
    .option('-ip, --ipv4', 'ipv4信息')
    .option('-ip6, --ipv6', 'ipv6信息')
    .action(osFunc);

program
    .command('regular')
    .alias('reg')
    .description('获取常用正则表达式')
    .action(regular.GetRegs);

program
    .command('byte')
    .description('字节转换')
    .action(byte.ByteFmt);

program
    .command('cmd')
    .description('shell 操作')
    .option('-l, --ls [args]', '查询')
    .action(shellFunc);

program
    .command('pipe')
    .alias('p')
    .option('-l, --list', '查看所有命令 (| grep [option])')
    .option('-t, --table', '表格查看所有命令')
    .description('管道符常用命令 (| xargs [options] <command>)')
    .action(pipeFunc);

program
    .command('open [keywords]')
    .alias('o')
    .option('-t', '查看所有')
    .option('-f, --fetch', '远端获取最新')
    .option('-c, --clear', '清空本地用户配置信息')
    .description('常用网站\ncommand:\n[al o -t 查看所有]\n[al o gitee 打开gitee]')
    .action(openFunc);

program
    .command('doc')
    .option('-y, --yapi <file>', '格式化yapi')
    .option('-s, --swagger <file>', '格式化swagger')
    .description('json文件 格式化接口文档')
    .action(apiDocFunc);

program
    .command('color')
    .description('常用颜色Hex表')
    .action(color.ColorTable);

program
    .parse(process.argv);