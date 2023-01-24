import Plugin from '../plugin.ts';
import { BaseCliArgs } from '../cli/cliArgs.ts';
import Stylesheet from '../stylesheet.ts';
import { injectable, registry } from '../../deps.ts';

@injectable()
@registry([
  {
    token: 'Plugin',
    useToken: JSPlugin,
  },
])
export default class JSPlugin extends Plugin {
  onWrite(args: BaseCliArgs, stylesheets: Stylesheet[]) {
    let output = '';
    for (const stylesheet of stylesheets) {
      for (const selectors of stylesheet.selectors.values()) {
        for (const token of selectors.tokens.values()) {
          output += token.toJsToken() + ';\n';
        }
      }
    }
    const {
      'file-name': fileName = 'tokens',
    } = args;
    return Promise.resolve({
      name: `${fileName}.js`,
      content: output,
    });
  }
}
