import { Command } from './commands/command.skip.ts';
import {
  parse,
  red,
} from '../deps.ts';

const COMMAND_DIR = new URL('./commands', import.meta.url);

const args = parse(Deno.args, {
  boolean: ['help'],
  string: ['config'],
});

/**
 * 1. build commands object
 * 2. lookup current command
 * 3. run handler if found
 * 4. error out otherwise.
 */

// Make the commands object
const commands = new Map<string, Command>();

for await (const commandEntry of Deno.readDir(COMMAND_DIR)) {
  if (
    commandEntry.isFile &&
    commandEntry.name.endsWith('.ts') &&
    !commandEntry.name.includes('.skip')
  ) {
    // Load the command
    const command = await import(
      new URL(`./commands/${commandEntry.name}`, COMMAND_DIR.href).href,
    )
      // Turn the import into a command object
      .then((res) => (res.default || res) as Command);
    // Set the command
    if (!commands.has(command.signature)) {
      commands.set(command.signature, command);
    } else {
      console.error(
        red('ERROR'),
        `Command signature ${command.signature} already exists.`,
      );
    }
  }
}

if (args.help) {
  console.info('These are the registered commands you can choose from\n');
  for (const [command, obj] of commands.entries()) {
    let commandName = command;
    if (command == '*') commandName = '[default]';
    console.info(`${commandName}\t${obj.description}`);
  }
  Deno.exit();
}

const [command = '*'] = args._ as string[];

const handler = commands.get(command);

if (handler) {
  if (handler.handler.constructor.name === 'AsyncFunction') {
    await handler.handler(args);
  } else handler.handler(args);
} else {
  console.info('Unrecognized command');
}
