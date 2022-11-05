/**
 * @type {import('eslint').Linter.Config}
 */

module.exports = {
  ignorePatterns: ['__generated__'],
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    extraFileExtensions: ['.mjs'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],

    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-no-undef': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-key': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-no-constructed-context-values': 'warn',
    'react/function-component-definition': 'off',
    'react/no-unstable-nested-components': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/no-array-index-key': 'warn',
    'react/destructuring-assignment': 'off',
    'react/no-unused-prop-types': 'off',

    'no-shadow': 'off',
    'no-nested-ternary': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['warn', { props: true, ignorePropertyModificationsForRegex: ['.*[Rr]ef'] }],
    'no-use-before-define': 'off',
    'no-unsafe-optional-chaining': 'warn',
    'no-promise-executor-return': 'warn',

    'prefer-const': ['error', { destructuring: 'all' }],
    'id-denylist': ['warn', 'err', 'e'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/default': 'off',
    'import/newline-after-import': 'warn',
    'import/namespace': 'off',
    'import/no-cycle': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'default-param-last': 'off',
    'guard-for-in': 'warn',
  },
};
