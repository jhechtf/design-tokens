import Selector from './selector.ts';
import Token from './token.ts';
import { 
  assertEquals,
  assertMatch
} from "https://deno.land/std@0.128.0/testing/asserts.ts";

Deno.test('Base Selector', () => {
  const sel = new Selector();
  const expected = ':root {\n}';
  assertEquals(sel.build(), expected);
});

Deno.test('With Token', () => {
  const sel = new Selector();
  const primaryToken = new Token('primary-token', 'red');
  sel.addToken(primaryToken);
  assertMatch(sel.build(), /primary\-token: red/)
});

Deno.test('With Tokens and different selector', () => {
  const sel = new Selector('prefers-color-scheme: dark');
  const primaryToken = new Token('primary-token', 'red');
  const sizeToken = new Token('large', '16px', 'size');
  sel.addToken(sizeToken);
  sel.addToken(primaryToken);
  const build = sel.build();
  assertMatch(build, /@media screen and \(prefers-color-scheme: dark\)/);
});