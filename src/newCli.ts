import Cli from './cli/cli.ts';
import { container } from '../deps.ts';

const COMMAND_DIR = new URL('./cli/commands', import.meta.url);
// const base = fromFileUrl(COMMAND_DIR);

for await (const entry of Deno.readDir(COMMAND_DIR)) {
  console.info(entry);
  if (entry.isFile) {
    const filePath = new URL('./commands/'+entry.name, COMMAND_DIR);
    console.info(filePath);
    await import(filePath.href);
  }
}

const cli = container.resolve(Cli);

console.info(cli);