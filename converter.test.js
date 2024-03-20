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