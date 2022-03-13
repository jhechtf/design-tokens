import Selector from './selector.ts';
import Token from './token.ts';
import {
  assertEquals,
  assertMatch,
} from 'https://deno.land/std@0.129.0/testing/asserts.ts';

Deno.test('Empty Testing', () => {
  const sel = new Selector();
  const output = sel.build();
  const hardcoded = `:root {
}`;

  assertMatch(output, /\:root/);
  assertEquals(output, hardcoded);
});

Deno.test('With tokens', () => {
  const sel = new Selector();
  const primaryToken = new Token('primary', 'value');
  const secondaryToken = new Token('secondary', '10px', 'size');

  sel
    .addToken(primaryToken)
    .addToken(secondaryToken);

  const output = sel.build();
  assertMatch(output, /--color-primary: value;/);
  assertMatch(output, /--size-secondary: 10px;/);
});

Deno.test('Custom Selector', () => {
  const sel = new Selector('@media (prefers-color-scheme: dark)');
  const primaryToken = new Token('primary', 'value');
  sel.addToken(primaryToken);

  const output = sel.build();

  // I am aware that this does nothing and is not valid CSS.
  // This component is meant to be VERY stupid.
  assertEquals(output.startsWith('@media (prefers-color-scheme: dark)'), true);
  assertMatch(output, /@media \(prefers-color-scheme: dark\)\s?\{[\s\S]+\}/);
  assertMatch(output, /--color-primary: value;/);
});
