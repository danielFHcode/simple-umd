const fs = require('fs');
const build = require('./builder');
const files = require('./files');

fs.watch(files.orgDir, () => build());
fs.watch(files.orgDirUmd, () => build());
fs.watch(files.orgDirMod, () => build());
fs.watch(files.orgDirCjs, () => build());