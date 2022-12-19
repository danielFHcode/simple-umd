const path = require('path');

const mixinDir = path.join(__dirname,'./mixin.md');
const orgDir = path.join(__dirname,'../../src/index.js');
const distDir = path.join(__dirname,'../docs.md');

module.exports = {
    mixinDir,
    orgDir,
    distDir
};