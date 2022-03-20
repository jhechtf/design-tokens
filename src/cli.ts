import yargs from 'https://deno.land/x/yargs@v17.4.0-deno/deno.ts';
import HelpCommand from './commands/help.ts';
import VersionCommand from './commands/version.ts';
import MainCommand from './commands/main.ts';

yargs(Deno.args)
  .command({
    command: VersionCommand.signature,
    desc: VersionCommand.description,
    handler: VersionCommand.handler,
  })
  .command({
    command: HelpCommand.signature,
    desc: HelpCommand.description,
    handler: HelpCommand.handler,
  })
  .command({
    command: MainCommand.signature,
    desc: MainCommand.description,
    handler: MainCommand.handler,
  })
  .help()
  .strictCommands()
  .parse();
