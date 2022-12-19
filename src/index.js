const umd = (function() {
    
    // Unexposed Utilities.

    /** 
     * An object containing the different names of a module across different environments.
     ** In any place {@link umdModule} is used, you can use a string instead.
     * @typedef {Object} umdModule
     * @property {string} [umdModule.global] - The name that's used when the module is saved as a browser global (AKA what's used in normal browsers).
     * @property {string} [umdModule.cjs] - The name that's used in CommonJS (AKA node).
     * @property {string} [umdModule.amd] - The name that's used with AMD (AKA RequireJS).
     * @property {string} umdModule.default - The default name that's used when you haven't defined one of the other names.
     */

    /**
     * @callback umdFactoryFunction
     * @param {...any} dependencies - The dependencies the module depends on.
     * @returns {any} The module.
     */

    /**
     * @typedef {Object} umdArgsObject - The parameters for the define functions.
     * @property {umdModule | string} umdArgsObject.moduleName - The name of your module.
     * @property {Array.<umdModule, string>} [umdArgsObject.dependencies] - The names of the dependencies your module needs.
     * @property {umdFactoryFunction} umdArgsObject.factory - A function that returns your module.
     * @property {Object} [umdArgsObject.root] - The root object your module is saved on if it's saved as a browser global.
     ** Set to the 'this' object (or 'self' in case of using a web worker) by default.
     * @property {Object} [umdArgsObject.options] - Some options for the definition.
     * @property {boolean} [umdArgsObject.options.unconditionalGlobal = false] - Whether or not to create a browser global no matter the environment.
     ** Set to false by default.
     ** Will not work for {@link umd.defineAMD}, {@link umd.defineCJS} & {@link umd.defineWeb}
     * @property {boolean} [umdArgsObject.options.bindRoot = false] - Whether or not to bind the {@link umdArgsObject.root} to your function so it could be used with the 'this' keyword.
     ** Set to false by default.
     */

    /**
     * @class The Error that's thrown when there's a type error in the define functions' parameters.
     */
    class UMDTypeError extends TypeError {
        /**
         * @constructor
         * @param {string} [message] 
         */
        constructor (message) {
            super(message);
            this.name = 'UMDTypeError';
        }
    }
    /**
     * Type checking for the args for the define functions.
     * @param {umdArgsObject} args
     * @returns {umdArgsObject} The type checked args.
     */
    function typeCheckUMDArgs (args) {
        if (args.options === undefined) args.options = {};
        if (args.options.unconditionalGlobal === undefined) args.options = false;
        if (args.options.bindRoot === undefined) args.bindRoot = false;

        if (args.moduleName === undefined) throw new UMDTypeError("Cannot define module with no name.");
        if (typeof args.moduleName === 'string') args.moduleName = { default: args.moduleName };

        if (args.dependencies === undefined) args.dependencies = [];
        args.dependencies = args.dependencies.map(d => typeof d === 'string' ? { default: d } : d);

        if (typeof args.factory !== 'function') throw new UMDTypeError("'factory' must be a function.");
        if (args.options.bindRoot) args.factory = args.factory.bind(this);

        if (args.root === undefined) args.root = typeof self == undefined ? self : this;
        
        return args;
    }


    // Exposed Objects.

    
    /**
     * The UniversalModuleDefinition Module.
     * Everything under this module is going to bee under the umd object:
     * @example
     * umd.define({
     *  moduleName: 'module',
     *  factory: () => {
     *   // some code...
     *  }
     * })
     * @module UMD
     */
    const umd = {};

    /**
     * With this function you can define a module that will be universally supported across AMD, CommonJS, and regular browsers.
     ** Based on {@link https://github.com/umdjs/umd/blob/master/templates/returnExports.js}
     ** All of the `define` functions follow the same syntax:
     * @example
     * // Defining a module that depends on jQuery and b.
     * umd.define({
     *  moduleName: 'module',
     *  dependencies: [
     *   // JQuery has different names across different module systems.
     *   { global:'jQuery', cjs:'jquery', amd:'jquery', default:'jquery' },
     *   // B has the same name across all module systems.
     *   'b'
     *  ],
     *  factory: ($) => {
     *   // some code...
     *  }
     * })
     * @example
     * // Defining a module that uses no dependencies, and has different names across different module systems.
     * umd.define({
     *  moduleName: { global:'Module', cjs:'module', amd:'md', default:'module' },
     *  factory: () => {
     *   // some code...
     *  }
     * })
     * @function define
     * @param {umdArgsObject} args
     * @returns {undefined} Nothing.
     */
    umd.define  = function (args = {}) {
        args = typeCheckUMDArgs(args);
        if ( umd.defineAMD(args) ) if ( !args.options.unconditionalGlobal ) return;
        if ( umd.defineCJS(args) ) if ( !args.options.unconditionalGlobal ) return;
        if ( umd.defineWeb(args) ) return;
    }

    /**
     * Defining an AMD module.
     * @function defineAMD
     * @param {umdArgsObject} args
     * @returns {boolean} Whether it's in an AMD environment or not.
     */
    umd.defineAMD = function (args = {}) {
        if (!( typeof define === 'function' && define.amd )) return false;

        args = typeCheckUMDArgs(args);

        define(
            args.dependencies.map( d => d.amd || d.default ),
            args.factory
        );

        return true;
    }

    /**
     * Defining a CommonJS module.
     * @function defineCJS
     * @param {umdArgsObject} args 
     * @returns {boolean} Whether it's in a CommonJS environment or not.
     */
    umd.defineCJS  = function (args ={}) {
        if (!( typeof module === 'object' && module.exports )) return false;

        args = typeCheckUMDArgs(args);
        
        module.exports = args.factory(
            ...args.dependencies.map( d => require( d.cjs || d.default ) )
        );

        return true;
    }

    /**
     * Defining a module that is saved as a browser global.
     * @function defineWeb
     * @function
     * @param {umdArgsObject} args 
     * @returns {boolean} Whether it's in an environment with the this/self object or not.
     */
    umd.defineWeb  = function (args = {}) {
        args = typeCheckUMDArgs(args);

        if (!( typeof args.root !== 'undefined' )) return false;

        args.root[args.moduleName.global || args.moduleName.default] = args.factory(
            ...args.dependencies.map( d => args.root[ d.global || d.default ])
        );

        return true;
    }
    
    /**
     * With this function you can define a module that will be supported across AMD, and regular browsers.
     ** Based on {@link https://github.com/umdjs/umd/blob/master/templates/amdWeb.js}
     * @function defineAmdWeb
     * @param {umdArgsObject} args
     * @returns {undefined} Nothing.
     */
    umd.defineAmdWeb  = function (args = {}) {
        args = typeCheckUMDArgs(args);
        if ( umd.defineAMD(args) ) if ( !args.options.unconditionalGlobal ) return;
        if ( umd.defineWeb(args) ) return;
    }
    
    /**
     * With this function you can define a module that will be supported across AMD, and CommonJS.
     ** Code based on {@link https://github.com/umdjs/umd/blob/master/templates/returnExports.js}
     ** Concept based on {@link https://github.com/umdjs/umd/blob/master/templates/commonjsAdapter.js}
     * @function defineAmdCjs
     * @param {umdArgsObject} args
     * @returns {undefined} Nothing.
     */
    umd.defineAmdCjs  = function (args = {}) {
        args = typeCheckUMDArgs(args);
        if ( args.options.unconditionalGlobal ) umd.defineWeb(args);
        if ( umd.defineAMD(args) ) return;
        if ( umd.defineCJS(args) ) return;
    }

    // Making sure that the 'this' in all functions is the right one.
    for (let i in umd) {
        if (typeof umd[i] !== 'function') continue;
        umd[i] = umd[i].bind(this);
    }

    return umd;

})();