import baseConfig from '../../eslint.base.config.mjs';
import tseslint from 'typescript-eslint';
import angularEslint from '@angular-eslint/eslint-plugin';

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  }
);
