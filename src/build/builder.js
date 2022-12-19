const fs = require('fs');
const babel = require('@babel/core');
const files = require('./files');

function applyBabel(code, {
    min = false
} = {}){
    return babel.transform(code, {
        presets: [
            ["@babel/env", {
                "targets": "<0.25%, not dead"
            }]
        ],
        generatorOpts: {
            comments: !min,
            minified: min
        }
    }).code
}

function build(){
    const file = fs.readFileSync(files.orgDir) + '\n\n';
    let umd = file + fs.readFileSync(files.orgDirUmd);
    umd = applyBabel(umd);
    let min = umd;
    min = applyBabel(min, { min: true });
    let mod = applyBabel(file);
    mod += fs.readFileSync(files.orgDirMod);
    let cjs = file + fs.readFileSync(files.orgDirCjs);
    cjs = applyBabel(cjs);
    
    fs.writeFileSync(files.distDirUmd, umd);
    fs.writeFileSync(files.distDirMin, min);
    fs.writeFileSync(files.distDirMod, mod);
    fs.writeFileSync(files.distDirCjs, cjs);
}

module.exports = build;

build();