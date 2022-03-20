import { Command } from './command.ts';

export default {
  signature: 'version',
  description: 'Prints out the current version',
  handler: () => console.info('Current version is idek'),
} as Command;
