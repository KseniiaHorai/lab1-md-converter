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
