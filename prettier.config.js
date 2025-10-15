/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 90,
  proseWrap: 'always',
  semi: false,
  singleQuote: true,
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  tailwindFunctions: ['cva', 'cn'],
  importOrder: [
    '^astro(:.*)?$',
    '^(react|react-dom|preact(?:/.*)?)$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/.*$',
    '',
    '^[./]',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}

export default config
