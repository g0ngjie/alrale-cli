#!/usr/bin/env node

const program = require('commander');
const PKG = require('./package.json');
const ora = require('ora');
const readline = require('readline');
const { remoteTemplate, dict, print, calc, date, util } = require('./src/index');

/* ========== cmd methods ========== */
// 模板下载
async function initTemplate() {
    const { ok, msg, data } = await util.Inquirer([{
        type: 'list',
        message: '模板选择',
        name: 'template',
        choices: ["koa2-basic-template"],
    }])

    if (!ok) return print.Error(msg)
    const spinner = ora('Loading...').start();
    spinner.color = 'cyan';
    spinner.text = '正在安装...';
    const { template } = data;
    let successMsg = []
    // 下载koa模板
    switch (template) {
        case 'koa2-basic-template':
            const _path = await remoteTemplate.KoaBasicServices()
            successMsg = [
                `cd ${_path}`,
                'yarn 或者 npm install 安装依赖',
                'yarn dev 启动开发环境'
            ]
            break;
        default:
            break;
    }
    spinner.succeed('安装完成!')
    spinner.stop()
    print.Messages(successMsg)
}

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

// 计算器
function calcFunc() {

    // const rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // rl.on('line', function (line) {
    //     let count;
    //     if (line === 'exit' || line === 'e') {
    //         print.Message('--退出--')
    //         process.exit(0)
    //     }

    //     Inquirer([{
    //         type: 'list',
    //         message: '计算方式:',
    //         name: 'symbol',
    //         choices: ["+", "-", "*", "/", "**"],
    //     }]).then(({ ok, msg, data }) => {
    //         if (ok) {
    //             const { symbol } = data
    //             console.log('[debug]symbol-> ', symbol);
    //         }
    //         else print.Error(msg)
    //     })
    // })

    // rl.on('close', function() {
    //     count = void 0
    //     process.exit(0);
    // })
    // return
    let result
    const [a, operator, b] = program.args.slice(1)
    if (!a || !operator || !b) return print.Error('查询格式不正确，a [symbol] b')
    switch (operator) {
        case '+':
            result = calc.Add(a, b);
            break;
        case '-':
            result = calc.Subtract(a, b);
            break;
        case '*':
            result = calc.Mutiply(a, b);
            break;
        case '/':
            result = calc.Divide(a, b);
            break;
        default:
            print.Error('符号不正确')
            break;
    }
    print.Message(result)
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
    .action(initTemplate)

program
    .command('q <word|expressions>')
    .description('翻译,查询中|英文单词，词句')
    .action(() => queryByDictionary());

program
    .command('ts [timestamp]')
    .description('格式化时间戳,默认查询当前时间')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(() => fmtTs());

program
    .command('calc')
    .alias('c')
    .description('计算器 [a +|-|*|/ b]')
    .action(() => calcFunc());

program
    .parse(process.argv);