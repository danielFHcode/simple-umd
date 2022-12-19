const fs = require('fs');
const jsdoc2md = require('jsdoc-to-markdown');
const files = require('./files');

const build = (mixin_dir, org_dir, dist_dir) => {
    let out = '';
    out += fs.readFileSync(mixin_dir);
    out += '\n';
    out += jsdoc2md.renderSync({
        files: org_dir,
        "example-lang": 'js'
    })
    fs.writeFileSync(dist_dir, out);
}

build(files.mixinDir, files.orgDir, files.distDir);

module.exports = build;