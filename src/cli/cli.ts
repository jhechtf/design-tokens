import { injectable, injectAll } from '../../deps.ts';
import Command from './command.ts';
@injectable()
export default class Cli {
  commands: Map<string, { run(): number }> = new Map();
  constructor(@injectAll('Command') allCommands: Command[]) {
    for (const command of allCommands) {
      const response = command.register();
      console.info(response);
    }
  }
}
