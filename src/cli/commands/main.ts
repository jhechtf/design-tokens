import Command, { CommandDescriptor } from '../command.ts';

import { Args, injectable, registry } from '../../../deps.ts';

@injectable()
@registry([
  {
    token: 'Command',
    useToken: MainCommand,
  },
])
export default class MainCommand extends Command {
  register(): CommandDescriptor {
    return {
      name: 'default',
      help: 'the default command',
    };
  }
  handler(args: Args): Promise<number> {
    console.info(args);
    return Promise.resolve(0);
  }
}
