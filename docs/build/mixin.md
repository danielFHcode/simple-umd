# The `Simple UniversalModuleDefinition` Documentation

## Installation

You can install umd through npm:

```console
npm i umd
```

Here is a table of each file's path relative to the npm package's root (  `node_modules/umd/...`  ):

| Environment                             | File Name          |
| --------------------------------------- | ------------------ |
| UMD (AMD, CommonJS, or Browser Globals) | dist/umd.js        |
| Min file (UMD file minified)            | dist/umd.min.js    |
| CommonJS (NodeJS)                       | dist/umd.cjs       |
| ES6 Modules (import/export)             | dist/umd.module.js |


By nature, you can use UMD with any module system you like (although it's probably best to use a bundler):
```js
// Browser Globals
umd;

// CommonJS
const umd = require('umd');

// AMD
define( ['umd'], function(umd){} );

// ES6 Modules
import umd from 'path/to/umd.module.js';


// UMD (ha ha)
umd.define({
    moduleName: 'module',
    dependencies: ['umd'],
    factory: function(umd){}
})
```

> ⚠: **When creating libraries with umd it's recommended to use `umd.module.js` or `umd.cjs` in combination with a module bundler**  because that way it doesn't pollute the global scope.