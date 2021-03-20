#!/usr/bin/env node

const util = require('./utils');
const { CustomColor } = require('./print');

exports.ColorTable = function() {
    
    const conf = [
        // ElementUI Color
        ['ElementUI', 'Brand Color', 'Success', 'Warning', 'Danger', 'Info', '主要文字', '常规文字', '次要文字', '占位文字', '一级边框', '二级边框', '三级边框', '四级边框'],
        ['', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#303133', '#606266', '#909399', '#C0C4CC', '#DCDFE6', '#E4E7ED', '#EBEEF5', '#F2F6FC'],
    ]
    const tables = []
    for (let i = 0; i < conf.length; i++) {
        tables[i] = []
        const cols = conf[i];
        for (let j = 0; j < cols.length; j++) {
            const col = cols[j];
            if (i % 2 === 1) tables[i].push(CustomColor(col, col))
            else tables[i].push(col)
        }
    }

    const table = util.GetTable(tables)
    console.log(table)
}