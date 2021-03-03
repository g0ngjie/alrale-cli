const chalk = require("chalk");

exports.printErr = function (errMsg) {
    console.log(chalk.red('--', errMsg, '--'));
}

exports.printMsgs = function (infos) {
    infos.forEach(function (info) {
        console.log(chalk.cyanBright(info));
    });
}

exports.printMsg = function (info) {
    console.log(chalk.cyanBright(info))
}