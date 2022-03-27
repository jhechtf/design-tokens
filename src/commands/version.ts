import { Command } from './command.skip.ts';
import { VERSION } from '../../deps.ts';

export default {
  signature: 'version',
  description: 'Prints out the current version',
  handler: () => console.info('Current version is ', VERSION),
} as Command;
