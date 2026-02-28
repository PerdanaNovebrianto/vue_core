import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import { readFileSync } from 'node:fs'

const autoImportConfig = JSON.parse(
  readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf8')
)

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals,
      },
    },
    plugins: {
      local: {
        rules: {
          'no-vue-auto-imports': {
            meta: {
              type: 'suggestion',
              fixable: 'code',
              docs: {
                description: 'Disallow importing APIs from vue when auto-import is enabled',
              },
              schema: [],
            },
            create(context) {
              return {
                ImportDeclaration(node) {
                  if (node.source.value !== 'vue') return

                  context.report({
                    node,
                    message: 'Vue APIs are auto-imported. Remove this import.',
                    fix(fixer) {
                      return fixer.remove(node)
                    },
                  })
                },
              }
            },
          },
        },
      },
    },
    rules: {
      'local/no-vue-auto-imports': 'error',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-tabs': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/script-indent': ['error', 2, { baseIndent: 0, switchCase: 1 }],
      'no-tabs': 'error',
    },
  },
]
