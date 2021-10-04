const { correctTitle, parsePrefixMapping, extractKnownPrefixes } = require('./utils');

test('simple test', () => {
  const simpleTitle = 'hello world';

  expect(correctTitle(simpleTitle, 'FOO', ['FOO', 'BAR'])).toBe('FOO hello world');
});

test('test with same existing prefix', () => {
  const title = 'FOO hello world';

  expect(correctTitle(title, 'FOO', ['FOO', 'BAR'])).toBe('FOO hello world');
});

test('test with different existing prefix', () => {
  const title = 'BAR hello world';

  expect(correctTitle(title, 'FOO', ['FOO', 'BAR'])).toBe('FOO hello world');
});

test('parse prefix mappings', () => {
  const input = `foo=FOO
bar=BAR`;
  const mappings = parsePrefixMapping(input);
  expect(mappings).toStrictEqual({'foo': 'FOO', 'bar': 'BAR'});
});

test('test extracting known prefixes from mapping' , () => {
  const input = `foo=FOO
bar=BAR`;
  const mappings = parsePrefixMapping(input);
  const title = 'BAR hello world'; 
  const knownPrefixes = extractKnownPrefixes(mappings);

  expect(correctTitle(title, 'FOO', knownPrefixes)).toBe('FOO hello world');
});

test('test emojis' , () => {
  const input = `foo=🔴
bar=🔹`;
  const mappings = parsePrefixMapping(input);
  const title = '🔹 hello world'; 
  const knownPrefixes = extractKnownPrefixes(mappings);

  expect(correctTitle(title, '🔴', knownPrefixes)).toBe('🔴 hello world');
});
