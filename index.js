#!/usr/bin/env node

const program = require('commander');
const PKG = require('./package.json');
const ora = require('ora');
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

/**
 * 计算器
 * @param {Boolean} first 第一次
 * @param {Number} total 计算数
 * @param {String} currentOperator 当前运算符
 */
async function calcFunc(first, total, currentOperator) {
    const initPrompts = [{ type: 'list', name: 'operator', choices: ["+", "-", "*", "/", "**"] }]
    const selectConfig = [{ type: 'input', prefix: '<number>|e:exit|s:select', name: 'target' }]
    let conf = first ? initPrompts : selectConfig

    const { ok, msg, data } = await util.Inquirer(conf);
    if (ok) {
        const { operator, target } = data;
        if (operator) currentOperator = operator
        else if (target) {
            // 退出
            if (target === 'e') {
                print.Message('exit!')
                process.exit(0)
            }
            else if (target === 's') {
                calcFunc(true, total)
                return
            }
            if (!total) total = +target
            if (!util.IsNumber(target)) print.Error('类型不正确')
            else if (total) {
                switch (currentOperator) {
                    case '+':
                        total = calc.Add(total, +target)
                        break;
                    case '-':
                        total = calc.Subtract(total, +target)
                        break;
                    case '*':
                        total = calc.Mutiply(total, +target)
                        break;
                    case '/':
                        total = calc.Divide(total, +target)
                        break;
                    case '**':
                        total = calc.Square(+total, +target)
                        break;
                    default:
                        break;
                }
            }
        }
    }
    else print.Error(msg)
    if (total) print.Message(total)
    calcFunc(false, total, currentOperator)
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
    .action(queryByDictionary);

program
    .command('ts [timestamp]')
    .description('格式化时间戳,默认查询当前时间')
    .action(fmtTs);

program
    .command('calc')
    .alias('c')
    .description('计算器')
    .action(() => calcFunc(true));

program
    .parse(process.argv);