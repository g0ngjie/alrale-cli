#!/usr/bin/env node

const program = require('commander');
const template = require('./remote_template')
const PKG = require('./package.json');
const chalk = require("chalk");
const ora = require('ora');
const Table = require('cli-table2') // 表格输出
const superagent = require('superagent') // http请求 

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
        if (!args.length) return printErr('请输入查询参数')
        const word = args.join(' ');
        queryByDictionary(word)
    });

program
    .parse(process.argv);


/*//////////////// cmd methods /////////////////*/

async function initTemplate() {
    const args = program.args
    if (args.length <= 1) console.log('当前命令不存在')
    else {
        const [, name] = args
        const spinner = ora('Loading...').start();
        spinner.color = 'cyan';
        if (name === 'koa') {
            spinner.text = '正在安装...';
            const _path = await template.koaBasicServices()
            spinner.succeed('安装完成!')
            spinner.stop()
            printMsg([
                `cd ${_path}`,
                'yarn 或者 npm install 安装依赖',
                'yarn dev 启动开发环境'
            ])
        }
    }
}

function queryByDictionary(word) {
    const url = `http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1`;

    superagent.get(url)
        .query({
            q: word
        })
        .end((err, res) => {
            if (err) {
                printErr('excuse me, try again')
                return false
            }
            let data = JSON.parse(res.text);
            let result = {};
            // 返回的数据处理
            if (data.basic) result[word] = data['basic']['explains'];
            else if (data.translation) result[word] = data['translation'];
            else printErr('error')
            // 输出表格
            let table = new Table();
            table.push(result);
            printMsg([table.toString()])
        })
}


/*//////////////// helper methods /////////////////*/

function printErr(errMsg) {
    console.log(chalk.red('--', errMsg, '--'));
}

function printMsg(infos) {
    infos.forEach(function (info) {
        console.log(chalk.cyanBright(info));
    });
}
