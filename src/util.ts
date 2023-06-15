import { Args, parse } from 'https://deno.land/std@0.127.0/flags/mod.ts';
import {
  isAbsolute,
  join,
  toFileUrl,
} from 'https://deno.land/std@0.129.0/path/mod.ts';

import { type MediaQuery, type Stylesheet, Token } from '../mod.ts';

import { Config } from './types.d.ts';

export function normalizeCssQuery(str: string): string {
  return str.replace(
    /(.*?):\s?(.*)/g,
    (_, a, b) => `${a}: ${b}`,
  );
}

let args: Args | null = null;

export function getArgs() {
  if (args) return args;
  else {
    args = parse(Deno.args, {
      alias: {
        v: 'verbose',
      },
    });
    return args;
  }
}

export function camelCase(str: string): string {
  return str.replace(
    /(\w)\-(\w)/g,
    (_, a, b) => a + b.toUpperCase(),
  );
}

/**
 * @param loc location of the configuration file to make.
 * @returns Returns a Config object to be used via the CLI.
 */
export async function getConfigFromImport(loc: string): Promise<Config> {
  // Get the current wokring directory
  const cwd = Deno.cwd();
  // Check if the location is not absolute.
  if (!isAbsolute(loc)) {
    // If not, join the cwd and the location
    loc = join(cwd, loc);
  }
  // Turn the location into a file url
  const fileUrl = toFileUrl(loc);
  // Import the file, if it has a default export use it, otherwise consider
  // the whole thing as the config.
  return await import(fileUrl.href)
    .then((mod) => (mod.default || mod) as Config);
}

export function parseBaseConfig(
  c: Config,
  base: Stylesheet | MediaQuery,
): void {
  for (const [type, typeMap] of Object.entries(c)) {
    // skipping variants for now.
    if (type === 'variants') continue;
    for (const [name, tokenMap] of Object.entries(typeMap)) {
      if (typeof tokenMap === 'object') {
        for (const [sub, value] of Object.entries(tokenMap)) {
          const token = new Token(`${name}-${sub}`, value, type);
          base.addToken(token);
        }
      } else {
        const token = new Token(name, tokenMap, type);
        base.addToken(token);
      }
    }
  }
}
