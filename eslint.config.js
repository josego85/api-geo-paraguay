const eslint = require('@eslint/js');
const babelParser = require('@babel/eslint-parser');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const security = require('eslint-plugin-security');

module.exports = [
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/*.bundle.js',
      'newrelic.js',
    ],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: 'script',
        allowImportExportEverywhere: true,
      },
      globals: {
        require: true,
        module: true,
        exports: true,
        __dirname: true,
        __filename: true,
        process: true,
        console: true,
        // Jest globals
        describe: true,
        test: true,
        it: true,
        expect: true,
        beforeAll: true,
        afterAll: true,
        jest: true,
        setTimeout: true,
      },
    },
    plugins: {
      import: importPlugin,
      security,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off', // Allow console
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['req', 'res', 'ctx', 'acc'],
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '^app$',
            '^config/',
            '^controllers/',
            '^database/',
            '^entities/',
            '^i18n/',
            '^helpers/',
            '^middleware/',
            '^models/',
            '^repositories/',
            '^routes/',
            '^services/',
            '^utils/',
          ],
        },
      ],
      'import/extensions': ['error', 'never'],
      'import/no-commonjs': 'off',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['config', './src/app/config'],
            ['controllers', './src/app/controllers'],
            ['database', './src/app/database'],
            ['entities', './src/app/entities'],
            ['i18n', './src/app/i18n'],
            ['helpers', './src/app/helpers'],
            ['middleware', './src/app/middleware'],
            ['models', './src/app/models'],
            ['repositories', './src/app/repositories'],
            ['routes', './src/app/routes'],
            ['services', './src/app/services'],
            ['utils', './src/app/utils'],
          ],
          extensions: ['.js', '.mjs'],
        },
        node: {
          paths: ['app'],
          extensions: ['.js', '.mjs'],
        },
      },
    },
  },
  prettierConfig,
];
