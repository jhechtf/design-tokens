import { CliArgs } from '../cliArgs.ts';

export default function DefaultCommand<T>(args: CliArgs<T>) {
  if (args.plugins.length > 0) {
    console.info('Load a plugin');
  }
}
