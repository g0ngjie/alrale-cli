
const download = require("download-git-repo");
const path = require("path");
const rimraf = require("rimraf");

exports.koaBasicServices = async function() {
    return await downloadTemplate('https://gitee.com:gjwork/koa2-basic-services-template#master', 'koa2-basic-services-template')
}

function downloadTemplate(url, target) {
    const dir = path.join(process.cwd(), target); //这里可以自定义下载的地址
    rimraf.sync(dir, {});  //在下载前需要保证路径下没有同名文件
    return new Promise((resolve, reject) => {
        download(url, target, { clone: true }, (err) => {
            if (err) reject(err)
            else resolve(target)
        })
    })
}