import Stylesheet from './stylesheet.ts';
import Token from './token.ts';
import MediaQuery from './media.ts';
import {
  assertEquals,
  assertNotEquals,
  assert
} from 'https://deno.land/std@0.129.0/testing/asserts.ts';

Deno.test('Testing', () => {
  const sheet = new Stylesheet();
  const output = sheet.build();

  // We should expect to have two values.
  assertEquals(
    Object.values(output).length,
    2
  );

  assertNotEquals(
    output.js,
    undefined
  );

  assertNotEquals(
    output.css,
    undefined
  );

  assertEquals(
    typeof output.js,
    'string'
  );

  assertEquals(
    typeof output.css,
    'string'
  );

  // There's nothing in this stylesheet, so we shouldn't be getting anything.
  assertEquals(output.js, '');
  assertEquals(output.css.replace(/\n/g, ''),  ':root {}');

});

Deno.test('With values', () => {
  const styles = new Stylesheet();
  const primaryToken = new Token('primary', 'blue');

  styles.addToken(primaryToken);
  const output = styles.build();

  assertEquals(output.js, 'export const colorPrimary = \'var(--color-primary)\';\n')
  assertEquals(output.css.includes('--color-primary: blue'), true);
  assertEquals(output.css.includes(':root'), true);

});

Deno.test('With Media Queries', () => {
  const styles = new Stylesheet();
  const mq = new MediaQuery('prefers-color-scheme: dark');
  const primary = new Token('primary', 'blue');
  
  primary.addMediaQueryValue(mq, 'red');
  styles.addQuery(mq);
  styles.addToken(primary);

  // grab outputs
  const output = styles.build();
  assertNotEquals(
    output,
    {
      js: undefined,
      css: undefined
    }
  );

  assertEquals(
    output.js, 
    'export const colorPrimary = \'var(--color-primary)\';\n'
  );

  assert(
    output.css.includes('--color-primary: blue')
  );

  assert(
    output.css.includes('--color-primary: red')
  );

});
