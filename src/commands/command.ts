import { Arguments } from 'https://deno.land/x/yargs/deno-types.ts';
export interface Command {
  signature: string;
  description: string;
  handler: (args: Arguments) => void;
}
