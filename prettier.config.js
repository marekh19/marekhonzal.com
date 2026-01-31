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
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
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
