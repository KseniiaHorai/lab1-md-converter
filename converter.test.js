const { mdConverter } = require('./converter.js');

describe('Simple valid Markdown to HTML converting', () => {

  test('Test bold', () => {
      expect((mdConverter('**It is bold!**', 'html'))).toBe('<p><b>It is bold!</b></p>\n');
  });

  test('Test italic', () => {
      expect((mdConverter('_It is italic!_', 'html'))).toBe('<p><i>It is italic!</i></p>\n');
  });

  test('Test monospaced', () => {
      expect((mdConverter('`It is monospaced!`', 'html'))).toBe('<p><tt>It is monospaced!</tt></p>\n');
  });

  test('Test combination', () => {
      expect((mdConverter('It is **bold**, _italic_ and `monospaced`', 'html'))).toBe('<p>It is <b>bold</b>, <i>italic</i> and <tt>monospaced</tt></p>\n');
  });

  test('Test preformatted', () => {
      expect(mdConverter('```\r\n You **cannot** _alter me_\r\n\r\nbecause I am `preformatted`\r\n```', 'html'))
      .toBe('<p><pre>\r\n You **cannot** _alter me_\r\n\r\nbecause I am `preformatted`\r\n</pre></p>\n');
  });

  test('Test paragraph', () => {
      expect(mdConverter('This is paragraph 1.\nIt continues.\n\nThis is paragraph 2', 'html'))
      .toBe('<p>This is paragraph 1.\nIt continues.</p>\n<p>This is paragraph 2</p>\n');
  });

});

describe('Complex valid Markdown to HTML converting', () => {

  test('Test snake_case', () => {
    expect(mdConverter('It is ok to be snake_case', 'html')).toBe('<p>It is ok to be snake_case</p>\n');
  });

  test('Test single bold tag', () => {
    expect(mdConverter('It is ok ** to be single', 'html')).toBe('<p>It is ok ** to be single</p>\n');
  });

  test('Test single italic tag', () => {
    expect(mdConverter('It is ok _ to be single', 'html')).toBe('<p>It is ok _ to be single</p>\n');
  });

  test('Test single monospaced tag', () => {
    expect(mdConverter('It is ok  ` to be single', 'html')).toBe('<p>It is ok  ` to be single</p>\n');
  });

  test('Test single preformatted tag', () => {
    expect(mdConverter('It is ok ``` to be single', 'html')).toBe('<p>It is ok <tt>`</tt> to be single</p>\n');
  });

  test('Test complex case', () => {
    expect(mdConverter([
      'Test **bold** **bold1** **bold2**',
      'Test _italic_ _italic1_ _italic2_',
      'Test `monospaced` `monospaced1` `monospaced2`\n',
      'It is ok to be snake_case',
      'It is ok ** to be single\n',
      '```\nThis text is **_preformatted_**\n',
      'And can have multiple paragraphs\n```'
    ].join('\n'), 'html'))
    .toBe([
      '<p>Test <b>bold</b> <b>bold1</b> <b>bold2</b>\n',
      'Test <i>italic</i> <i>italic1</i> <i>italic2</i>\n',
      'Test <tt>monospaced</tt> <tt>monospaced1</tt> <tt>monospaced2</tt></p>\n',
      '<p>It is ok to be snake_case\n',
      'It is ok ** to be single</p>\n',
      '<p><pre>\nThis text is **_preformatted_**\n\n',
      'And can have multiple paragraphs\n</pre></p>\n'
    ].join(''))
  });

});

describe('Invalid Markdown to HTML converting', () => {

  test('Test nesting validation bold, italic, monospaced', () => {
    expect(() => mdConverter('I am bold, monospced, and italic **`_but invalid_`**', 'html').toThrow('Invalid input: nested markdown'));
  });

  test('Test nesting validation bold, monospaced', () => {
    expect(() => mdConverter('I am bold and monospced **`but invalid`**', 'html').toThrow('Invalid input: nested markdown'));
  });

  test('Test nesting validation bold, italic', () => {
    expect(() => mdConverter('I am bold and italic **_but invalid_**', 'html').toThrow('Invalid input: nested markdown'));
  });

  test('Test nesting validation italic, monospaced', () => {
    expect(() => mdConverter('I am italic and monospced _`but invalid`_', 'html').toThrow('Invalid input: nested markdown'));
  });
  
  test('Incomplete bold', () => {
    expect(() => mdConverter('It is **bold but not closed.', 'html').toThrow('Invalid input: incomplete markdown'));
  });
  test('Incomplete italic', () => {
    expect(() => mdConverter('It is _italic but not closed.', 'html').toThrow('Invalid input: incomplete markdown'));
  });
  test('Incomplete monospaced', () => {
    expect(() => mdConverter('It is `monospaced but not closed.', 'html').toThrow('Invalid input: incomplete markdown'));
  });

});

