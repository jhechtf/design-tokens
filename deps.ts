export { type Args, parse } from 'https://deno.land/std@0.132.0/flags/mod.ts';

export {
  dirname,
  fromFileUrl,
  resolve,
  toFileUrl,
} from 'https://deno.land/std@0.132.0/path/mod.ts';

export { ensureDir, exists } from 'https://deno.land/std@0.132.0/fs/mod.ts';

export {
  bgBrightGreen,
  bgGreen,
  brightBlack,
  green,
  red,
  white,
} from 'https://deno.land/std@0.132.0/fmt/colors.ts';

export const VERSION = '0.1.0';
