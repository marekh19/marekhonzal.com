// @ts-check
import eslint from '@eslint/js'
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/dist', '**/node_modules', '**/.astro', '**/.github', '**/.changeset'],
  },

  // Global config
  // JavaScript
  eslint.configs.recommended,
  // TypeScript
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  // Allow triple-slash references in `*.d.ts` files.
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Astro
  ...eslintPluginAstro.configs.recommended,

  // Enable TypeScript in Astro frontmatter scripts
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
)
