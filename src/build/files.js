const path = require('path');

module.exports = {
    orgDir: path.join(__dirname, '../index.js'),
    orgDirUmd: path.join(__dirname, '../umdMixin.js'),
    orgDirMod: path.join(__dirname, '../moduleMixin.js'),
    orgDirCjs: path.join(__dirname, '../cjsMixin.js'),
    distDirUmd: path.join(__dirname, '../../dist/umd.js'),
    distDirMin: path.join(__dirname, '../../dist/umd.min.js'),
    distDirMod: path.join(__dirname, '../../dist/umd.module.js'),
    distDirCjs: path.join(__dirname, '../../dist/umd.cjs')
}