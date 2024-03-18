'use strict';

const tagPatterns = {
  bold: {
    html: '<b>$1</b>',
    ansi: '\x1b[1m$1\x1b[22m'
  },
  italic: {
    html: '<i>$1</i>',
    ansi: '\x1b[3m$1\x1b[23m'
  },
  monospaced: {
    html: '<tt>$1</tt>',
    ansi: '\x1b[7m$1\x1b[27m'
  },
  preformatted: {
    html: { begin: '<pre>', end: '</pre>' },
    ansi: { begin: '\x1b[7m', end: '\x1b[m' }
  },
  paragraph: {
    html: { begin: '<p>', end: '</p>\n' },
    ansi: { begin: '\n', end: '' }
  }
};

const patterns = {
    preformattedPattern: /(^\\n?|^)```(.*?)```(\\n?|$)/ms,
    boldPattern: /\*\*(\S(?:.*?\S)?)\*\*/g,
    italicPattern: /_(\S(?:.*?\S)?)_/g,
    monospacedPattern: /`(\S(?:.*?\S)?)`/g
};

module.exports = { tagPatterns, patterns};
