const chalk = require("chalk");

exports.Error = function (errMsg) {
    console.log(chalk.red('--', errMsg, '--'));
}

exports.Messages = function (infos) {
    infos.forEach(function (info) {
        console.log(chalk.cyanBright(info));
    });
}

exports.Message = function (info) {
    console.log(chalk.cyanBright(info))
}