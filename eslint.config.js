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
            '^controllers/',
            '^services/',
            '^models/',
            '^repositories/',
            '^middleware/',
            '^protocols/',
            '^database/',
            '^entities/',
            '^utils/',
            '^config/',
            '^routes/',
            '^app$',
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
            ['config', './app/config'],
            ['controllers', './app/controllers'],
            ['database', './app/database'],
            ['entities', './app/entities'],
            ['i18n', './app/i18n'],
            ['helpers', './app/helpers'],
            ['middleware', './app/middleware'],
            ['models', './app/models'],
            ['protocols', './app/protocols'],
            ['repositories', './app/repositories'],
            ['routes', './app/routes'],
            ['services', './app/services'],
            ['utils', './app/utils'],
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
