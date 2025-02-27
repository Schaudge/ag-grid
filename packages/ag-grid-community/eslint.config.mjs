import rootESLint from '../../eslint.config.mjs';

export default [
    ...rootESLint,
    {
        languageOptions: {
            parserOptions: {
                // NOTE: Loading tsconfig.json references does not work, so
                // loading explicitly here
                project: ['./tsconfig.lib.json', './tsconfig.spec.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'no-fallthrough': 'error',
            'no-case-declarations': 'error',
            'no-prototype-builtins': 'error',
            'no-unexpected-multiline': 'error',
            'no-useless-escape': 'error',
            'prefer-spread': 'error',
            'no-irregular-whitespace': 'error',
            'prefer-const': ['error', { destructuring: 'all' }],
            'prefer-rest-params': 'error',
            '@typescript-eslint/ban-types': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/ban-ts-comment': 'error',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/no-this-alias': 'off',
            '@typescript-eslint/no-for-in-array': 'error',
            'no-restricted-syntax': ['error', 'ForInStatement'],
            'no-restricted-properties': [
                'warn',
                { property: 'innerText', message: 'Prefer textContent where possible' },
                {
                    object: 'Object',
                    property: 'entries',
                    message: 'Prefer Object.keys() to Object.entries() for performance reasons.',
                },
            ],
            'no-restricted-imports': [
                'error',
                {
                    name: 'ag-grid-community',
                    message: 'There should be no imports of ag-grid-community, use relative imports instead',
                },
            ],
            'no-console': 'error',
        },
    },
    {
        ignores: ['webpack.config.js', 'jest.*.js', 'eslint.config.mjs', 'scripts/build-css.ts'],
    },
];
