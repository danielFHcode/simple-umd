// Appended to the end of the file when it's not a module.

// Defining this module with itself.
umd.define({
    moduleName: 'umd',
    factory: () => umd,
    options: {
        unconditionalGlobal: true
    }
});