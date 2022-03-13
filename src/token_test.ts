import { assertEquals } from 'https://deno.land/std@0.129.0/testing/asserts.ts';
import Token from './token.ts';

Deno.test('Basic Token Test', () => {
  const primaryToken = new Token('primary', 'blue');
  assertEquals(
    primaryToken.toJsToken(),
    'export const colorPrimary = \'var(--color-primary)\'',
  );
  assertEquals(primaryToken.toCssValue(), 'blue');
  assertEquals(primaryToken.getCssKey(), '--color-primary');
});

Deno.test('Nested tokens', () => {
  // Create the base tokens.
  const [
    blueToken,
    redToken,
  ] = ['blue', 'red'].map((t) => new Token(t, t));

  assertEquals(blueToken.getCssKey(), '--color-blue');
  assertEquals(blueToken.toCssValue(), 'blue');

  assertEquals(redToken.getCssKey(), '--color-red');
  assertEquals(redToken.toCssValue(), 'red');

  // Make the primary / secondary tokens.
  const primaryToken = new Token('primary', blueToken);
  const secondaryToken = new Token('secondary', redToken);

  // Check primary token
  assertEquals(
    primaryToken.toJsToken(),
    'export const colorPrimary = \'var(--color-primary)\'',
  );
  assertEquals(primaryToken.toCssValue(), 'var(--color-blue)');

  // Check secondary token
  assertEquals(
    secondaryToken.toJsToken(),
    'export const colorSecondary = \'var(--color-secondary)\'',
  );
  assertEquals(secondaryToken.toCssValue(), 'var(--color-red)');
});
