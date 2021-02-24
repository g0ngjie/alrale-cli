#!/usr/bin/env node

const program = require('commander');
const template = require('./remote_template')
const PKG = require('./package.json');

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
    .command('ls')
    .description('查看所有指令')
    .action(onList);

program
    .command('init')
    .description('初始化模板')
    .action(initTemplate)

program
    .parse(process.argv);


/*//////////////// cmd methods /////////////////*/

async function initTemplate() {
    const args = program.args
    if (args.length <= 1) console.log('当前命令不存在')
    else {
        const [, name] = args
        if (name === 'koa') {
            console.log('正在安装...')
            const _path = await template.koaBasicServices()
            printMsg([
                '安装完成!',
                `cd ${_path}`,
                'yarn 或者 npm install 安装依赖',
                'yarn dev 启动开发环境'
            ])
        }
    }
}

function onList() {
    const list = [
        'init koa'
    ]
    printMsg(list);
}



/*//////////////// helper methods /////////////////*/

function printErr(err) {
    console.error('an error occured: ' + err);
}

function printMsg(infos) {
    infos.forEach(function (info) {
        console.log(info);
    });
}
