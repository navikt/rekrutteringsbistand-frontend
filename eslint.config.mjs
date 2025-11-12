// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { FlatCompat } from '@eslint/eslintrc';
import reactCompiler from 'eslint-plugin-react-compiler';
import storybook from 'eslint-plugin-storybook';
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
      '**/*.story.ts',
      '**/*.story.tsx',
      '**/*.stories.ts',
      '**/*.stories.tsx',
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.github/**',
      '.history/**',
      'mocks/**',
      'playwright-report/**',
      'storybook-static/**',
      // Tillat direkte SWR-import i våre egne custom hooks
      'app/api/useSWRGet.ts',
      'app/api/useSWRPost.ts',
      'app/api/useSWRPut.ts',
      'components/SWRLaster.tsx', // Bruker SWRResponse type
      'providers/RekrutteringsbistandProvider.tsx', // Bruker SWRConfig provider
    ],
  },
  {
    plugins: {
      'react-compiler': reactCompiler,
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', //TODO Temp rule

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
          paths: [
            {
              name: 'swr',
              importNames: ['default', 'useSWR'],
              message:
                'Bruk useSWRGet, useSWRPost eller useSWRPut fra @/app/api/ istedenfor direkte import fra swr.',
            },
            {
              name: 'swr/immutable',
              importNames: ['default', 'useSWRImmutable'],
              message:
                'Bruk useSWRGet, useSWRPost eller useSWRPut fra @/app/api/ istedenfor direkte import fra swr/immutable.',
            },
          ],
        },
      ],
      // Forby bruk av React.useState / React.useEffect / osv. slik at vi alltid bruker named imports
      // Dette fanger runtime-feil der React ikke er importert (React 17+ / 19 automatisk JSX runtime importerer ikke React-objektet)
      'no-restricted-properties': [
        'warn',
        {
          object: 'React',
          property: 'useState',
          message: 'Bruk named import: import { useState } from "react";',
        },
        {
          object: 'React',
          property: 'useEffect',
          message: 'Bruk named import: import { useEffect } from "react";',
        },
        {
          object: 'React',
          property: 'useContext',
          message: 'Bruk named import: import { useContext } from "react";',
        },
        {
          object: 'React',
          property: 'useReducer',
          message: 'Bruk named import: import { useReducer } from "react";',
        },
        {
          object: 'React',
          property: 'useCallback',
          message: 'Bruk named import: import { useCallback } from "react";',
        },
        {
          object: 'React',
          property: 'useMemo',
          message: 'Bruk named import: import { useMemo } from "react";',
        },
        {
          object: 'React',
          property: 'useRef',
          message: 'Bruk named import: import { useRef } from "react";',
        },
        {
          object: 'React',
          property: 'useLayoutEffect',
          message:
            'Bruk named import: import { useLayoutEffect } from "react";',
        },
        {
          object: 'React',
          property: 'useId',
          message: 'Bruk named import: import { useId } from "react";',
        },
        {
          object: 'React',
          property: 'useTransition',
          message: 'Bruk named import: import { useTransition } from "react";',
        },
        {
          object: 'React',
          property: 'useDeferredValue',
          message:
            'Bruk named import: import { useDeferredValue } from "react";',
        },
        {
          object: 'React',
          property: 'useSyncExternalStore',
          message:
            'Bruk named import: import { useSyncExternalStore } from "react";',
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
