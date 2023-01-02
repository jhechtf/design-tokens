import Cli from './cli/cli.ts';
import { container, fromFileUrl, toFileUrl, join } from '../deps.ts';

const COMMAND_DIR = new URL('./cli/commands', import.meta.url);
const base = fromFileUrl(COMMAND_DIR);

for await (const entry of Deno.readDir(COMMAND_DIR)) {
  if (entry.isFile) {
    const filePath = toFileUrl(join(base, entry.name));
    await import(filePath.href);
  }
}

const thing = container.resolve(Cli);
console.info(thing);