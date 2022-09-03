import Plugin from '../plugin.ts';
import { CliArgs } from '../cli/cliArgs.ts';
import Stylesheet from '../stylesheet.ts';

export default class CssPlugin extends Plugin {
  onWrite<T>(args: CliArgs<T>, stylesheets: Stylesheet[]) {
    return Promise.resolve({
      name: '',
      content: '',
    });
  }
}
