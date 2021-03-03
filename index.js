#!/usr/bin/env node

const program = require('commander');
const PKG = require('./package.json');
const ora = require('ora');
const { remoteTemplate, dict, print, calculator } = require('./src/index')

/* ========== cmd methods ========== */
async function initTemplate() {
    const args = program.args
    if (args.length <= 1) print.Error('当前命令不存在')
    else {
        const [, name] = args
        const spinner = ora('Loading...').start();
        spinner.color = 'cyan';
        if (name === 'koa') {
            spinner.text = '正在安装...';
            const _path = await remoteTemplate.koaBasicServices()
            spinner.succeed('安装完成!')
            spinner.stop()
            print.Messages([
                `cd ${_path}`,
                'yarn 或者 npm install 安装依赖',
                'yarn dev 启动开发环境'
            ])
        }
    }
}

async function queryByDictionary(word) {
    const { ok, msg } = await dict.query(word)
    if (ok) print.Message(msg)
    else print.Error(msg)
}

/* ========== commander ========== */
program
    .version(PKG.version, '-v, -version')
    .option('-f, --foo', 'enable some foo')
    .option('-b, --bar', 'enable some bar')
    .option('-B, --baz', 'enable some baz');

program
    .command('help', { isDefault: true })
    .description('帮助')
    .action(function () {
        program.outputHelp();
    });

program
    .command('init')
    .description('初始化模板 [koa]')
    .action(initTemplate)

program
    .command('q')
    .description('翻译 [...args]')
    .action(() => {
        const [, ...args] = program.args
        if (!args.length) return print.Error('请输入查询参数')
        const word = args.join(' ');
        queryByDictionary(word)
    });

program
    .parse(process.argv);