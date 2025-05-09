// .eslintrc.cjs
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    overrides: [
        // Vue 文件支持
        {
            files: ['**/*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@babel/eslint-parser',
                ecmaVersion: 2021,
                sourceType: 'module',
                requireConfigFile: false,
            },
            extends: [
                'plugin:vue/vue3-recommended', // ✅ Vue 3 推荐规则
            ],
            rules: {
                'vue/no-multiple-template-root': 'off', // ✅ Vue 3 支持多个根节点
            },
        },
        // Astro 文件支持
        {
            files: ['**/*.astro'],
            extends: ['plugin:astro/recommended'],
        },
    ],
}
