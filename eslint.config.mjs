import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      //TODO Temp rule
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-restricted-imports': [
        'warn',
        {
          // Restrict deep relative imports; encourage using configured path aliases instead
          patterns: [
            {
              group: ['../../**', '../../../**', '../../../../**'],
              message:
                'Unngå dype relative imports. Bruk alias (f.eks. @/components) der det er mulig.',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
