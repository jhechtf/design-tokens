
import {
  parse,
  Args
} from 'https://deno.land/std@0.127.0/flags/mod.ts';

export function normalizeCssQuery(str: string): string {
  return str.replace(
    /(.*?):\s?(.*)/g,
    (_, a, b) => `${a}: ${b}`
  );
}

let args: Args | null = null;

export function getArgs() {
  if(args) return args;
  else {
    args = parse(Deno.args, {
      alias: {
        v: 'verbose'
      }
    })
    return args;
  }
}

export function camelCase(str: string): string {
  return str.replace(
    /(\w)\-(\w)/g,
    (_,a,b) => a + b.toUpperCase()
  );
}