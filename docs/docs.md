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
## Modules

<dl>
<dt><a href="#module_UMD">UMD</a></dt>
<dd><p>The UniversalModuleDefinition Module.
Everything under this module is going to bee under the umd object:</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#UMDTypeError">UMDTypeError</a></dt>
<dd><p>The Error that&#39;s thrown when there&#39;s a type error in the define functions&#39; parameters.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#umdModule">umdModule</a> : <code>Object</code></dt>
<dd><p>An object containing the different names of a module across different environments.</p>
<ul>
<li>In any place <a href="#umdModule">umdModule</a> is used, you can use a string instead.</li>
</ul>
</dd>
<dt><a href="#umdFactoryFunction">umdFactoryFunction</a> ⇒ <code>any</code></dt>
<dd></dd>
<dt><a href="#umdArgsObject">umdArgsObject</a> : <code>Object</code></dt>
<dd><p>The parameters for the define functions.</p>
</dd>
</dl>

<a name="module_UMD"></a>

## UMD
The UniversalModuleDefinition Module.Everything under this module is going to bee under the umd object:

**Example**  
```js
umd.define({ moduleName: 'module', factory: () => {  // some code... }})
```

* [UMD](#module_UMD)
    * [~define(args)](#module_UMD..define) ⇒ <code>undefined</code>
    * [~defineAMD(args)](#module_UMD..defineAMD) ⇒ <code>boolean</code>
    * [~defineCJS(args)](#module_UMD..defineCJS) ⇒ <code>boolean</code>
    * [~defineWeb(args)](#module_UMD..defineWeb) ⇒ <code>boolean</code>
    * [~defineAmdWeb(args)](#module_UMD..defineAmdWeb) ⇒ <code>undefined</code>
    * [~defineAmdCjs(args)](#module_UMD..defineAmdCjs) ⇒ <code>undefined</code>

<a name="module_UMD..define"></a>

### UMD~define(args) ⇒ <code>undefined</code>
With this function you can define a module that will be universally supported across AMD, CommonJS, and regular browsers.* Based on [https://github.com/umdjs/umd/blob/master/templates/returnExports.js](https://github.com/umdjs/umd/blob/master/templates/returnExports.js)* All of the `define` functions follow the same syntax:

**Kind**: inner method of [<code>UMD</code>](#module_UMD)  
**Returns**: <code>undefined</code> - Nothing.  

| Param | Type |
| --- | --- |
| args | [<code>umdArgsObject</code>](#umdArgsObject) | 

**Example**  
```js
// Defining a module that depends on jQuery and b.umd.define({ moduleName: 'module', dependencies: [  // JQuery has different names across different module systems.  { global:'jQuery', cjs:'jquery', amd:'jquery', default:'jquery' },  // B has the same name across all module systems.  'b' ], factory: ($) => {  // some code... }})
```
**Example**  
```js
// Defining a module that uses no dependencies, and has different names across different module systems.umd.define({ moduleName: { global:'Module', cjs:'module', amd:'md', default:'module' }, factory: () => {  // some code... }})
```
<a name="module_UMD..defineAMD"></a>

### UMD~defineAMD(args) ⇒ <code>boolean</code>
Defining an AMD module.

**Kind**: inner method of [<code>UMD</code>](#module_UMD)  
**Returns**: <code>boolean</code> - Whether it's in an AMD environment or not.  

| Param | Type |
| --- | --- |
| args | [<code>umdArgsObject</code>](#umdArgsObject) | 

<a name="module_UMD..defineCJS"></a>

### UMD~defineCJS(args) ⇒ <code>boolean</code>
Defining a CommonJS module.

**Kind**: inner method of [<code>UMD</code>](#module_UMD)  
**Returns**: <code>boolean</code> - Whether it's in a CommonJS environment or not.  

| Param | Type |
| --- | --- |
| args | [<code>umdArgsObject</code>](#umdArgsObject) | 

<a name="module_UMD..defineWeb"></a>

### UMD~defineWeb(args) ⇒ <code>boolean</code>
Defining a module that is saved as a browser global.

**Kind**: inner method of [<code>UMD</code>](#module_UMD)  
**Returns**: <code>boolean</code> - Whether it's in an environment with the this/self object or not.  

| Param | Type |
| --- | --- |
| args | [<code>umdArgsObject</code>](#umdArgsObject) | 

<a name="module_UMD..defineAmdWeb"></a>

### UMD~defineAmdWeb(args) ⇒ <code>undefined</code>
With this function you can define a module that will be supported across AMD, and regular browsers.* Based on [https://github.com/umdjs/umd/blob/master/templates/amdWeb.js](https://github.com/umdjs/umd/blob/master/templates/amdWeb.js)

**Kind**: inner method of [<code>UMD</code>](#module_UMD)  
**Returns**: <code>undefined</code> - Nothing.  

| Param | Type |
| --- | --- |
| args | [<code>umdArgsObject</code>](#umdArgsObject) | 

<a name="module_UMD..defineAmdCjs"></a>

### UMD~defineAmdCjs(args) ⇒ <code>undefined</code>
With this function you can define a module that will be supported across AMD, and CommonJS.* Code based on [https://github.com/umdjs/umd/blob/master/templates/returnExports.js](https://github.com/umdjs/umd/blob/master/templates/returnExports.js)* Concept based on [https://github.com/umdjs/umd/blob/master/templates/commonjsAdapter.js](https://github.com/umdjs/umd/blob/master/templates/commonjsAdapter.js)

**Kind**: inner method of [<code>UMD</code>](#module_UMD)  
**Returns**: <code>undefined</code> - Nothing.  

| Param | Type |
| --- | --- |
| args | [<code>umdArgsObject</code>](#umdArgsObject) | 

<a name="UMDTypeError"></a>

## UMDTypeError
The Error that's thrown when there's a type error in the define functions' parameters.

**Kind**: global class  
<a name="new_UMDTypeError_new"></a>

### new UMDTypeError([message])

| Param | Type |
| --- | --- |
| [message] | <code>string</code> | 

<a name="umdModule"></a>

## umdModule : <code>Object</code>
An object containing the different names of a module across different environments.* In any place [umdModule](#umdModule) is used, you can use a string instead.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [umdModule.global] | <code>string</code> | The name that's used when the module is saved as a browser global (AKA what's used in normal browsers). |
| [umdModule.cjs] | <code>string</code> | The name that's used in CommonJS (AKA node). |
| [umdModule.amd] | <code>string</code> | The name that's used with AMD (AKA RequireJS). |
| umdModule.default | <code>string</code> | The default name that's used when you haven't defined one of the other names. |

<a name="umdFactoryFunction"></a>

## umdFactoryFunction ⇒ <code>any</code>
**Kind**: global typedef  
**Returns**: <code>any</code> - The module.  

| Param | Type | Description |
| --- | --- | --- |
| ...dependencies | <code>any</code> | The dependencies the module depends on. |

<a name="umdArgsObject"></a>

## umdArgsObject : <code>Object</code>
The parameters for the define functions.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| umdArgsObject.moduleName | [<code>umdModule</code>](#umdModule) \| <code>string</code> |  | The name of your module. |
| [umdArgsObject.dependencies] | <code>Array.&lt;umdModule, string&gt;</code> |  | The names of the dependencies your module needs. |
| umdArgsObject.factory | [<code>umdFactoryFunction</code>](#umdFactoryFunction) |  | A function that returns your module. |
| [umdArgsObject.root] | <code>Object</code> |  | The root object your module is saved on if it's saved as a browser global. * Set to the 'this' object (or 'self' in case of using a web worker) by default. |
| [umdArgsObject.options] | <code>Object</code> |  | Some options for the definition. |
| [umdArgsObject.options.unconditionalGlobal] | <code>boolean</code> | <code>false</code> | Whether or not to create a browser global no matter the environment. * Set to false by default. * Will not work for [umd.defineAMD](umd.defineAMD), [umd.defineCJS](umd.defineCJS) & [umd.defineWeb](umd.defineWeb) |
| [umdArgsObject.options.bindRoot] | <code>boolean</code> | <code>false</code> | Whether or not to bind the [umdArgsObject.root](umdArgsObject.root) to your function so it could be used with the 'this' keyword. * Set to false by default. |

