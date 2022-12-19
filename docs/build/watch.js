const build = require('./builder');
const files = require('./files');
const fs = require('fs');

fs.watch(files.orgDir, () => build(files.mixinDir, files.orgDir, files.distDir))
fs.watch(files.mixinDir, () => build(files.mixinDir, files.orgDir, files.distDir))