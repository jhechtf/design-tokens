import { BaseCliArgs } from './cliArgs.ts';
export default class Cli {
  commands: Map<string, { run(): number }> = new Map();
}
