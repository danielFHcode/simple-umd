# Simple UniversalModuleDefinition

[![License](https://img.shields.io/npm/l/UMD)](https://github.com/probot/template/blob/master/LICENSE)
[![NPM](https://img.shields.io/npm/v/simple-umd)](https://www.npmjs.com/package/simple-umd)
![Number of downloads](https://img.shields.io/npm/dt/simple-umd)
[![Fork on github](https://img.shields.io/github/forks/danielFHcode/simple-umd?style=social)](https://github.com/danielFHcode/simple-umd)

`Universal Module Definition` - or `UMD` for short - is a way of defining modules that work in both [CommonJS](https://nodejs.org/api/modules.html#modules-commonjs-modules), [AMD](https://requirejs.org/docs/whyamd.html#purposes), and [browser globals](https://developer.mozilla.org/en-US/docs/Glossary/Global_object).

Although the idea was conceived [years ago](https://github.com/umdjs/umd), no simple API was ever created. Every time you needed to define a UMD module you would have to recreate the system based on the [templates](https://github.com/umdjs/umd/tree/master/templates). This library proposes a solution for that.

## Installation

You can install UMD through npm:

```console
npm i umd
```

## Usage

You can import UMD through whatever module system you like:

```js
// Browser Globals
umd;

// CommonJS
const umd = require('umd');

// AMD
define( ['umd'], function(umd){} );

// ES6 Modules
import umd from 'path/to/umd.module.js';
```

There are plenty of ways to define your module, but they all follow the same structure:

```js
umd.define({
 moduleName: 'module',
 dependencies: [ /* ... */ ],
 factory: () => {
  // some code...
 }
})
```

For more details you can view the [documentation](#documentation)

## Documentation

You can view the documentation on this library's [github page]().
