module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2018
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    plugins: [
        "vue"
    ],
    globals: {
        __static: true
    },
 };