module.exports = {
    root: true,

    parserOptions: {
        parser: 'babel-eslint',
        sourceType: "module",
        ecmaVersion: 2018
    },

    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },

    extends: [
        'plugin:vue/essential'
    ],

    plugins: [
        'vue'
    ],

    globals: {
        __statics: true
    },
 };