import Cli from './cli/cli.ts';
import { container } from '../deps.ts';

const COMMAND_DIR = new URL('./cli/commands', import.meta.url);
const commands = ['main.ts'];

for (const fileName of commands) {
  await import(new URL('./commands/' + fileName, COMMAND_DIR).href);
}

const cli = container.resolve(Cli);

console.info(cli);
