import Plugin from '../plugin.ts';
import { Config } from '../types.d.ts';
import { CliArgs, BaseCliArgs } from '../cli/cliArgs.ts';
import Stylesheet from '../stylesheet.ts';

export default class JSPlugin extends Plugin {
  onConfigResolved(config: Config, args: BaseCliArgs) {
    console.info('CONFIG', config);
  }
  onStylesLoaded() {
    console.info('Something Something');
  }
  onWrite<T>(args: CliArgs<T>, stylesheets: Stylesheet[]) {
    return Promise.resolve({
      name: 'tokens',
      content: 'fjkdfjkdfj',
    });
  }
}
