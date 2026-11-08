import type { ShikiConfig } from '@astrojs/markdown-remark'

type ShikiTheme = NonNullable<ShikiConfig['themes']>[string]

type Palette = {
  bg: string
  fg: string
  comment: string
  faint: string
  pink: string
  lavender: string
  cyan: string
  blue: string
  peach: string
  peachDim: string
  peachBright: string
  yellow: string
  green: string
  red: string
}

// Scopes and colors from meowsoot.nvim extras/bat/meowsoot-{moon,dawn}.tmTheme.
const meowsootTheme = (name: string, type: 'dark' | 'light', c: Palette) =>
  ({
    name,
    type,
    colors: {
      'editor.background': c.bg,
      'editor.foreground': c.fg,
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: { foreground: c.comment, fontStyle: 'italic' },
      },
      {
        scope: ['string', 'constant.other.symbol', 'string.regexp'],
        settings: { foreground: c.yellow },
      },
      {
        scope: [
          'constant.character',
          'constant.character.escape',
          'constant.other.placeholder',
          'punctuation.section.embedded',
        ],
        settings: { foreground: c.peach },
      },
      { scope: 'constant.numeric', settings: { foreground: c.peachDim } },
      {
        scope: ['constant.language', 'constant.other', 'variable.other.constant'],
        settings: { foreground: c.peach },
      },
      {
        scope: [
          'entity.name.function',
          'entity.name.function.preprocessor',
          'support.function',
          'variable.function',
          'meta.function-call variable',
        ],
        settings: { foreground: c.pink },
      },
      {
        scope: [
          'entity.name.type',
          'entity.name.class',
          'entity.name.namespace',
          'entity.other.inherited-class',
          'support.type',
          'support.class',
        ],
        settings: { foreground: c.lavender },
      },
      {
        scope: ['keyword', 'storage.type', 'storage.modifier'],
        settings: { foreground: c.cyan },
      },
      { scope: 'keyword.operator', settings: { foreground: c.faint } },
      {
        scope: ['variable.language', 'variable.other.readwrite.instance'],
        settings: { foreground: c.cyan, fontStyle: 'italic' },
      },
      {
        scope: [
          'variable',
          'variable.parameter',
          'variable.other',
          'support.variable',
          'meta.object-literal.key',
          'meta.mapping.key',
        ],
        settings: { foreground: c.fg },
      },
      {
        scope: ['entity.name.label', 'entity.name.tag'],
        settings: { foreground: c.cyan },
      },
      {
        scope: ['entity.other.attribute-name', 'meta.decorator', 'punctuation.decorator'],
        settings: { foreground: c.peachBright, fontStyle: 'italic' },
      },
      {
        scope: [
          'punctuation.separator',
          'punctuation.terminator',
          'punctuation.definition.tag',
          'punctuation.section.block',
          'punctuation.section.group',
        ],
        settings: { foreground: c.faint },
      },
      {
        scope: ['markup.heading', 'entity.name.section'],
        settings: { foreground: c.pink, fontStyle: 'bold' },
      },
      { scope: 'markup.bold', settings: { foreground: c.peach, fontStyle: 'bold' } },
      { scope: 'markup.italic', settings: { foreground: c.yellow, fontStyle: 'italic' } },
      {
        scope: ['markup.underline.link', 'string.other.link'],
        settings: { foreground: c.cyan, fontStyle: 'underline' },
      },
      {
        scope: ['markup.raw', 'markup.inline.raw'],
        settings: { foreground: c.lavender },
      },
      { scope: 'markup.inserted', settings: { foreground: c.green } },
      { scope: 'markup.deleted', settings: { foreground: c.red } },
      { scope: 'markup.changed', settings: { foreground: c.blue } },
      {
        scope: ['invalid', 'invalid.illegal'],
        settings: { foreground: c.red, fontStyle: 'underline' },
      },
    ],
  }) satisfies ShikiTheme

export const meowsootMoon = meowsootTheme('meowsoot-moon', 'dark', {
  bg: '#171921',
  fg: '#d9dbe8',
  comment: '#797e9a',
  faint: '#797e96',
  pink: '#eaa4c9',
  lavender: '#cca6e7',
  cyan: '#96d8e3',
  blue: '#96bddf',
  peach: '#e3b096',
  peachDim: '#dfa486',
  peachBright: '#eed2c4',
  yellow: '#dfd286',
  green: '#98cdaa',
  red: '#e99696',
})

export const meowsootDawn = meowsootTheme('meowsoot-dawn', 'light', {
  bg: '#f9f6f1',
  fg: '#3c312a',
  comment: '#897a6c',
  faint: '#9c948b',
  pink: '#911256',
  lavender: '#6a2c96',
  cyan: '#187a8b',
  blue: '#25659d',
  peach: '#a34414',
  peachDim: '#b85c2e',
  peachBright: '#903609',
  yellow: '#917112',
  green: '#1f7a3d',
  red: '#a11717',
})
