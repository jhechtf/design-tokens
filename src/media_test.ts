import {
  assertEquals,
  assertMatch
} from 'https://deno.land/std@0.129.0/testing/asserts.ts';

import Token from './token.ts';
import MediaQuery from './media.ts';

/**
 * @description Ensure that the media query that we get is the same one every 
 * time that the user creates one.
 */
Deno.test('Testing uniqueness', () => {
  const dark1 = new MediaQuery('prefers-color-scheme: dark');
  const dark2 = new MediaQuery('prefers-color-scheme: dark');
  assertEquals(dark1, dark2);
});

Deno.test('With Token', () => {
  // Make the dark query
  const darkQuery = new MediaQuery('prefers-color-scheme: dark', true);
  // Make the token
  const token = new Token('primary', 'blue', 'color');
  // add the token to the query
  darkQuery.addToken(token);
  // Grab the output
  const output = darkQuery.build();
  // Check the match
  assertMatch(output, /@media screen and \(prefers-color-scheme: dark\)/);
  assertEquals(output.includes(':root {'), true);
  assertMatch(output, /@media screen and \(prefers-color-scheme: dark\)\s?\{[\s\S]+:root\s?\{[\s\S]*\}[\s\S]+\}/);
  assertEquals(output.includes('--color-primary: blue;'), true);
});