describe('Simple valid Markdown to ANSI converting', () => {

  test('Test bold', () => {
    expect(mdConverter('**It is bold**', 'ansi')).toBe('\n\x1b[1mIt is bold\x1b[22m');
});

  test('Test italic', () => {
    expect(mdConverter('_It is italic!_', 'ansi')).toBe('\n\x1b[3mIt is italic!\x1b[23m');
  });

  test('Test monospaced', () => {
    expect(mdConverter('`It is monospaced!`', 'ansi')).toBe('\n\x1b[7mIt is monospaced!\x1b[27m');
  });

  test('Test preformatted', () => {
    expect(mdConverter('```\r\n You **cannot** _alter me_\r\n\r\nbecause I am `preformatted`\r\n```', 'ansi'))
      .toBe('\n\x1b[7m\r\n You **cannot** _alter me_\r\n\r\nbecause I am `preformatted`\r\n\x1b[m');
  });

  test('Test paragraph', () => {
    expect(mdConverter('This is paragraph 1.\nIt continues.\n', 'ansi'))
    .toBe('\nThis is paragraph 1.\nIt continues.');
  });

});

describe('Complex valid Markdown to ANSI converting', () => {
  test('Test snake_case', () => {
    expect(mdConverter('It is ok to be snake_case', 'ansi')).toBe('\nIt is ok to be snake_case');
  });

  test('Test single bold tag', () => {
    expect(mdConverter('It is ok ** to be single', 'ansi')).toBe('\nIt is ok ** to be single');
  });

  test('Test single italic tag', () => {
    expect(mdConverter('It is ok _ to be single', 'ansi')).toBe('\nIt is ok _ to be single');
  });

  test('Test single monospaced tag', () => {
    expect(mdConverter('It is ok  ` to be single', 'ansi')).toBe('\nIt is ok  ` to be single');
  });

  test('Test single preformatted tag', () => {
    expect(mdConverter('It is ok ``` to be single', 'ansi')).toBe('\nIt is ok \x1b[7m`\x1b[27m to be single');
  });

  test('triple monospaced tag is handled correctly', () => {
    const input = [
      'Test **bold** **bold1** **bold2**',
      'Test _italic_ _italic1_ _italic2_',
      'Test `monospaced` `monospaced1` `monospaced2`\n',
      'It is ok to be snake_case',
      'It is ok ** to be single\n'
    ].join('\n');
    const expectedOutput = [
      '\nTest \x1b[1mbold\x1b[22m \x1b[1mbold1\x1b[22m \x1b[1mbold2\x1b[22m',
      'Test \x1b[3mitalic\x1b[23m \x1b[3mitalic1\x1b[23m \x1b[3mitalic2\x1b[23m',
      'Test \x1b[7mmonospaced\x1b[27m \x1b[7mmonospaced1\x1b[27m \x1b[7mmonospaced2\x1b[27m',
      'It is ok to be snake_case',
      'It is ok ** to be single'
    ].join('\n');
    expect(mdConverter(input, 'ansi')).toBe(expectedOutput);
  });

});

describe('Invalid Markdown to ANSI converting', () => {

  test('Test nesting validation bold, italic, monospaced', () => {
    expect(() => mdConverter('I am bold, monospced, and italic **`_but invalid_`**', 'ansi').toThrow('Invalid input: nested markdown'));
  });

  test('Test nesting validation bold, monospaced', () => {
    expect(() => mdConverter('I am bold and monospced **`but invalid`**', 'ansi').toThrow('Invalid input: nested markdown'));
  });

  test('Test nesting validation bold, italic', () => {
    expect(() => mdConverter('I am bold and italic **_but invalid_**', 'ansi').toThrow('Invalid input: nested markdown'));
  });

  test('Test nesting validation italic, monospaced', () => {
    expect(() => mdConverter('I am italic and monospced _`but invalid`_', 'ansi').toThrow('Invalid input: nested markdown'));
  });
  
  test('Incomplete bold', () => {
    expect(() => mdConverter('It is **bold but not closed.', 'ansi').toThrow('Invalid input: incomplete markdown'));
  });
  test('Incomplete italic', () => {
    expect(() => mdConverter('It is _italic but not closed.', 'ansi').toThrow('Invalid input: incomplete markdown'));
  });
  test('Incomplete monospaced', () => {
    expect(() => mdConverter('It is `monospaced but not closed.', 'ansi').toThrow('Invalid input: incomplete markdown'));
  });
  
});
